import React, { Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import NewHero from './components/NewHero';
import CommandMenu from './components/CommandMenu';
import StaticPage from './pages/StaticPage';
import PrivacyBanner from './components/PrivacyBanner';
import CursorSpotlight from './components/CursorSpotlight';
import PrivacyBlur from './components/PrivacyBlur';
import ErrorBoundary from './components/ErrorBoundary';
import { STATIC_PAGE_ROUTES, StaticPageKey } from './routes/pageRoutes';

const NewParadoxSection = React.lazy(() => import('./components/NewParadoxSection'));
const RexGuardSection = React.lazy(() => import('./components/RexGuardSection'));
const EnterpriseSection = React.lazy(() => import('./components/EnterpriseSection'));
const ArchitectureSection = React.lazy(() => import('./components/ArchitectureSection'));
const TerminalSection = React.lazy(() => import('./components/TerminalSection'));
const ContactForm = React.lazy(() => import('./components/ContactForm'));
const Footer = React.lazy(() => import('./components/Footer'));

// Loading fallback with proper CLS-safe dimensions
const SectionLoader = () => (
  <div className="py-24 lg:py-32 bg-white" aria-hidden="true">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="animate-pulse space-y-6">
        <div className="h-3 w-24 bg-slate-100 rounded" />
        <div className="h-10 w-80 max-w-full bg-slate-100 rounded" />
        <div className="h-4 w-96 max-w-full bg-slate-50 rounded" />
      </div>
    </div>
  </div>
);

const HomeContent: React.FC = () => (
  <>
    <NewHero />
    <ErrorBoundary>
      <Suspense fallback={<SectionLoader />}>
        <NewParadoxSection />
      </Suspense>
    </ErrorBoundary>
    <ErrorBoundary>
      <Suspense fallback={<SectionLoader />}>
        <RexGuardSection />
      </Suspense>
    </ErrorBoundary>
    <ErrorBoundary>
      <Suspense fallback={<SectionLoader />}>
        <ArchitectureSection />
      </Suspense>
    </ErrorBoundary>
    <ErrorBoundary>
      <Suspense fallback={<SectionLoader />}>
        <TerminalSection />
      </Suspense>
    </ErrorBoundary>
    <ErrorBoundary>
      <Suspense fallback={<SectionLoader />}>
        <EnterpriseSection />
      </Suspense>
    </ErrorBoundary>
    <ErrorBoundary>
      <Suspense fallback={<SectionLoader />}>
        <ContactForm />
      </Suspense>
    </ErrorBoundary>
  </>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // Wait for lazy sections when arriving from another route or a direct anchor link.
    if (!location.hash) {
      window.scrollTo(0, 0);
      return;
    }
    const scrollToTarget = () => {
      const target = document.getElementById(location.hash.slice(1));
      if (!target) return false;
      target.scrollIntoView({ block: 'start' });
      return true;
    };
    if (scrollToTarget()) return;
    const observer = new MutationObserver(() => {
      if (scrollToTarget()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen bg-white text-slate-800 relative overflow-x-hidden">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-navy-900 focus:px-4 focus:py-3 focus:text-sm focus:text-white">
        {useLocation().pathname === '/' ? 'Skip to main content' : 'Pular para o conteúdo principal'}
      </a>
      <PrivacyBlur />
      <CursorSpotlight />
      <Header />
      <CommandMenu />
      <PrivacyBanner />
      <main id="main-content" tabIndex={-1} className="z-[2]">{children}</main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

const  App: React.FC = () => {

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <HomeContent />
          </Layout>
        }
      />
      {Object.entries(STATIC_PAGE_ROUTES).map(([key, path]) => (
        <Route
          key={key}
          path={path}
          element={
            <Layout>
              <StaticPage pageKey={key as StaticPageKey} />
            </Layout>
          }
        />
      ))}
    </Routes>
  );
};

export default App;
