import React from 'react';
import companyData from '../data/company.json';

export const VehicleSelector = () => {
  const cars = companyData.company.featuredCars;

  return (
    <section id="vehicles" className="py-2">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {cars.map((car, index) => {
            const carNumber = car.num || `0${index + 1}`;

            return (
              <div
                key={car.id}
                className="group relative min-h-[320px] sm:min-h-[360px] rounded-2xl overflow-hidden p-5 flex flex-col justify-between transition-all duration-300 border border-slate-800/80 shadow-lg"
              >
                {/* Full-bleed Car Image Background */}
                <img
                  src={car.image}
                  alt={car.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Dark Vignette & Gradient Overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-slate-950/20" />

                {/* Top Badge & Number Row */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white/90 border border-white/15">
                    {carNumber}
                  </span>
                  <span className="text-[10.5px] font-bold px-2 py-0.5 rounded-md bg-white/15 backdrop-blur-md text-white border border-white/20">
                    {car.badge}
                  </span>
                </div>

                {/* Bottom Car Details */}
                <div className="relative z-10 pt-8">
                  <div className="text-[11px] text-sky-400 font-semibold uppercase tracking-wider mb-1">
                    {car.tag}
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white font-heading tracking-tight mb-2 leading-tight drop-shadow-md">
                    {car.name}
                  </h3>

                  <div className="flex items-center justify-between pt-2.5 border-t border-white/20 text-xs text-slate-200">
                    <span className="font-medium">Direct Fitments</span>
                    <span className="font-mono font-bold text-sky-300">
                      {car.compatibleCount}+ Custom Fits
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
