import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Menu, Car, Sparkles, Zap, Sun, Moon, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { useRouter } from '../context/RouterContext';

export const Navbar = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  const { currentPath, navigate } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Flagship Hardware', path: '/flagship', icon: Zap },
    { label: 'Products', path: '/products' },
    { label: 'Shop by Car', path: '/vehicles' },
    { label: 'Finishing Studio', path: '/finishing' },
    { label: 'Engineering', path: '/engineering' },
    { label: 'About FTIT', path: '/about' },
  ];

  const handleNavClick = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/75 dark:bg-slate-950/75 backdrop-blur-xl border-b border-white/60 dark:border-white/10 py-3.5 shadow-[0_4px_24px_rgba(0,0,0,0.04)]'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="container flex items-center justify-between gap-4 w-full">
        {/* Brand Logo with Official Company Emblem - Navigates to Home */}
        <button
          onClick={() => handleNavClick('/')}
          className="flex items-center gap-3 no-underline shrink-0 group text-left cursor-pointer bg-transparent border-0 p-0"
        >
          <div className="w-[42px] h-[42px] rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center p-1 shrink-0 shadow-md border border-white/80 dark:border-white/20 transition-transform duration-300 group-hover:scale-105">
            <img
              src="/images/site/ftit-logo-vertical.png"
              alt="Futuretech Innotech Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="whitespace-nowrap shrink-0">
            <div className="font-extrabold text-[17px] tracking-tight leading-tight text-foreground font-heading whitespace-nowrap">
              FUTURETECH <span className="text-sky-600 dark:text-sky-400">INNOTECH</span>
            </div>
            <div className="text-[9.5px] text-muted-foreground tracking-widest uppercase font-semibold mt-0.5 whitespace-nowrap">
              Precision Auto Solutions
            </div>
          </div>
        </button>

        {/* Spacious Desktop Nav - Dedicated Page Routing */}
        <nav className="desktop-nav">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`nav-link cursor-pointer relative py-2 px-1 transition-all text-xs font-medium flex items-center gap-1.5 ${
                  isActive
                    ? 'text-sky-600 dark:text-sky-400 font-bold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {Icon && (
                  <Icon
                    size={13}
                    className={`shrink-0 transition-colors ${
                      isActive ? 'text-sky-600 dark:text-sky-400' : 'text-muted-foreground'
                    }`}
                  />
                )}
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-gradient-to-r from-sky-500 via-cyan-400 to-sky-500 rounded-full shadow-[0_0_8px_rgba(14,165,233,0.7)]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0 whitespace-nowrap">
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

          {/* Contact Inquiry CTA Button - Navigates to /contact */}
          <Button
            onClick={() => handleNavClick('/contact')}
            variant="default"
            className={`rounded-full h-10 px-5 font-semibold text-xs gap-1.5 hidden sm:inline-flex cursor-pointer transition-all shadow-sm ${
              currentPath === '/contact'
                ? 'ring-2 ring-primary ring-offset-2 ring-offset-background shadow-md'
                : 'hover:opacity-95'
            }`}
          >
            <span>Contact Us</span>
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

                  <div className="flex flex-col gap-1.5 text-base">
                    {navItems.map((item) => {
                      const isActive = currentPath === item.path;
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.path}
                          onClick={() => handleNavClick(item.path)}
                          className={`flex items-center justify-between text-left py-2.5 px-3 rounded-xl transition-colors font-semibold border ${
                            isActive
                              ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 font-bold border-sky-500/30'
                              : 'text-foreground hover:bg-muted/60 border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            {Icon && <Icon size={17} className="text-sky-500 shrink-0" />}
                            <span>{item.label}</span>
                          </div>
                          {isActive && (
                            <span className="w-2 h-2 rounded-full bg-sky-500" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Mobile Contact Us Action */}
                  <div className="pt-4 mt-2">
                    <Button
                      onClick={() => handleNavClick('/contact')}
                      variant="default"
                      className={`w-full rounded-xl h-11 font-semibold text-sm gap-2 cursor-pointer ${
                        currentPath === '/contact' ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''
                      }`}
                    >
                      <Mail size={16} />
                      <span>Contact Us</span>
                    </Button>
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
