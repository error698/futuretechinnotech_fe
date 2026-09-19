import React from 'react';
import { Hero } from '../components/Hero';
import { useRouter } from '../context/RouterContext';
import {
  ArrowRight,
  Zap,
  Car,
  Sparkles,
  Layers,
  Cog,
  Award,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Mail
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const HomePage = () => {
  const { navigate } = useRouter();

  const portalCards = [
    {
      title: 'Flagship Hardware',
      path: '/flagship',
      icon: Zap,
      badge: 'Next-Gen Mechatronics',
      description:
        'Touch & gesture automatic power doors and multi-zone dimming electrochromic smart glass with live interactive simulation.',
      cta: 'Explore Flagship Systems',
    },
    {
      title: '108+ Products Catalog',
      path: '/products',
      icon: Layers,
      badge: 'Full Inventory',
      description:
        'Factory-grade auto accessories, aerodynamic spoilers, ambient LED lighting, chrome trim, and direct-fit styling components.',
      cta: 'Browse Catalog',
    },
    {
      title: 'Shop by Car Platform',
      path: '/vehicles',
      icon: Car,
      badge: 'CAD-Matched',
      description:
        'Direct-fit components tailored specifically for Toyota Hycross, Thar/Roxx, Nexon EV, Punch EV, and Scorpio-N.',
      cta: 'Select Vehicle',
    },
    {
      title: 'Finishing Studio',
      path: '/finishing',
      icon: Sparkles,
      badge: 'PVD & Electroplating',
      description:
        'Hexavalent & Trivalent bright chrome, satin frosted, smoke black chrome, rose gold, and high-gloss piano black.',
      cta: 'View Finishes',
    },
    {
      title: 'Engineering & Facilities',
      path: '/engineering',
      icon: Cog,
      badge: 'IATF 16949',
      description:
        'Integrated CAD/CAM metrology, precision tooling, robotic injection molding, and cleanroom electronics assembly.',
      cta: 'View Facilities',
    },
    {
      title: 'About Futuretech Innotech',
      path: '/about',
      icon: Award,
      badge: 'Since 2010',
      description:
        "India's premier Tier-1 manufacturer with 150+ engineers, $1.8M+ revenue, and global OEM certifications.",
      cta: 'Read Our Story',
    },
    {
      title: 'Contact & Headquarters',
      path: '/contact',
      icon: MapPin,
      badge: 'New Delhi Campus',
      description:
        'Direct line, technical inquiries, distributor partnerships, and Shivaji Vihar manufacturing facility details.',
      cta: 'Get In Touch',
    },
  ];

  return (
    <div className="pb-20 space-y-16 sm:space-y-24">
      {/* Hero Welcome Banner */}
      <Hero />

      {/* Main Exploration Hub: Independent Page Portals */}
      <section className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex mb-3">
            <Badge variant="sky" className="gap-1.5 py-1 px-3 text-xs font-semibold">
              <ShieldCheck size={14} className="text-sky-500" />
              <span>Platform Navigator</span>
            </Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground font-heading tracking-tight mb-3">
            Explore Dedicated Divisions
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Select any division below to access dedicated specifications, interactive simulators, product catalogs, and engineering capabilities.
          </p>
        </div>

        {/* 8 Portal Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {portalCards.map((card) => {
            const Icon = card.icon;
            return (
              <Card
                key={card.path}
                onClick={() => navigate(card.path)}
                className="p-6 cursor-pointer group hover:border-sky-400/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-sky-500/10 border border-sky-500/25 flex items-center justify-center text-sky-600 dark:text-sky-400 transition-transform duration-300 group-hover:scale-110 shadow-sm">
                      <Icon size={20} />
                    </div>
                    <Badge variant="outline" className="text-[10.5px] font-semibold">
                      {card.badge}
                    </Badge>
                  </div>

                  <h3 className="font-bold text-lg text-foreground font-heading mb-2 group-hover:text-primary transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    {card.description}
                  </p>
                </div>

                <div className="pt-3.5 border-t border-border/60 flex items-center justify-between text-xs font-semibold text-primary">
                  <span>{card.cta}</span>
                  <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Tier-1 Quality & Manufacturing Assurance Banner */}
      <section className="container">
        <Card className="p-8 sm:p-10 relative overflow-hidden">
          <div className="max-w-3xl">
            <Badge variant="sky" className="mb-4 gap-1.5 py-1 px-3 text-xs font-semibold">
              <ShieldCheck size={14} className="text-sky-500" />
              <span>Direct OEM Partnership Standards</span>
            </Badge>

            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-foreground tracking-tight mb-3">
              Precision Engineering with Zero Compromise
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8">
              All components manufactured at Futuretech Innotech adhere to strict automotive standards including IATF 16949, ISO 9001, ASTM B117 salt spray endurance, and REACH/RoHS environmental compliances.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { title: 'IATF 16949:2016', desc: 'Direct OEM Certified' },
                { title: 'In-House Metrology', desc: 'Zeiss 3D Optical CMM' },
                { title: 'Zero-Defect Quality', desc: 'Poka-Yoke Assembly' },
                { title: '480h Salt Spray', desc: 'ASTM B117 Tested' },
              ].map((item) => (
                <div key={item.title} className="p-4 rounded-xl bg-muted/40 border border-border/60">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-foreground mb-1">
                    <CheckCircle2 size={14} className="text-sky-600 dark:text-sky-400 shrink-0" />
                    <span>{item.title}</span>
                  </div>
                  <div className="text-[11px] text-muted-foreground">{item.desc}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                onClick={() => navigate('/contact')}
                className="rounded-full shadow-md gap-2 cursor-pointer"
              >
                <Mail size={16} />
                <span>Contact Headquarters & Facility</span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/engineering')}
                className="rounded-full cursor-pointer"
              >
                <span>Explore Engineering Facilities</span>
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
};
