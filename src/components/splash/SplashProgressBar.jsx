import React from 'react';
import { Cpu } from 'lucide-react';

/**
 * Precision automotive gauge progress bar with dynamic live telemetry
 */
export const SplashProgressBar = ({ progress, statusMessage }) => {
  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto select-none">
      {/* Telemetry Status Header */}
      <div className="flex items-center justify-between gap-2 mb-2.5 text-xs font-mono">
        <div className="flex items-center gap-1.5 text-slate-300 font-medium tracking-wide">
          <Cpu className="w-3.5 h-3.5 text-sky-400 animate-pulse shrink-0" />
          <span className="truncate">{statusMessage}</span>
        </div>
        <span className="text-sky-400 font-bold tabular-nums shrink-0">
          {progress}%
        </span>
      </div>

      {/* Progress Track */}
      <div
        className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden relative border border-white/5 backdrop-blur-sm"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Application loading progress"
      >
        {/* Glowing Progress Fill - Cool Ocean Azure */}
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-600 via-sky-400 to-cyan-300 shadow-[0_0_14px_rgba(56,189,248,0.75)] transition-[width] duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Industrial Certification Tag */}
      <div className="mt-3 flex items-center justify-center gap-1.5 text-[10.5px] tracking-widest text-slate-500 uppercase font-mono">
        <span>IATF 16949</span>
        <span className="text-slate-700">•</span>
        <span>ISO 9001 CERTIFIED</span>
      </div>
    </div>
  );
};
