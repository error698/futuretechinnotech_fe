import React from 'react';
import { ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react';
import { useRFQ } from '../context/RFQContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export const Hero = () => {
  const { setIsModalOpen } = useRFQ();

  return (
    <section className="relative pt-14 pb-20 overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="absolute -top-36 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-red-600/15 blur-[90px] rounded-full pointer-events-none -z-10 dark:bg-red-600/10"
      />

      <div className="container">
        <div className="max-w-[880px] mx-auto text-center">
          {/* IATF Badge */}
          <div className="inline-flex mb-6">
            <Badge variant="red" className="gap-2 py-1.5 px-4 text-xs tracking-wider uppercase font-bold rounded-full">
              <ShieldCheck size={15} />
              <span>IATF 16949 & ISO 9001 CERTIFIED MANUFACTURING</span>
            </Badge>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-6 text-foreground font-heading">
            World-Class <span className="text-gradient-red">Auto Accessories</span> & Precision Engineering
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-[720px] mx-auto mb-9">
            Futuretech Innotech (FTIT) delivers precision-crafted automotive styling, ambient lighting systems, EV charging innovations, and defense-grade electroplated finishes for India's leading vehicle platforms.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
            <Button asChild size="lg" className="rounded-full shadow-lg gap-2">
              <a href="#catalog" id="hero-explore-btn">
                <span>Explore 108+ Products</span>
                <ArrowRight size={17} />
              </a>
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => setIsModalOpen(true)}
              id="hero-rfq-btn"
              className="rounded-full"
            >
              <span>Request Custom RFQ</span>
            </Button>

            <Button asChild variant="outline" size="lg" className="rounded-full gap-1.5">
              <a href="#vehicles">
                <span>Filter by Car Model</span>
                <ChevronRight size={15} />
              </a>
            </Button>
          </div>

          {/* Stats quick bar */}
          <Card className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-card/70 backdrop-blur-md border-border/80 shadow-md">
            <div className="text-center md:text-left">
              <div className="text-3xl font-extrabold text-foreground font-heading">10+</div>
              <div className="text-xs text-muted-foreground font-medium">Years of Excellence</div>
            </div>
            <div className="text-center md:text-left md:border-l md:border-border/70 md:pl-5">
              <div className="text-3xl font-extrabold text-red-600 dark:text-red-500 font-heading">$1.8M+</div>
              <div className="text-xs text-muted-foreground font-medium">Revenue till 2025</div>
            </div>
            <div className="text-center md:text-left md:border-l md:border-border/70 md:pl-5">
              <div className="text-3xl font-extrabold text-foreground font-heading">150+</div>
              <div className="text-xs text-muted-foreground font-medium">Engineers & Specialists</div>
            </div>
            <div className="text-center md:text-left md:border-l md:border-border/70 md:pl-5">
              <div className="text-3xl font-extrabold text-cyan-600 dark:text-cyan-400 font-heading">2,500+</div>
              <div className="text-xs text-muted-foreground font-medium">Components Fabricated</div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
