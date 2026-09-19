import React from 'react';
import { ContactSection } from '../components/ContactSection';
import { useRouter } from '../context/RouterContext';
import { ChevronRight, MapPin, Phone, Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const ContactPage = () => {
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
          <span className="text-primary font-bold">Contact</span>
        </div>

        <div className="max-w-3xl">
          <div className="inline-flex mb-3">
            <Badge variant="sky" className="gap-1.5 py-1 px-3 text-xs font-semibold">
              <MapPin size={14} className="text-sky-500" />
              <span>Shivaji Vihar • New Delhi</span>
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground font-heading tracking-tight mb-4">
            Contact & Headquarters
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Reach out directly to Futuretech Innotech (FTIT) for Tier-1 OEM production contracts, dealership distribution, precision electroplating orders, and fleet technical consultations.
          </p>
        </div>
      </div>

      {/* Main Contact Section */}
      <ContactSection />
    </div>
  );
};
