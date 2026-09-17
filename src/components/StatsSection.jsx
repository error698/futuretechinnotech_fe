import React from 'react';
import { Award, CheckCircle2, TrendingUp, Users, Factory, Building2 } from 'lucide-react';
import companyData from '../data/company.json';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const StatsSection = () => {
  const { overview, established } = companyData.company;

  return (
    <section id="about" className="section relative">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Story & Quality */}
          <div>
            <div className="inline-flex mb-4">
              <Badge variant="red" className="gap-2 py-1 px-3 text-xs uppercase tracking-wider font-bold">
                <Award size={14} />
                <span>Established {established} • New Delhi</span>
              </Badge>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground font-heading tracking-tight leading-tight mb-4">
              India's Leading Tier-1 Automotive & Defense Manufacturer
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
              {overview}
            </p>

            {/* Certifications checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
              {[
                'IATF 16949:2016 Certified',
                'ISO 9001:2015 Registered',
                'RoHS & REACH Compliant Finishes',
                'In-house CAD/CAM & Metrology Lab',
                'Direct OEM Tier-1 Supplier',
                'Zero-defect Poka-Yoke Assembly'
              ].map((cert) => (
                <div key={cert} className="flex items-center gap-2.5 text-xs sm:text-sm text-foreground">
                  <CheckCircle2 size={16} className="text-red-600 dark:text-red-500 shrink-0" />
                  <span>{cert}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full">
                <a href="#contact">Partner With FTIT</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <a href="#catalog">Browse Catalog</a>
              </Button>
            </div>
          </div>

          {/* Right Column: 4 Stat Cards */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-8 text-center bg-card shadow-md hover:-translate-y-1 transition-all duration-300">
              <Factory size={28} className="text-red-600 dark:text-red-500 mx-auto mb-3" />
              <div className="text-3xl sm:text-4xl font-black text-foreground font-heading leading-none">10+</div>
              <div className="text-xs text-muted-foreground mt-2 font-medium">Years of Excellence</div>
            </Card>

            <Card className="p-8 text-center bg-card shadow-md hover:-translate-y-1 transition-all duration-300">
              <TrendingUp size={28} className="text-sky-600 dark:text-sky-400 mx-auto mb-3" />
              <div className="text-3xl sm:text-4xl font-black text-foreground font-heading leading-none">$1.8M</div>
              <div className="text-xs text-muted-foreground mt-2 font-medium">Revenue till 2025</div>
            </Card>

            <Card className="p-8 text-center bg-card shadow-md hover:-translate-y-1 transition-all duration-300">
              <Users size={28} className="text-emerald-600 dark:text-emerald-400 mx-auto mb-3" />
              <div className="text-3xl sm:text-4xl font-black text-foreground font-heading leading-none">150+</div>
              <div className="text-xs text-muted-foreground mt-2 font-medium">Expert Workforce</div>
            </Card>

            <Card className="p-8 text-center bg-card shadow-md hover:-translate-y-1 transition-all duration-300">
              <Building2 size={28} className="text-amber-600 dark:text-amber-400 mx-auto mb-3" />
              <div className="text-3xl sm:text-4xl font-black text-foreground font-heading leading-none">2,500+</div>
              <div className="text-xs text-muted-foreground mt-2 font-medium">Total Products Built</div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
