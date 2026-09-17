import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { RFQProvider } from './context/RFQContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FlagshipShowcase } from './components/flagship/FlagshipShowcase';
import { VehicleSelector } from './components/VehicleSelector';
import { ProductCatalog } from './components/ProductCatalog';
import { FinishingShowcase } from './components/FinishingShowcase';
import { ManufacturingPillars } from './components/ManufacturingPillars';
import { AIAdvisor } from './components/AIAdvisor';
import { StatsSection } from './components/StatsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { RFQCartModal } from './components/RFQCartModal';

export const App = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <ThemeProvider>
      <RFQProvider>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', transition: 'background-color 0.3s ease, color 0.3s ease' }}>
          {/* Navigation Bar */}
          <Navbar />

        {/* Main Content Sections */}
        <main style={{ flex: 1 }}>
          <Hero />
          <FlagshipShowcase />
          <VehicleSelector />
          <ProductCatalog onSelectProduct={(p) => setSelectedProduct(p)} />
          <FinishingShowcase />
          <ManufacturingPillars />
          <AIAdvisor onSelectProduct={(p) => setSelectedProduct(p)} />
          <StatsSection />
          <ContactSection />
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
        <RFQCartModal />
      </div>
    </RFQProvider>
  </ThemeProvider>
  );
};

export default App;
