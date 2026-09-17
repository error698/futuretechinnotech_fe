import React, { useState, useEffect } from 'react';
import { useRFQ } from '../context/RFQContext';
import { Sparkles, Plus, Check } from 'lucide-react';
import productsData from '../data/products.json';
import { API_ENDPOINTS } from '../config/api';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const AIAdvisor = ({ onSelectProduct }) => {
  const { addToRFQ, rfqItems } = useRFQ();
  const [selectedCar, setSelectedCar] = useState('Toyota Hycross');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [recommendations, setRecommendations] = useState([]);
  const [serviceStatus, setServiceStatus] = useState('Python FastAPI Connected');

  const fetchRecommendations = async () => {
    try {
      const res = await fetch(API_ENDPOINTS.recommend(selectedCar, selectedPriority, 4));
      if (res.ok) {
        const data = await res.json();
        setRecommendations(data.recommendations);
        setServiceStatus('Python FastAPI Microservice (Active)');
        return;
      }
    } catch (e) {
      console.warn('Python service ping failed, using local rule engine:', e);
      setServiceStatus('Local Fallback Mode');
    }

    // Client fallback
    const matched = productsData.filter((p) => {
      const compat = p.compatible_cars.map((c) => c.toLowerCase());
      return compat.some((c) => c.includes(selectedCar.toLowerCase())) || compat.includes('universal fit');
    });

    if (selectedPriority === 'interior') {
      matched.sort((a, b) => (a.category.includes('Interior') ? -1 : 1));
    } else if (selectedPriority === 'exterior') {
      matched.sort((a, b) => (a.category.includes('Exterior') || a.category.includes('Aerodynamics') ? -1 : 1));
    } else if (selectedPriority === 'ev') {
      matched.sort((a, b) => (a.category.includes('EV') ? -1 : 1));
    }

    setRecommendations(matched.slice(0, 4));
  };

  useEffect(() => {
    fetchRecommendations();
  }, [selectedCar, selectedPriority]);

  return (
    <section id="advisor" className="section relative">
      <div className="container">
        <Card className="p-8 sm:p-12 bg-card border-border/80 shadow-xl">
          {/* Header */}
          <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
            <div>
              <div className="inline-flex mb-3">
                <Badge variant="cyan" className="gap-2 py-1 px-3 text-xs uppercase tracking-wider font-bold">
                  <Sparkles size={14} />
                  <span>Python Microservice Engine</span>
                </Badge>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground font-heading tracking-tight mb-2">
                Automotive Accessory Recommender
              </h2>
              <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
                Powered by our Python backend. Select your exact vehicle model and lifestyle preference to get AI-optimized accessory kits.
              </p>
            </div>

            <Badge variant="outline" className="gap-2 py-1.5 px-3 bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-sky-500 shadow-[0_0_8px_#38BDF8]" />
              <span>{serviceStatus}</span>
            </Badge>
          </div>

          {/* Interactive Pickers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl bg-muted/40 border border-border/70 mb-9">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-foreground uppercase tracking-wider">
                1. Select Vehicle Platform
              </label>
              <select
                value={selectedCar}
                onChange={(e) => setSelectedCar(e.target.value)}
                className="flex h-11 w-full rounded-xl border border-input bg-background/90 px-4 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="Toyota Hycross">Toyota Innova Hycross</option>
                <option value="Mahindra Thar">Mahindra Thar / Roxx 4x4</option>
                <option value="Tata Nexon">Tata New Nexon / EV</option>
                <option value="Tata Punch">Tata Punch / EV</option>
                <option value="Mahindra Scorpio-N">Mahindra Scorpio-N</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-foreground uppercase tracking-wider">
                2. Upgrade Priority
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'All-Rounder' },
                  { id: 'interior', label: 'Cabin Comfort' },
                  { id: 'exterior', label: 'Styling & Aero' },
                  { id: 'ev', label: 'EV & Utility' }
                ].map((pr) => (
                  <Button
                    key={pr.id}
                    variant={selectedPriority === pr.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedPriority(pr.id)}
                    className={`rounded-xl text-xs font-semibold h-11 px-4 ${
                      selectedPriority === pr.id
                        ? 'bg-sky-600 hover:bg-sky-500 text-white'
                        : ''
                    }`}
                  >
                    {pr.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {recommendations.map((item) => {
              const inCart = rfqItems.some((it) => it.id === item.id);
              return (
                <Card
                  key={item.id}
                  onClick={() => onSelectProduct(item)}
                  className="p-4 flex flex-col justify-between cursor-pointer bg-card border-border/70 hover:border-sky-500/40 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md group"
                >
                  <div>
                    <div className="h-32 flex items-center justify-center p-2 mb-3 bg-gradient-to-b from-slate-800 to-slate-950 rounded-xl overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="max-h-24 max-w-[90%] object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="text-[10px] text-sky-600 dark:text-sky-400 font-bold uppercase tracking-wider mb-1">
                      {item.category}
                    </div>
                    <div className="font-bold text-sm text-foreground font-heading line-clamp-2 mb-4 leading-snug">
                      {item.name}
                    </div>
                  </div>

                  <Button
                    size="sm"
                    variant={inCart ? 'secondary' : 'default'}
                    onClick={(e) => {
                      e.stopPropagation();
                      addToRFQ(item, 1);
                    }}
                    className={`w-full rounded-xl gap-1.5 h-9 font-semibold text-xs ${
                      inCart
                        ? 'border-sky-500/40 text-sky-600 dark:text-sky-400'
                        : 'bg-sky-600 hover:bg-sky-500 text-white'
                    }`}
                  >
                    {inCart ? <Check size={14} /> : <Plus size={14} />}
                    <span>{inCart ? 'In RFQ' : 'Add to RFQ'}</span>
                  </Button>
                </Card>
              );
            })}
          </div>
        </Card>
      </div>
    </section>
  );
};
