import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronRight, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { SplashBackground } from './SplashBackground';
import { SplashEmblem } from './SplashEmblem';
import { SplashProgressBar } from './SplashProgressBar';
import { cn } from '@/lib/utils';

const TELEMETRY_STAGES = [
  { threshold: 0, text: 'INITIALIZING ARCHITECTURE...' },
  { threshold: 28, text: 'CALIBRATING OEM OPTICS...' },
  { threshold: 58, text: 'SYNCHRONIZING PRECISION MODULES...' },
  { threshold: 86, text: 'ACTIVATING AMBIENT SYSTEMS...' },
  { threshold: 100, text: 'TIER-1 PLATFORM READY' },
];

/**
 * Modern, high-performance automotive splash screen for Futuretech Innotech
 */
export const SplashScreen = ({ onComplete, duration = 1800 }) => {
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState(TELEMETRY_STAGES[0].text);
  const [isExiting, setIsExiting] = useState(false);
  const hasExitedRef = useRef(false);

  // Smooth exit handler with callback execution
  const handleExit = useCallback(() => {
    if (hasExitedRef.current) return;
    hasExitedRef.current = true;
    setIsExiting(true);

    const timeout = setTimeout(() => {
      if (typeof onComplete === 'function') {
        onComplete();
      }
    }, 450); // Matches transition duration

    return () => clearTimeout(timeout);
  }, [onComplete]);

  // Keyboard shortcut listener (Escape to skip)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleExit]);

  // Smooth 60fps progress ticker
  useEffect(() => {
    const startTime = performance.now();
    let frameId;

    const tick = (now) => {
      const elapsed = now - startTime;
      const calculated = Math.min(Math.round((elapsed / duration) * 100), 100);

      setProgress(calculated);

      // Determine current telemetry stage
      for (let i = TELEMETRY_STAGES.length - 1; i >= 0; i--) {
        if (calculated >= TELEMETRY_STAGES[i].threshold) {
          setStatusMessage(TELEMETRY_STAGES[i].text);
          break;
        }
      }

      if (calculated < 100) {
        frameId = requestAnimationFrame(tick);
      } else {
        // Brief pause at 100% before transition
        setTimeout(() => {
          handleExit();
        }, 180);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [duration, handleExit]);

  return (
    <div
      className={cn(
        'fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0a1120] text-foreground select-none overflow-hidden transition-all duration-500 ease-out',
        isExiting ? 'opacity-0 scale-105 blur-md pointer-events-none' : 'opacity-100 scale-100 blur-0'
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to Futuretech Innotech"
    >
      {/* Background Ambience & Scanning FX */}
      <SplashBackground />

      {/* Modern Top Controls: Skip Action */}
      <div className="absolute top-5 right-5 sm:top-7 sm:right-8 z-20">
        <button
          onClick={handleExit}
          type="button"
          className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-300 bg-white/5 hover:bg-sky-500/20 hover:text-white border border-white/10 hover:border-sky-500/40 backdrop-blur-md transition-all duration-200 shadow-sm cursor-pointer"
        >
          <span>Skip</span>
          <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Main Interactive Stage */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-lg w-full">
        {/* Animated Brand Emblem */}
        <SplashEmblem />

        {/* Tier-1 Industrial Badge - Cool Sky */}
        <div className="inline-flex mb-3.5">
          <Badge
            variant="sky"
            className="gap-2 py-1 px-3.5 text-[11px] font-semibold tracking-wider uppercase rounded-full shadow-[0_0_15px_rgba(14,165,233,0.2)] border-sky-500/40 bg-sky-500/10 text-sky-400"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span>Tier-1 Automotive Engineering</span>
          </Badge>
        </div>

        {/* Main Brand Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-2 font-heading text-white">
          FUTURETECH <span className="text-gradient-red">INNOTECH</span>
        </h1>

        {/* Brand Subtitle */}
        <p className="text-xs sm:text-sm text-slate-400 font-medium tracking-wide max-w-sm mb-7 leading-relaxed">
          Precision Auto Accessories • OEM Optical Systems • Advanced Tooling
        </p>

        {/* Dynamic Telemetry Progress Component */}
        <SplashProgressBar
          progress={progress}
          statusMessage={statusMessage}
        />
      </div>
    </div>
  );
};
