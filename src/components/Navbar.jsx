import React, { useState, useEffect } from 'react';
import { useRFQ } from '../context/RFQContext';
import { useTheme } from '../context/ThemeContext';
import { ShoppingBag, Menu, Car, Sparkles, Zap, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export const Navbar = () => {
  const { totalItemsCount, setIsModalOpen, selectedVehicle } = useRFQ();
  const { theme, toggleTheme, isDark } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-background/90 backdrop-blur-md border-b border-border/80 py-3.5 shadow-sm'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="container flex items-center justify-between gap-4 w-full">
        {/* Brand Logo with Official Company Emblem */}
        <a href="#" className="flex items-center gap-3 no-underline shrink-0 group">
          <div className="w-[42px] h-[42px] rounded-xl bg-white flex items-center justify-center p-0.5 shrink-0 shadow-md border border-border/80 transition-transform duration-300 group-hover:scale-105">
            <img
              src="/images/site/ftit-logo-vertical.png"
              alt="Futuretech Innotech Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="whitespace-nowrap shrink-0">
            <div className="font-extrabold text-[17px] tracking-tight leading-tight text-foreground font-heading whitespace-nowrap">
              FUTURETECH <span className="text-red-600 dark:text-red-500">INNOTECH</span>
            </div>
            <div className="text-[9.5px] text-muted-foreground tracking-widest uppercase font-semibold mt-0.5 whitespace-nowrap">
              Precision Auto Solutions
            </div>
          </div>
        </a>

        {/* Spacious Desktop Nav - Single Line Guaranteed */}
        <nav className="desktop-nav">
          <a
            href="#flagship-hardware"
            className="nav-link text-cyan-600 dark:text-cyan-400 font-bold"
          >
            <Zap size={14} className="shrink-0" /> Flagship Hardware
          </a>
          <a href="#catalog" className="nav-link">
            Products
          </a>
          <a href="#vehicles" className="nav-link">
            Shop by Car
          </a>
          <a href="#finishes" className="nav-link">
            Finishing Studio
          </a>
          <a href="#pillars" className="nav-link">
            Engineering
          </a>
          <a
            href="#advisor"
            className="nav-link text-cyan-600 dark:text-cyan-400 font-semibold"
          >
            <Sparkles size={14} className="shrink-0" /> AI Recommender
          </a>
          <a href="#about" className="nav-link">
            About FTIT
          </a>
          <a href="#contact" className="nav-link">
            Contact
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0 whitespace-nowrap">
          {/* Active Vehicle pill if selected (wide screens) */}
          {selectedVehicle && selectedVehicle !== 'All Vehicles' && (
            <a href="#vehicles" className="vehicle-indicator">
              <Badge variant="red" className="gap-1.5 py-1 px-3 text-xs font-semibold cursor-pointer">
                <Car size={13} />
                <span>{selectedVehicle}</span>
              </Badge>
            </a>
          )}

          {/* Light / Dark Mode Toggle */}
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Light and Dark Mode"
            className="h-10 w-10 rounded-xl"
          >
            {isDark ? (
              <Sun size={18} className="text-amber-400 transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon size={18} className="text-sky-600 transition-transform duration-300 hover:-rotate-12" />
            )}
          </Button>

          {/* RFQ Basket Button */}
          <Button
            id="rfq-cart-btn"
            onClick={() => setIsModalOpen(true)}
            variant={totalItemsCount > 0 ? 'default' : 'secondary'}
            className="gap-2 rounded-full h-10 px-4 font-semibold text-[13.5px]"
          >
            <ShoppingBag size={16} />
            <span>RFQ Quote</span>
            {totalItemsCount > 0 && (
              <span className="bg-white text-red-600 w-[18px] h-[18px] rounded-full inline-flex items-center justify-center text-[10.5px] font-extrabold shadow-sm">
                {totalItemsCount}
              </span>
            )}
          </Button>

          {/* Mobile Sheet Navigation */}
          <div className="mobile-toggle">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl" aria-label="Open mobile menu">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-md flex flex-col justify-between">
                <div>
                  <SheetHeader className="mb-6">
                    <SheetTitle className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center p-0.5 border border-border">
                        <img
                          src="/images/site/ftit-logo-vertical.png"
                          alt="FTIT"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="text-lg">FUTURETECH INNOTECH</span>
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex flex-col gap-3.5 text-base">
                    <a
                      href="#flagship-hardware"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 font-bold text-cyan-600 dark:text-cyan-400 py-2 border-b border-border/50"
                    >
                      <Zap size={18} /> Flagship Hardware Systems
                    </a>
                    <a
                      href="#catalog"
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-semibold text-foreground py-2 border-b border-border/50"
                    >
                      Products Catalog (108+)
                    </a>
                    <a
                      href="#vehicles"
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-semibold text-foreground py-2 border-b border-border/50"
                    >
                      Shop by Vehicle Platform
                    </a>
                    <a
                      href="#finishes"
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-semibold text-foreground py-2 border-b border-border/50"
                    >
                      Finishing Studio & Coatings
                    </a>
                    <a
                      href="#pillars"
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-semibold text-foreground py-2 border-b border-border/50"
                    >
                      Engineering & Manufacturing
                    </a>
                    <a
                      href="#advisor"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 font-semibold text-cyan-600 dark:text-cyan-400 py-2 border-b border-border/50"
                    >
                      <Sparkles size={16} /> AI Recommender (Python)
                    </a>
                    <a
                      href="#about"
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-semibold text-foreground py-2 border-b border-border/50"
                    >
                      About FTIT
                    </a>
                    <a
                      href="#contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-semibold text-foreground py-2 border-b border-border/50"
                    >
                      Contact & Location
                    </a>
                  </div>
                </div>

                {/* Mobile Drawer Footer Theme Toggle */}
                <div className="pt-6 border-t border-border flex items-center justify-between">
                  <span className="text-sm font-semibold text-muted-foreground">Color Theme</span>
                  <Button
                    variant="outline"
                    onClick={toggleTheme}
                    className="gap-2 h-9 text-xs"
                  >
                    {isDark ? <Sun size={15} className="text-amber-400" /> : <Moon size={15} className="text-sky-600" />}
                    <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <style>{`
        .desktop-nav {
          display: none;
          align-items: center;
          gap: clamp(10px, 1.35vw, 22px);
          white-space: nowrap;
          flex-shrink: 1;
        }
        .nav-link {
          font-size: clamp(12.5px, 0.9vw, 14px);
          font-weight: 500;
          color: hsl(var(--muted-foreground));
          text-decoration: none;
          transition: all 0.2s ease;
          padding: 6px 2px;
          position: relative;
          white-space: nowrap !important;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          flex-shrink: 0;
          letter-spacing: -0.01em;
        }
        .nav-link:hover {
          color: hsl(var(--foreground));
        }
        .vehicle-indicator {
          display: none;
        }
        @media (min-width: 1140px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
        @media (min-width: 1340px) {
          .vehicle-indicator { display: inline-flex !important; }
        }
        @media (max-width: 1240px) {
          .nav-link {
            font-size: 13px;
          }
        }
      `}</style>
    </header>
  );
};
