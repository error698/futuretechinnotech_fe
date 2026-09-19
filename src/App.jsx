import React, { useState } from 'react';
import { SplashScreen } from './components/splash';
import { ThemeProvider } from './context/ThemeContext';
import { RouterProvider, useRouter } from './context/RouterContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';

// Dedicated Page Components
import {
  HomePage,
  FlagshipPage,
  ProductsPage,
  VehiclesPage,
  FinishingPage,
  EngineeringPage,
  AboutPage,
  ContactPage,
} from './pages';

const AppContent = () => {
  const { currentPath } = useRouter();
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Route resolver for dedicated pages
  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/flagship':
        return <FlagshipPage />;
      case '/products':
        return <ProductsPage onSelectProduct={setSelectedProduct} />;
      case '/vehicles':
        return <VehiclesPage onSelectProduct={setSelectedProduct} />;
      case '/finishing':
        return <FinishingPage />;
      case '/engineering':
        return <EngineeringPage />;
      case '/about':
        return <AboutPage />;
      case '/contact':
        return <ContactPage />;
      case '/':
      default:
        return <HomePage />;
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        transition: 'background-color 0.3s ease, color 0.3s ease',
      }}
    >
      {/* Global Navigation Header */}
      <Navbar />

      {/* Dedicated Page View */}
      <main style={{ flex: 1 }}>
        {renderCurrentPage()}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Modals & Overlays */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export const App = () => {
  const [splashFinished, setSplashFinished] = useState(false);

  return (
    <ThemeProvider>
      <RouterProvider>
        {!splashFinished && (
          <SplashScreen onComplete={() => setSplashFinished(true)} />
        )}
        <AppContent />
      </RouterProvider>
    </ThemeProvider>
  );
};

export default App;
