import React from 'react';
import { FlagshipShowcase } from '../components/flagship/FlagshipShowcase';
import { useRouter } from '../context/RouterContext';
import { ChevronRight, Zap, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const FlagshipPage = () => {
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
          <span className="text-primary font-bold">Flagship Hardware</span>
        </div>

        <div className="max-w-3xl">
          <div className="inline-flex mb-3">
            <Badge variant="sky" className="gap-1.5 py-1 px-3 text-xs font-semibold">
              <Zap size={14} className="text-sky-500" />
              <span>Next-Gen Mechatronics</span>
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground font-heading tracking-tight mb-4">
            Flagship Hardware Systems
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Explore Futuretech Innotech's flagship automotive mechatronics: gesture-operated automatic power doors and multi-zone electrochromic smart dimming glass with interactive physics simulations and engineering datasheets.
          </p>
        </div>
      </div>

      {/* Main Hardware Systems Showcase */}
      <FlagshipShowcase />
    </div>
  );
};
