import { useState, type ReactNode } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Clock3, Instagram, MapPin, Menu as MenuIcon, Phone, X } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { menuCategories } from './data/menu';

const queryClient = new QueryClient();
const logo = '/cafes-de-carla-logo.jpg';

function PreviewNote({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`preview-note ${className}`} data-testid="preview-disclosure">{children}</span>;
}

function Home() {
  const [activeCategory, setActiveCategory] = useState('featured');
  const [mobileOpen, setMobileOpen] = useState(false);
  const selected = menuCategories.find((category) => category.id === activeCategory) ?? menuCategories[0];
  const closeNav = () => setMobileOpen(false);

  return (
    <div className="site-shell grain min-h-[100dvh]">
      <div className="launch-ribbon" data-testid="preview-status">
        <span className="ribbon-dot" aria-hidden="true" />
        Vista previa de pre-lanzamiento · datos por confirmar
      </div>
      <header className="site-header">
        <div className="header-inner section-wrap">
          <a href="#inicio" className="brand-link focus-ring" aria-label="Cafés de Carla, inicio" data-testid="link-brand-home">
            <img src={logo} alt="Logotipo de Cafés de Carla: Huele, Saborea, Disfruta" width="1024" height="1024" data-testid="img-brand-logo" />
          </a>
          <nav className={`main-nav ${mobileOpen ? 'is-open' : ''}`} aria-label="Navegación principal" data-testid="navigation-primary">
            <a href="#historia" className="nav-link" onClick={closeNav} data-testid="link-nav-story">Nuestra esencia</a>
            <a href="#carta" className="nav-link" onClick={closeNav} data-testid="link-nav-menu">La carta</a>
            <a href="#visitanos" className="nav-link" onClick={closeNav} data-testid="link-nav-visit">Visítanos</a>
            <a href="#contacto" className="nav-contact" onClick={closeNav} data-testid="link-nav-contact">Hablemos <ArrowUpRight size={14} aria-hidden="true" /></a>
          </nav>
          <button className="mobile-toggle focus-ring" type="button" aria-label={mobileOpen ? 'Cerrar navegación' : 'Abrir navegación'} aria-expanded={mobileOpen} onClick={() => setMobileOpen((open) => !open)} data-testid="button-mobile-navigation">
            {mobileOpen ? <X size={21} /> : <MenuIcon size={21} />}
          </button>
        </div>
      </header>

      <main>
        <section id="inicio" className="hero section-wrap" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="hero-overline reveal"><span className="tiny-rule" /> UN RINCÓN PARA BAJAR EL RITMO</div>
            <h1 id="hero-title" className="serif reveal reveal-delay" data-testid="heading-home-tagline">Huele.<br /><em>Saborea.</em><br />Disfruta.</h1>
            <p className="hero-description reveal reveal-delay" data-testid="text-home-introduction">Un café preparado con cariño. Un ratito para ti. En Cafés de Carla, cada pausa merece saborearse.</p>
            <a href="#carta" className="text-cta focus-ring reveal reveal-delay" data-testid="link-hero-menu">Descubre la carta <span><ArrowDown size={15} /></span></a>
            <div className="hero-footnote"><span>CAFÉS DE CARLA</span><span>UNA PAUSA, A TU RITMO</span></div>
          </div>
          <div className="hero-visual reveal reveal-delay">
            <div className="hero-photo photo-frame">
              <img src="/sample-coffee.jpg" alt="Imagen de muestra, no fotografía del local: café servido en cerámica bajo luz natural" width="1200" height="900" fetchPriority="high" data-testid="img-sample-hero" />
              <div className="photo-stamp" aria-hidden="true"><span>un momento</span><strong>para ti</strong></div>
            </div>
            <div className="image-caption"><span className="caption-mark" /> IMAGEN DE MUESTRA · SE SUSTITUIRÁ POR FOTOGRAFÍA REAL</div>
            <div className="hero-side-note serif">Tomarse<br />el tiempo<br />también sabe.</div>
          </div>
          <div className="hero-seal" aria-hidden="true"><span>Huele · Saborea · Disfruta</span><b>CD</b></div>
        </section>

        <section id="historia" className="story-section" aria-labelledby="story-title">
          <div className="section-wrap story-grid">
            <div className="story-marker"><span className="eyebrow">01 / NUESTRA ESENCIA</span><span className="marker-line" /></div>
            <div className="story-content">
              <h2 className="serif" id="story-title" data-testid="heading-brand-story">Hay días que piden<br /><em>una pausa bonita.</em></h2>
              <div className="story-bottom">
                <p data-testid="text-brand-story-first">En Cafés de Carla creemos en el placer sencillo de parar un momento. En el aroma que llega antes del primer sorbo, en algo rico sobre la mesa y en sentirte bien recibido.</p>
                <p data-testid="text-brand-story-second">Una invitación abierta a venir como eres, elegir lo que te apetece y disfrutar sin mirar el reloj.</p>
              </div>
              <div className="story-signature">Cafés de Carla <span>— Huele, Saborea, Disfruta</span></div>
            </div>
            <div className="story-aside" aria-hidden="true"><span className="sun-shape" /><span className="aside-words serif">despacio<br />sabe mejor</span></div>
          </div>
        </section>

        <section id="carta" className="menu-section section-wrap" aria-labelledby="menu-title">
          <div className="section-kicker"><span className="eyebrow">02 / PARA DISFRUTAR</span><span className="kicker-line" /></div>
          <div className="menu-heading">
            <div><h2 id="menu-title" className="serif" data-testid="heading-menu">Algo rico,<br /><em>en buena compañía.</em></h2></div>
            <p data-testid="text-menu-introduction">La carta que nos has compartido ya está aquí, con sus productos, descripciones y precios. Los precios no indicados quedan pendientes de confirmar.</p>
          </div>
          <div className="menu-layout">
            <div className="category-list" role="tablist" aria-label="Categorías de la carta" data-testid="menu-category-tabs">
              {menuCategories.map((category, index) => (
                <button key={category.id} type="button" role="tab" aria-selected={activeCategory === category.id} aria-controls="category-panel" className={`category-tab ${activeCategory === category.id ? 'active' : ''}`} onClick={() => setActiveCategory(category.id)} data-testid={`tab-category-${category.id}`}>
                  <span className="category-number">{String(index + 1).padStart(2, '0')}</span><span className="category-name">{category.title}</span><ArrowRight size={17} aria-hidden="true" />
                </button>
              ))}
            </div>
            <section className="category-panel" role="tabpanel" id="category-panel" aria-labelledby={`tab-category-${selected.id}`} aria-label={selected.title} data-testid={`panel-category-${selected.id}`}>
              <div className="category-panel-top">
                {selected.image && (
                  <div className="category-art">
                    <img src={selected.image} alt={selected.alt} loading="lazy" width="960" height="720" data-testid={`img-category-${selected.id}`} />
                    <span className="sample-flag">IMAGEN DE MUESTRA</span>
                  </div>
                )}
                <div className="category-copy">
                  <span className="eyebrow">EN LA CARTA</span>
                  <h3 className="serif" data-testid={`heading-category-${selected.id}`}>{selected.title}</h3>
                  <p>{selected.note}</p>
                </div>
              </div>
              {selected.items.length > 0 ? (
                <ul className="menu-items" data-testid={`list-menu-${selected.id}`}>
                  {selected.items.map((item) => (
                    <li className="menu-item" key={item.id} data-testid={`item-menu-${item.id}`}>
                      <div className="menu-item-copy">
                        <h4>{item.name}</h4>
                        {item.description && <p>{item.description}</p>}
                      </div>
                      <span className={`menu-item-price ${item.price ? '' : 'price-pending'}`} data-testid={`price-menu-${item.id}`}>
                        {item.price ?? 'Precio por confirmar'}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="menu-empty" data-testid={`empty-menu-${selected.id}`}>{selected.emptyMessage}</p>
              )}
            </section>
          </div>
          <p className="menu-disclaimer" data-testid="text-menu-preview-disclosure">Precios transcritos de la carta compartida; los que no figuraban se muestran por confirmar. Las fotos son ilustrativas y se sustituirán por imágenes reales de los productos.</p>
        </section>

        <section className="pause-band" aria-label="Eslogan de Cafés de Carla">
          <div className="pause-inner section-wrap"><span className="pause-small">EL PLACER DE HACER UNA COSA A LA VEZ</span><p className="serif">“Cafés de Carla: Huele, Saborea, Disfruta”</p><span className="pause-ornament" aria-hidden="true" /></div>
        </section>

        <section className="visit-section section-wrap" id="visitanos" aria-labelledby="visit-title">
          <div className="section-kicker"><span className="eyebrow">03 / CUANDO QUIERAS</span><span className="kicker-line" /></div>
          <div className="visit-heading">
            <h2 id="visit-title" className="serif" data-testid="heading-visit">La mesa está<br /><em>por poner.</em></h2>
            <p data-testid="text-visit-introduction">Queremos que encontrar Cafés de Carla sea fácil. Estamos preparando esta información con los datos oficiales del negocio.</p>
          </div>
          <div className="visit-grid">
            <div className="map-placeholder" role="img" aria-label="Mapa pendiente de añadir cuando se confirme la dirección" data-testid="map-preview-placeholder">
              <div className="map-pattern" aria-hidden="true" />
              <div className="map-card"><span className="map-pin"><MapPin size={18} /></span><div><strong>El mapa viene pronto</strong><p>Añadiremos la ubicación exacta al confirmar la dirección.</p></div></div>
              <span className="map-label">VISTA PREVIA · SIN UBICACIÓN REAL</span>
            </div>
            <div className="visit-details">
              <article className="detail-block"><span className="detail-icon"><MapPin size={17} /></span><div><span className="eyebrow">DÓNDE ENCONTRARNOS</span><h3>Dirección</h3><p data-testid="text-address-placeholder">Dirección pendiente de confirmar</p></div></article>
              <article className="detail-block"><span className="detail-icon"><Clock3 size={17} /></span><div><span className="eyebrow">PARA TU PRÓXIMA PAUSA</span><h3>Horario</h3><p data-testid="text-hours-placeholder">Horario pendiente de confirmar</p></div></article>
              <div className="contact-box" id="contacto">
                <span className="eyebrow">ESTAMOS AQUÍ PARA AYUDAR</span>
                <p>Los datos directos de contacto estarán disponibles en cuanto los confirme el equipo de Cafés de Carla.</p>
                <div className="contact-placeholders">
                  <span className="contact-placeholder"><Phone size={15} /> Teléfono pendiente</span>
                  <span className="contact-placeholder"><span className="whatsapp-mark">W</span> WhatsApp pendiente</span>
                </div>
                <span className="contact-footnote">No se muestran enlaces hasta confirmar los números oficiales.</span>
              </div>
            </div>
          </div>
        </section>

        <section className="social-section" aria-labelledby="social-title">
          <div className="section-wrap social-inner">
            <div className="social-copy"><span className="eyebrow">04 / UN POQUITO MÁS CERCA</span><h2 id="social-title" className="serif">Lo que pasa<br /><em>al otro lado.</em></h2><p>Pronto podrás asomarte a nuestro día a día.</p><span className="social-handle"><Instagram size={17} /> Cuenta de Instagram pendiente de confirmar</span></div>
            <div className="social-grid" data-testid="instagram-feed-placeholder" aria-label="Vista previa del feed de Instagram, aún sin publicaciones">
              <div className="social-tile tile-one"><span className="tile-ring" /><span className="tile-text serif">un café<br />y un respiro</span><small>MUESTRA DE DISEÑO</small></div>
              <div className="social-tile tile-two"><span className="tile-square" /><span className="tile-text serif">a tu<br />ritmo</span><small>MUESTRA DE DISEÑO</small></div>
              <div className="social-tile tile-three"><img src="/sample-coffee.jpg" alt="Imagen ilustrativa de café, no corresponde a la cuenta real de Instagram" loading="lazy" width="640" height="640" /><span className="tile-overlay">FOTOGRAFÍA DE MUESTRA</span></div>
              <div className="feed-overlay"><Instagram size={20} /><span>El feed aparecerá aquí<br />cuando tengamos la cuenta</span></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main section-wrap">
          <a href="#inicio" className="footer-brand focus-ring" aria-label="Volver al inicio" data-testid="link-footer-home"><img src={logo} alt="Logotipo de Cafés de Carla" width="1024" height="1024" loading="lazy" /><span className="serif">Cafés de Carla</span></a>
          <p className="footer-tagline serif">Huele, Saborea, Disfruta.</p>
          <a className="back-top" href="#inicio" data-testid="link-back-to-top">Volver arriba <ArrowUpRight size={15} /></a>
        </div>
        <div className="footer-bottom section-wrap"><span>© Cafés de Carla</span><span>PREVISUALIZACIÓN DE PRUEBA · NO PUBLICAR</span><span>Hecho para disfrutar sin prisa.</span></div>
      </footer>
    </div>
  );
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;
