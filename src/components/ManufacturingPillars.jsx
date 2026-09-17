import React from 'react';
import { Cog, CheckCircle } from 'lucide-react';
import companyData from '../data/company.json';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const ManufacturingPillars = () => {
  const pillars = companyData.company.pillars;

  return (
    <section id="pillars" className="section bg-background transition-colors duration-300">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Cog size={14} />
            <span>Integrated Facility</span>
          </div>
          <h2 className="section-title">How We Get It Done</h2>
          <p className="section-subtitle">
            India's largest & completely integrated design, engineering, and manufacturing solutions under one roof since 2010.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {pillars.map((p, idx) => (
            <Card
              key={p.id}
              className="p-8 sm:p-9 flex flex-col justify-between relative hover:-translate-y-1.5 transition-all duration-300 shadow-md hover:shadow-xl hover:border-primary/40"
            >
              <div>
                <div className="flex justify-between items-start mb-5">
                  <div className="w-13 h-13 rounded-2xl bg-red-500/10 border border-red-500/25 flex items-center justify-center text-2xl p-2.5">
                    {p.icon}
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
                    <CheckCircle size={15} className="text-red-600 dark:text-red-500 shrink-0" />
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
