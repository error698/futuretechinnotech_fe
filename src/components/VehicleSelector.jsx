import React from 'react';
import { useRFQ } from '../context/RFQContext';
import { Car, CheckCircle2 } from 'lucide-react';
import companyData from '../data/company.json';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const VehicleSelector = () => {
  const { selectedVehicle, setSelectedVehicle } = useRFQ();
  const cars = companyData.company.featuredCars;

  return (
    <section id="vehicles" className="section pt-10 pb-16">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Car size={14} />
            <span>OEM Model Compatibility</span>
          </div>
          <h2 className="section-title">Shop by Vehicle Platform</h2>
          <p className="section-subtitle">
            Direct-fit OEM engineered components tailored specifically for India's bestselling automobile platforms with zero body modification required.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Universal Fit Option */}
          <Card
            onClick={() => setSelectedVehicle('All Vehicles')}
            className={`p-6 cursor-pointer text-center relative transition-all duration-300 hover:-translate-y-1 ${
              selectedVehicle === 'All Vehicles'
                ? 'border-2 border-primary bg-primary/10 shadow-md ring-1 ring-primary/30'
                : 'hover:border-primary/40 bg-card'
            }`}
          >
            <div className="text-4xl mb-3">🚗</div>
            <div className="font-extrabold text-lg text-foreground font-heading mb-1">
              All Vehicles
            </div>
            <div className="text-xs text-muted-foreground">108 Products Catalog</div>
            {selectedVehicle === 'All Vehicles' && (
              <div className="absolute top-3 right-3 text-primary">
                <CheckCircle2 size={18} />
              </div>
            )}
          </Card>

          {cars.map((car, index) => {
            const isSelected = selectedVehicle === car.name;
            return (
              <Card
                key={car.id}
                onClick={() => setSelectedVehicle(car.name)}
                className={`p-6 cursor-pointer relative transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between ${
                  isSelected
                    ? 'border-2 border-primary bg-primary/10 shadow-md ring-1 ring-primary/30'
                    : 'hover:border-primary/40 bg-card'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-3.5">
                    <span
                      className={`text-xs font-bold tracking-wider ${
                        isSelected ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    >
                      0{index + 1}
                    </span>
                    <Badge variant="red">{car.badge}</Badge>
                  </div>

                  <div className="font-extrabold text-lg text-foreground font-heading mb-1">
                    {car.name}
                  </div>
                  <div className="text-xs text-muted-foreground mb-4">
                    {car.tag}
                  </div>
                </div>

                <div
                  className={`flex items-center justify-between pt-3 border-t border-border/70 text-xs font-semibold ${
                    isSelected ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  <span>{car.compatibleCount}+ Custom Fits</span>
                  {isSelected && <CheckCircle2 size={16} />}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
