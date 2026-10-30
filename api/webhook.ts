/**
 * Función serverless de Vercel: POST /api/webhook
 * Webhook de Stripe. Valida la firma con STRIPE_WEBHOOK_SECRET sobre el
 * cuerpo HTTP sin procesar, procesa checkout.session.completed y notifica a n8n.
 *
 * URL pública para registrar en Stripe Dashboard (modo prueba):
 *   https://<tu-proyecto>.vercel.app/api/webhook
 * Evento a escuchar: checkout.session.completed
 */
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.acacia',
});

// Deshabilita el parseo automático de body de Vercel para recibir el cuerpo raw
// necesario para verificar la firma de Stripe.
export const config = {
  api: {
    bodyParser: false,
  },
};

// Idempotencia simple: rastrea IDs de evento ya procesados.
// Nota: es en memoria por instancia de función; para mayor robustez se
// recomienda usar un almacén externo (Redis, KV, DB).
const processedIds = new Set<string>();

function isProcessed(eventId: string): boolean {
  return processedIds.has(eventId);
}

function markProcessed(eventId: string): void {
  processedIds.add(eventId);
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).send('Método no permitido');
    return;
  }

  const sig = req.headers['stripe-signature'] as string | undefined;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !endpointSecret) {
    res.status(400).send('Falta firma o secreto de webhook');
    return;
  }

  // Leer cuerpo HTTP sin procesar (raw body) para verificar la firma.
  let rawBody: string;
  try {
    const chunks: Buffer[] = [];
    // req es un Readable en el runtime de Node de Vercel cuando bodyParser está deshabilitado.
    for await (const chunk of req) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }
    rawBody = Buffer.concat(chunks).toString('utf8');
  } catch (err: any) {
    console.error('Error leyendo cuerpo del webhook:', err.message);
    res.status(400).send('Error leyendo el cuerpo');
    return;
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (err: any) {
    console.error('Firma de webhook inválida:', err.message);
    res.status(400).send('Webhook Error: firma inválida');
    return;
  }

  // Idempotencia: si ya procesamos este evento, respondemos 200 sin duplicar.
  if (isProcessed(event.id)) {
    res.status(200).json({ received: true, duplicate: true });
    return;
  }
  markProcessed(event.id);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // Solo datos no sensibles para n8n. No enviamos secretos ni claves.
    const payload = {
      eventId: event.id,
      type: event.type,
      sessionId: session.id,
      customerEmail: session.customer_details?.email ?? null,
      amountTotal: session.amount_total ?? null,
      currency: session.currency ?? null,
      paymentStatus: session.payment_status ?? null,
      created: session.created ?? null,
    };

    const n8nUrl = process.env.N8N_WEBHOOK_URL;
    if (n8nUrl) {
      try {
        await fetch(n8nUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (err: any) {
        // No fallar el webhook de Stripe por un error en n8n.
        // Stripe ya recibirá 200 abajo para evitar reintentos innecesarios.
        console.error('Notificación a n8n falló:', err.message);
      }
    }
  }

  res.status(200).json({ received: true });
}
