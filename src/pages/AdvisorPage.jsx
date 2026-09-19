import React from 'react';
import { AIAdvisor } from '../components/AIAdvisor';
import { useRouter } from '../context/RouterContext';
import { ChevronRight, Sparkles, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const AdvisorPage = ({ onSelectProduct }) => {
  const { navigate } = useRouter();

  return (
    <div className="pt-8 pb-20 space-y-10">
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
          <span className="text-primary font-bold">AI Recommender</span>
        </div>

        <div className="max-w-3xl">
          <div className="inline-flex mb-3">
            <Badge variant="sky" className="gap-1.5 py-1 px-3 text-xs font-semibold">
              <Sparkles size={14} className="text-sky-500" />
              <span>Intelligent Vehicle Matching</span>
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground font-heading tracking-tight mb-4">
            AI Auto Spec Advisor
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Specify your vehicle platform, styling preference, and driving use-case below to receive tailored component recommendations and add them directly to your custom quotation request.
          </p>
        </div>
      </div>

      {/* Main AI Advisor Workbench */}
      <AIAdvisor onSelectProduct={onSelectProduct} />
    </div>
  );
};
