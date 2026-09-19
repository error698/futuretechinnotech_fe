import React from 'react';
import { VehicleSelector } from '../components/VehicleSelector';
import { ProductCatalog } from '../components/ProductCatalog';
import { useRouter } from '../context/RouterContext';
import { ChevronRight, Car, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const VehiclesPage = ({ onSelectProduct }) => {
  const { navigate } = useRouter();

  return (
    <div className="pt-8 pb-20 space-y-12">
      {/* Page Header with Breadcrumbs */}
      <div className="container">
        <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-4">
          <button
            onClick={() => navigate('/')}
            className="hover:text-foreground transition-colors"
          >
            Home
          </button>
          <ChevronRight size={13} />
          <span className="text-primary font-bold">Shop by Car</span>
        </div>

        <div className="max-w-3xl">
          <div className="inline-flex mb-3">
            <Badge variant="sky" className="gap-1.5 py-1 px-3 text-xs font-semibold">
              <Car size={14} className="text-sky-500" />
              <span>Platform Specific Engineering</span>
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground font-heading tracking-tight mb-4">
            Shop by Vehicle Platform
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Explore Futuretech Innotech's precision-engineered platform programs tailored specifically for India's bestselling SUV and MPV platforms with zero cutting, splicing, or vehicle body alteration.
          </p>
        </div>
      </div>

      {/* Vehicle Platform Selector */}
      <VehicleSelector />

      {/* Corresponding Matched Catalog */}
      <div className="pt-4 border-t border-border/60">
        <div className="container mb-6">
          <h2 className="text-2xl font-bold font-heading text-foreground">
            Platform Compatible Components
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Browse direct-fit accessories, styling trim, and electrical components.
          </p>
        </div>
        <ProductCatalog onSelectProduct={onSelectProduct} />
      </div>
    </div>
  );
};
