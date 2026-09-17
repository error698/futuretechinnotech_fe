import React, { useState } from 'react';
import { Sparkles, Shield, Droplets, Sun, Check } from 'lucide-react';
import companyData from '../data/company.json';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const FinishingShowcase = () => {
  const finishes = companyData.company.finishes;
  const [activeFinish, setActiveFinish] = useState(finishes[0]);

  return (
    <section id="finishes" className="section relative">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Sparkles size={14} />
            <span>Proprietary Electroplating & Coatings</span>
          </div>
          <h2 className="section-title">Surface Finishing Studio</h2>
          <p className="section-subtitle">
            FTIT houses an in-house automated electroplating and cleanroom coating facility, producing mirror chromes, titanium blacks, and satin luxury finishes that meet international automotive OEM salt-spray and weathering specs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Interactive Finishes Selector */}
          <div className="flex flex-col gap-3">
            {finishes.map((f) => {
              const isActive = activeFinish.id === f.id;
              return (
                <Card
                  key={f.id}
                  onClick={() => setActiveFinish(f)}
                  className={`p-4 sm:p-5 flex items-center gap-4 cursor-pointer transition-all duration-300 ${
                    isActive
                      ? 'border-2 border-primary bg-primary/10 shadow-md ring-1 ring-primary/30'
                      : 'hover:border-primary/40 bg-card'
                  }`}
                >
                  {/* Color Swatch Orb */}
                  <div
                    className="w-10 h-10 rounded-full shadow-md border-2 border-white/20 shrink-0"
                    style={{ background: f.shimmer }}
                  />

                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm sm:text-base text-foreground font-heading">
                      {f.name}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {f.desc}
                    </div>
                  </div>

                  {isActive && (
                    <div className="text-primary shrink-0">
                      <Check size={18} />
                    </div>
                  )}
                </Card>
              );
            })}
          </div>

          {/* Simulated 3D Specimen Showcase */}
          <Card className="p-8 sm:p-10 text-center relative overflow-hidden bg-card border-border/80 shadow-xl">
            <Badge variant="red" className="mb-5 uppercase tracking-wider text-[11px] font-bold">
              Simulated Material Specimen
            </Badge>

            {/* Simulated Metallic Badge */}
            <div
              className="w-44 h-44 mx-auto mb-6 rounded-3xl flex items-center justify-center font-black text-3xl tracking-tighter shadow-2xl transition-all duration-500 border border-white/30"
              style={{
                background: activeFinish.shimmer,
                color: activeFinish.id === 'piano-black' || activeFinish.id === 'black-chrome' ? '#ffffff' : '#111827',
              }}
            >
              FTIT
            </div>

            <h3 className="text-2xl font-extrabold text-foreground font-heading mb-2">
              {activeFinish.name}
            </h3>

            <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-6 leading-relaxed">
              {activeFinish.desc}
            </p>

            {/* Spec Stats */}
            <div className="grid grid-cols-3 gap-3 pt-5 border-t border-border/70">
              <div>
                <Droplets size={18} className="text-sky-500 mx-auto mb-1" />
                <div className="text-xs sm:text-sm font-bold text-foreground">96h+</div>
                <div className="text-[10px] text-muted-foreground">Salt Spray CASS</div>
              </div>

              <div>
                <Sun size={18} className="text-amber-500 mx-auto mb-1" />
                <div className="text-xs sm:text-sm font-bold text-foreground">UV-A / UV-B</div>
                <div className="text-[10px] text-muted-foreground">Anti-Yellowing</div>
              </div>

              <div>
                <Shield size={18} className="text-emerald-500 mx-auto mb-1" />
                <div className="text-xs sm:text-sm font-bold text-foreground">15-25 µm</div>
                <div className="text-[10px] text-muted-foreground">Plating Thickness</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
