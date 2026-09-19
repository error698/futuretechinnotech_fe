import React from 'react';
import { StatsSection } from '../components/StatsSection';
import { useRouter } from '../context/RouterContext';
import { ChevronRight, Award, ShieldCheck, Factory, Users, TrendingUp, Building2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export const AboutPage = () => {
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
          <span className="text-primary font-bold">About FTIT</span>
        </div>

        <div className="max-w-3xl">
          <div className="inline-flex mb-3">
            <Badge variant="sky" className="gap-1.5 py-1 px-3 text-xs font-semibold">
              <Award size={14} className="text-sky-500" />
              <span>Pioneering Indian Engineering Since 2010</span>
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground font-heading tracking-tight mb-4">
            About Futuretech Innotech
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Based in New Delhi, Futuretech Innotech (FTIT) is India's premier Tier-1 manufacturer supplying OEM automotive accessories, precision electroplated trims, and advanced mechatronics to major automotive brands.
          </p>
        </div>
      </div>

      {/* Main Stats & Story Section */}
      <StatsSection />

      {/* Corporate Philosophy & Infrastructure */}
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-8 border-white/80 dark:border-white/10 bg-white/75 dark:bg-card/75 backdrop-blur-xl">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-600 dark:text-sky-400 mb-4">
              <Factory size={24} />
            </div>
            <h3 className="text-lg font-bold font-heading text-foreground mb-2">
              Integrated Manufacturing
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Complete end-to-end tooling, molding, multi-layer chemical plating, and optical cleanroom assembly housed under a single unified campus in New Delhi.
            </p>
          </Card>

          <Card className="p-8 border-white/80 dark:border-white/10 bg-white/75 dark:bg-card/75 backdrop-blur-xl">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-600 dark:text-sky-400 mb-4">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-lg font-bold font-heading text-foreground mb-2">
              Tier-1 Quality Assurance
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              IATF 16949:2016 and ISO 9001:2015 registered processes ensure all components adhere to strict OEM fit, finish, and environmental test regimes.
            </p>
          </Card>

          <Card className="p-8 border-white/80 dark:border-white/10 bg-white/75 dark:bg-card/75 backdrop-blur-xl">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-600 dark:text-sky-400 mb-4">
              <Users size={24} />
            </div>
            <h3 className="text-lg font-bold font-heading text-foreground mb-2">
              150+ Expert Engineers
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Our multidisciplinary team of industrial designers, toolmakers, chemical plating experts, and mechatronic specialists drive automotive innovation.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};
