import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import companyData from '../data/company.json';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const Footer = () => {
  const { contact } = companyData.company;
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-background border-t border-border/80 pt-16 pb-8 relative transition-colors duration-300">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center p-0.5 shadow-sm border border-border shrink-0">
                <img
                  src="/images/site/ftit-logo-vertical.png"
                  alt="FTIT Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-extrabold text-lg text-foreground font-heading">
                FUTURETECH <span className="text-red-600 dark:text-red-500">INNOTECH</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-5">
              India's largest & completely integrated design, engineering, and manufacturing solutions under one roof. Established in 2010.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck size={16} className="text-red-600 dark:text-red-500 shrink-0" />
              <span>IATF 16949 & ISO 9001:2015 Registered</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="text-xs font-bold text-foreground uppercase tracking-wider mb-4 font-heading">
              Quick Navigation
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
              <li>
                <a href="#flagship-hardware" className="hover:text-foreground font-semibold text-sky-600 dark:text-sky-400 transition-colors">
                  ⚡ Flagship Hardware Systems
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-foreground transition-colors">
                  108 Products Catalog
                </a>
              </li>
              <li>
                <a href="#vehicles" className="hover:text-foreground transition-colors">
                  Shop by Vehicle (Hycross, Thar, Nexon)
                </a>
              </li>
              <li>
                <a href="#finishes" className="hover:text-foreground transition-colors">
                  Electroplating Finishing Studio
                </a>
              </li>
              <li>
                <a href="#pillars" className="hover:text-foreground transition-colors">
                  Design & Manufacturing Facilities
                </a>
              </li>
              <li>
                <a href="#advisor" className="hover:text-foreground text-sky-600 dark:text-sky-400 transition-colors">
                  AI Recommender Engine
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-foreground transition-colors">
                  Headquarters & Inquiry
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <div className="text-xs font-bold text-foreground uppercase tracking-wider mb-4 font-heading">
              Registered Office
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3">
              {contact.address}
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground mb-1.5">
              <b className="text-foreground">Phone:</b>{' '}
              <a href={`tel:${contact.phone}`} className="hover:text-foreground text-foreground font-semibold transition-colors">
                {contact.phone}
              </a>
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">
              <b className="text-foreground">Email:</b>{' '}
              <a href={`mailto:${contact.email}`} className="hover:text-foreground text-foreground font-semibold transition-colors">
                {contact.email}
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <div className="text-xs font-bold text-foreground uppercase tracking-wider mb-4 font-heading">
              OEM & Tech Updates
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mb-3.5 leading-relaxed">
              Subscribe to receive new vehicle accessory launches and technical engineering whitepapers.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                <CheckCircle2 size={16} />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter work email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-xs h-10"
                />
                <Button type="submit" size="icon" className="h-10 w-10 shrink-0 rounded-xl" aria-label="Subscribe">
                  <Send size={15} />
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-7 border-t border-border/80 flex flex-wrap justify-between items-center gap-4 text-xs text-muted-foreground">
          <div>
            © 2026 Futuretech Innotech (FTIT). All rights reserved. Precision Tier-1 Automotive Solutions.
          </div>
          <div className="flex gap-5">
            <a href="#privacy" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-foreground transition-colors">Terms & Conditions</a>
            <a href="#sitemap" className="hover:text-foreground transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
