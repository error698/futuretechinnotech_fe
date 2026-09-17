import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  ArrowRight, 
  FileText, 
  Zap, 
  Eye, 
} from 'lucide-react';
import { HardwareSimulator } from './HardwareSimulator';
import { HardwareSpecsGrid } from './HardwareSpecsGrid';
import { SystemArchitectureDiagram } from './SystemArchitectureDiagram';
import { EngineeringLeadForm } from './EngineeringLeadForm';
import { TechDataSheetModal } from './TechDataSheetModal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const FlagshipShowcase = () => {
  const [dataSheetOpen, setDataSheetOpen] = useState(false);
  const [selectedSubsystem, setSelectedSubsystem] = useState('door');

  const handleOpenDataSheet = (subsystem = 'door') => {
    setSelectedSubsystem(subsystem);
    setDataSheetOpen(true);
  };

  const scrollToInquiry = () => {
    const el = document.getElementById('hardware-inquiry-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="flagship-hardware"
      className="relative bg-background py-24 border-y border-border/80 overflow-hidden transition-colors duration-300"
    >
      {/* Background ambient lighting effects */}
      <div
        className="absolute -top-44 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-sky-500/10 blur-[100px] rounded-full pointer-events-none -z-0"
      />

      <div className="container relative z-10">
        {/* ======================================================== */}
        {/* 1. HERO & VALUE PROPOSITION                              */}
        {/* ======================================================== */}
        <div className="max-w-[940px] mx-auto mb-16 text-center">
          {/* Executive Pill Badge */}
          <div className="inline-flex mb-5">
            <Badge
              variant="cyan"
              className="gap-2 py-1.5 px-4 text-xs font-extrabold uppercase tracking-wider rounded-full shadow-[0_0_20px_rgba(56,189,248,0.2)]"
            >
              <Sparkles size={14} /> Tier-1 Executive Flagship Hardware
            </Badge>
          </div>

          {/* High-Impact Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] text-foreground font-heading mb-5">
            Touch & Gesture Power Doors <br />
            <span className="bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-400 dark:from-sky-400 dark:via-cyan-300 dark:to-cyan-200 bg-clip-text text-transparent">
              & Smart Electronic Dimming Glass
            </span>
          </h2>

          {/* Subtext on Reliability & Compliance */}
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-[780px] mx-auto mb-8">
            Production-ready automotive mechatronics engineered for executive limousines, armored VIP coaches, and luxury OEM platforms. Fully compatible with CAN-FD and LIN vehicle networks, certified for ISO 26262 functional safety, and fortified with multi-sensor obstacle avoidance.
          </p>

          {/* Quick Regulatory Spec Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-9">
            <Badge variant="outline" className="gap-1.5 py-1 px-3 text-xs bg-card/60 backdrop-blur-sm">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span>ISO 26262 ASIL-B Certified</span>
            </Badge>
            <Badge variant="outline" className="gap-1.5 py-1 px-3 text-xs bg-card/60 backdrop-blur-sm">
              <Cpu size={14} className="text-sky-500" />
              <span>CAN-FD & LIN 2.2A Bus Native</span>
            </Badge>
            <Badge variant="outline" className="gap-1.5 py-1 px-3 text-xs bg-card/60 backdrop-blur-sm">
              <Zap size={14} className="text-amber-500" />
              <span>Current-Ripple Anti-Pinch</span>
            </Badge>
            <Badge variant="outline" className="gap-1.5 py-1 px-3 text-xs bg-card/60 backdrop-blur-sm">
              <Eye size={14} className="text-violet-500" />
              <span>TSER &gt; 84% Solar Blocking</span>
            </Badge>
          </div>

          {/* Dual Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              onClick={scrollToInquiry}
              size="lg"
              className="rounded-xl shadow-lg bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 text-white gap-2 font-bold"
            >
              <span>Request Hardware Kit Specs</span>
              <ArrowRight size={16} />
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => handleOpenDataSheet('door')}
              className="rounded-xl gap-2 font-semibold"
            >
              <FileText size={16} className="text-sky-600 dark:text-sky-400" />
              <span>View Technical Data Sheet</span>
            </Button>
          </div>
        </div>

        {/* 2. INTERACTIVE HARDWARE SIMULATOR */}
        <HardwareSimulator onRequestQuote={scrollToInquiry} />

        {/* 3. DEEP-DIVE HARDWARE SPECS (SIDE-BY-SIDE GRID) */}
        <HardwareSpecsGrid onOpenDataSheet={handleOpenDataSheet} />

        {/* 4. SYSTEM ARCHITECTURE & INTEGRATION DIAGRAM */}
        <SystemArchitectureDiagram />

        {/* 5. LEAD CAPTURE & ENGINEERING CONTACT FORM */}
        <EngineeringLeadForm />
      </div>

      {/* Engineering Technical Data Sheet Modal */}
      <TechDataSheetModal
        isOpen={dataSheetOpen}
        onClose={() => setDataSheetOpen(false)}
        initialSubsystem={selectedSubsystem}
      />
    </section>
  );
};
