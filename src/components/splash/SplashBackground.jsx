import React from 'react';

/**
 * Modern cyber-automotive ambient backdrop with laser optic scanline
 */
export const SplashBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {/* Dynamic radial glows - Cool Serene Ocean */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/12 rounded-full blur-[130px]" />
      <div className="absolute bottom-10 left-10 w-[380px] h-[380px] bg-cyan-500/10 rounded-full blur-[100px]" />
      <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[90px]" />

      {/* Cybernetic geometric grid */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Precision Optic Laser Scanner - Cool Azure */}
      <div className="splash-laser-beam absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sky-400 to-transparent shadow-[0_0_20px_2px_rgba(56,189,248,0.6)]" />
    </div>
  );
};
