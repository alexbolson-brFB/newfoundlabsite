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
const GeminiGuardSection = React.lazy(() => import('./components/GeminiGuardSection'));
const UmbrellaSection = React.lazy(() => import('./components/UmbrellaSection'));
const TechStackSection = React.lazy(() => import('./components/TechStackSection'));
const ArchitectureSection = React.lazy(() => import('./components/ArchitectureSection'));
const TerminalSection = React.lazy(() => import('./components/TerminalSection'));
const RoiSection = React.lazy(() => import('./components/RoiSection'));
const SocialProofSection = React.lazy(() => import('./components/SocialProofSection'));
const ContactForm = React.lazy(() => import('./components/ContactForm'));
const MarketplaceSection = React.lazy(() => import('./components/MarketplaceSection'));
const WhitepaperSection = React.lazy(() => import('./components/WhitepaperSection'));
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

// Dark loading fallback for dark sections
const DarkSectionLoader = () => (
  <div className="py-24 lg:py-32 bg-navy-900" aria-hidden="true">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="animate-pulse space-y-6">
        <div className="h-3 w-24 bg-slate-800 rounded" />
        <div className="h-10 w-80 max-w-full bg-slate-800 rounded" />
        <div className="h-4 w-96 max-w-full bg-slate-800/60 rounded" />
      </div>
    </div>
  </div>
);

const HomeContent: React.FC = () => (
  <>
    <NewHero />
    <ErrorBoundary>
      <Suspense fallback={<DarkSectionLoader />}>
        <GeminiGuardSection />
      </Suspense>
    </ErrorBoundary>
    <ErrorBoundary>
      <Suspense fallback={<SectionLoader />}>
        <NewParadoxSection />
      </Suspense>
    </ErrorBoundary>
    <ErrorBoundary>
      <Suspense fallback={<SectionLoader />}>
        <UmbrellaSection />
      </Suspense>
    </ErrorBoundary>
    <ErrorBoundary>
      <Suspense fallback={<SectionLoader />}>
        <WhitepaperSection />
      </Suspense>
    </ErrorBoundary>
    <ErrorBoundary>
      <Suspense fallback={<SectionLoader />}>
        <TechStackSection />
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
        <RoiSection />
      </Suspense>
    </ErrorBoundary>
    <ErrorBoundary>
      <Suspense fallback={<SectionLoader />}>
        <SocialProofSection />
      </Suspense>
    </ErrorBoundary>
    <ErrorBoundary>
      <Suspense fallback={<SectionLoader />}>
        <MarketplaceSection />
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
    // Scroll to top on page change, but preserve hash scrolling
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white text-slate-800 relative overflow-x-hidden">
      <PrivacyBlur />
      <CursorSpotlight />
      <Header />
      <CommandMenu />
      <PrivacyBanner />
      <main className="z-[2]">{children}</main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

const  App: React.FC = () => {
  useEffect(() => {
    console.clear();
    const styleTitle = 'font-family: monospace; font-size: 20px; font-weight: bold; color: #0f172a; text-shadow: 1px 1px 0px #d4af37;';
    const styleBody = 'font-family: monospace; font-size: 12px; color: #64748b;';
    const styleLink = 'font-family: monospace; font-size: 12px; color: #059669; font-weight: bold; text-decoration: underline;';

    console.log('%cFoundLab Infrastructure', styleTitle);
    console.log(
      `%c
    █▀▀ █▀█ █ █ █▀█ █▀▄ █   █▀█ █▀▄
    █▀  █ █ █ █ █ █ █ █ █   █▀█ █▀▄
    ▀   ▀▀▀ ▀▀▀ ▀ ▀ ▀▀  ▀▀▀ ▀ ▀ ▀▀
    
    > SYSTEM STATUS: OPTIMAL
    > ZERO-PERSISTENCE: ENFORCED
    > PHYSICS: UNBROKEN
    
    %cLooking for leaks? You won't find any.
    But we are looking for builders.
    
    Initialize handshake: %ccareers@foundlab.com.br
      `,
      styleBody,
      styleBody,
      styleLink
    );
  }, []);

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
