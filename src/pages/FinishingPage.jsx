import React from 'react';
import { FinishingShowcase } from '../components/FinishingShowcase';
import { useRouter } from '../context/RouterContext';
import { ChevronRight, Sparkles, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const FinishingPage = () => {
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
          <span className="text-primary font-bold">Finishing Studio</span>
        </div>

        <div className="max-w-3xl">
          <div className="inline-flex mb-3">
            <Badge variant="sky" className="gap-1.5 py-1 px-3 text-xs font-semibold">
              <Sparkles size={14} className="text-sky-500" />
              <span>Surface Treatment Excellence</span>
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground font-heading tracking-tight mb-4">
            Advanced Finishing Studio
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            State-of-the-art electroplating, PVD vacuum deposition, and automotive clear-coat finishes rigorously tested to withstand 480+ hours of ASTM B117 salt spray exposure without degradation.
          </p>
        </div>
      </div>

      {/* Main Finishing Showcase */}
      <FinishingShowcase />
    </div>
  );
};
