import React from 'react';
import { ManufacturingPillars } from '../components/ManufacturingPillars';
import { useRouter } from '../context/RouterContext';
import { ChevronRight, Cog, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export const EngineeringPage = () => {
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
          <span className="text-primary font-bold">Engineering</span>
        </div>

        <div className="max-w-3xl">
          <div className="inline-flex mb-3">
            <Badge variant="sky" className="gap-1.5 py-1 px-3 text-xs font-semibold">
              <Cog size={14} className="text-sky-500" />
              <span>Full-Stack OEM Infrastructure</span>
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground font-heading tracking-tight mb-4">
            Engineering & Manufacturing Facility
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            From initial sketch and aerodynamic CFD modeling to micro-tolerance CNC tooling, high-pressure injection molding, and cleanroom electronics integration—all managed in-house at our New Delhi facility.
          </p>
        </div>
      </div>

      {/* Main Pillars Showcase */}
      <ManufacturingPillars />

      {/* Engineering Standards Deep Dive */}
      <div className="container">
        <Card className="p-8 sm:p-10 border-white/80 dark:border-white/10 bg-white/75 dark:bg-card/75 backdrop-blur-xl">
          <h3 className="text-xl sm:text-2xl font-bold font-heading text-foreground mb-4">
            Quality Control & Zero-Defect Manufacturing
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            Futuretech Innotech operates under strict Poka-Yoke error-proofing standards. Every production lot undergoes coordinate measuring machine (CMM) dimensional verification, spectrophotometer color consistency checks, and environmental endurance cycling.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              'IATF 16949:2016 Certified Facility',
              'Zeiss 3D Optical CMM Verification',
              '100% In-Line Torque & Seal Auditing',
              'ASTM B117 Salt Fog Corrosion Testing',
              'CAN Bus & LIN Hardware Verification',
              'RoHS & REACH Material Compliance'
            ].map((std) => (
              <div key={std} className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-foreground">
                <CheckCircle2 size={16} className="text-sky-600 dark:text-sky-400 shrink-0" />
                <span>{std}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
