import React from 'react';
import { Cog, CheckCircle, Layers, Cpu, Sparkles } from 'lucide-react';
import companyData from '../data/company.json';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const getPillarIcon = (type) => {
  switch (type) {
    case 'design':
      return <Layers size={22} className="text-sky-600 dark:text-sky-400" />;
    case 'manufacturing':
      return <Cpu size={22} className="text-sky-600 dark:text-sky-400" />;
    case 'finishing':
      return <Sparkles size={22} className="text-sky-600 dark:text-sky-400" />;
    default:
      return <Cog size={22} className="text-sky-600 dark:text-sky-400" />;
  }
};

export const ManufacturingPillars = () => {
  const pillars = companyData.company.pillars;

  return (
    <section id="pillars" className="py-2 bg-background transition-colors duration-300">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {pillars.map((p, idx) => (
            <Card
              key={p.id}
              className="p-8 sm:p-9 flex flex-col justify-between relative hover:-translate-y-1.5 transition-all duration-300 shadow-md hover:shadow-xl hover:border-primary/40"
            >
              <div>
                <div className="flex justify-between items-start mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/25 flex items-center justify-center p-2.5 shadow-sm">
                    {getPillarIcon(p.iconType)}
                  </div>
                  <span className="text-xs font-extrabold text-muted-foreground font-mono">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-foreground font-heading mb-3">
                  {p.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {p.description}
                </p>
              </div>

              <div className="pt-5 border-t border-border/70 space-y-2.5">
                {p.capabilities.map((cap) => (
                  <div key={cap} className="flex items-center gap-2 text-xs sm:text-sm text-foreground">
                    <CheckCircle size={15} className="text-sky-600 dark:text-sky-400 shrink-0" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
