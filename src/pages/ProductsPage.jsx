import React from 'react';
import { ProductCatalog } from '../components/ProductCatalog';
import { useRouter } from '../context/RouterContext';
import { ChevronRight, Layers, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const ProductsPage = ({ onSelectProduct }) => {
  const { navigate } = useRouter();

  return (
    <div className="pt-8 pb-20 space-y-8">
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
          <span className="text-primary font-bold">Products</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-border/60">
          <div className="max-w-3xl">
            <div className="inline-flex mb-3">
              <Badge variant="sky" className="gap-1.5 py-1 px-3 text-xs font-semibold">
                <Layers size={14} className="text-sky-500" />
                <span>Complete OEM Catalog</span>
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground font-heading tracking-tight mb-3">
              Automotive Components Catalog
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Discover our full line of 108+ precision-engineered automotive styling accessories, electroplated trim, ambient LED optical components, and direct OEM fitments.
            </p>
          </div>

          {/* Dynamic Telemetry & Certifications Badges (Auto-fills on wide/zoomed-out screens) */}
          <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
            <div className="px-4 py-3 rounded-xl bg-card border border-border/80 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold font-heading text-sm">
                108
              </div>
              <div>
                <div className="text-xs font-bold text-foreground">Active Part Numbers</div>
                <div className="text-[11px] text-muted-foreground">Direct Fit OEM Catalog</div>
              </div>
            </div>
            <div className="px-4 py-3 rounded-xl bg-card border border-border/80 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                <ShieldCheck size={18} />
              </div>
              <div>
                <div className="text-xs font-bold text-foreground">IATF 16949 Certified</div>
                <div className="text-[11px] text-muted-foreground">Tier-1 Automotive Quality</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Catalog with Search & Filters */}
      <ProductCatalog onSelectProduct={onSelectProduct} />
    </div>
  );
};
