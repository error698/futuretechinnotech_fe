import React from 'react';

/**
 * High-end glassmorphic brand emblem with specular sweep and dynamic pulse rings
 */
export const SplashEmblem = () => {
  return (
    <div className="relative mb-7 select-none">
      {/* Primary animated pulse aura - Calm Cyan Glow */}
      <div className="splash-pulse-ring absolute -inset-4 rounded-3xl border border-sky-400/30 shadow-[0_0_35px_rgba(56,189,248,0.25)] pointer-events-none" />

      {/* Secondary outer dashed rotation aura */}
      <div className="splash-pulse-ring-outer absolute -inset-7 rounded-[32px] border border-dashed border-sky-400/20 pointer-events-none" />

      {/* Glassmorphic logo container */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl sm:rounded-3xl bg-white/95 backdrop-blur-xl p-3 sm:p-3.5 shadow-[0_20px_45px_-10px_rgba(0,0,0,0.5),0_0_30px_rgba(56,189,248,0.25)] border border-white/90 flex items-center justify-center overflow-hidden transition-transform duration-500 hover:scale-105">
        {/* Specular metallic light gleam sweep */}
        <div className="splash-logo-shimmer" />

        {/* Company Emblem */}
        <img
          src="/images/site/ftit-logo-vertical.png"
          alt="Futuretech Innotech Logo"
          className="w-full h-full object-contain drop-shadow-sm filter"
          draggable={false}
        />
      </div>
    </div>
  );
};
