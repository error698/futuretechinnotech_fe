import React, { useState, useEffect, useRef } from 'react';
import { 
  Eye, 
  ShieldCheck, 
  Sun, 
  Moon,
  Zap, 
  Hand, 
  Activity, 
  Lock, 
  Radio, 
  Gauge, 
  CheckCircle2,
  AlertOctagon,
  Sparkles,
  Layers,
  Droplets,
  Shield,
  ArrowRight
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const HardwareSimulator = () => {
  const [activeTab, setActiveTab] = useState('glass'); // 'glass' | 'door'

  // =========================================================================
  // 1. SMART DIMMING GLASS STATE & LOGIC
  // =========================================================================
  const [tintLevel, setTintLevel] = useState(55); // 0 (Clear) to 100 (Opaque)
  const [dimmingMode, setDimmingMode] = useState('full'); // 'full' | 'segmented'
  const [segments, setSegments] = useState({ top: 85, mid: 45, low: 30 }); // individual zones
  const [filmHue, setFilmHue] = useState('cobalt'); // 'cobalt' | 'obsidian' | 'emerald'
  const [environment, setEnvironment] = useState('sun'); // 'sun' | 'sunset' | 'night'
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Trigger quick preset
  const applyTintPreset = (level) => {
    setIsTransitioning(true);
    setTintLevel(level);
    if (dimmingMode === 'segmented') {
      setSegments({ top: level, mid: level, low: level });
    }
    setTimeout(() => setIsTransitioning(false), 800);
  };

  // Toggle individual segment in segmented mode
  const toggleSegment = (zone) => {
    setSegments((prev) => {
      const current = prev[zone];
      const next = current > 50 ? 10 : 90;
      return { ...prev, [zone]: next };
    });
  };

  // Calculate dynamic physical metrics
  const activeEffectiveTint = dimmingMode === 'segmented' 
    ? Math.round((segments.top + segments.mid + segments.low) / 3) 
    : tintLevel;

  const vlt = Math.max(0.6, (100 - activeEffectiveTint) * 0.73).toFixed(1);
  const tser = Math.min(88.4, 32.5 + (activeEffectiveTint * 0.55)).toFixed(1);
  const cabinTemp = (20.8 + (1 - activeEffectiveTint / 100) * 17.2).toFixed(1);
  const solarLux = Math.round((100 - activeEffectiveTint) * 950);

  // Film color configuration
  const filmHues = {
    cobalt: {
      name: 'Executive Cobalt Sapphire',
      bgRgb: '12, 28, 62',
      accent: '#38BDF8',
      desc: 'Industry standard for German luxury VIP limousines & Boeing 787 dimming.',
    },
    obsidian: {
      name: 'Obsidian Smoke Blackout',
      bgRgb: '5, 8, 15',
      accent: '#94A3B8',
      desc: 'Deep neutral monochrome tone with total privacy blackout.',
    },
    emerald: {
      name: 'Polarized Alpine Emerald',
      bgRgb: '6, 36, 26',
      accent: '#34D399',
      desc: 'High-contrast glare-reduction matrix with anti-reflective polarizers.',
    },
  };

  const currentHue = filmHues[filmHue];

  // =========================================================================
  // 2. GESTURE & TOUCH POWER DOORS STATE & LOGIC
  // =========================================================================
  const [doorState, setDoorState] = useState('CLOSED'); // 'CLOSED' | 'UNLATCHING' | 'SWINGING_OPEN' | 'OPEN' | 'OBSTACLE_HALTED' | 'SWINGING_CLOSE' | 'CINCHING'
  const [doorAngle, setDoorAngle] = useState(0); // 0 to 72 degrees
  const [lastTriggerMethod, setLastTriggerMethod] = useState(null);
  const [obstacleSimActive, setObstacleSimActive] = useState(false);
  const [obstacleHalted, setObstacleHalted] = useState(false);
  const [gestureSwiping, setGestureSwiping] = useState(false);
  const [handleExtended, setHandleExtended] = useState(false);
  const [keyfobUnlocked, setKeyfobUnlocked] = useState(false);
  const [cycleCount, setCycleCount] = useState(14820);
  const [softCloseActive, setSoftCloseActive] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState('audi');

  // Real vehicle photography configurations from Unsplash.com
  const vehicleOptions = {
    audi: {
      id: 'audi',
      name: 'Audi A5 Sportback',
      badge: 'Unsplash: Erik Mclean',
      image: '/images/flagship/power-door-vehicle.jpg',
      handle: { top: '50.8%', left: '61.5%' },
      kick: { bottom: '15%', left: '60%' },
      radar: { top: '46%', left: '65%' },
      doorWing: { top: '47%', left: '53.5%' },
      hingeSvg: { cx: 428, cy: 238 },
      arcPath: 'M 428 238 A 130 130 0 0 1 545 330',
      obstacle: { top: '56%', left: '72%' },
    },
    mercedes: {
      id: 'mercedes',
      name: 'Mercedes-AMG GT',
      badge: 'Unsplash: Campbell',
      image: '/images/flagship/power-door-mercedes.jpg',
      handle: { top: '48%', left: '81%' },
      kick: { bottom: '18%', left: '70%' },
      radar: { top: '44%', left: '76%' },
      doorWing: { top: '44%', left: '64%' },
      hingeSvg: { cx: 512, cy: 220 },
      arcPath: 'M 512 220 A 130 130 0 0 1 615 310',
      obstacle: { top: '54%', left: '83%' },
    },
    bmw: {
      id: 'bmw',
      name: 'BMW 4-Series Coupe',
      badge: 'Unsplash: Alex Suprun',
      image: '/images/flagship/power-door-bmw.jpg',
      handle: { top: '58%', left: '42%' },
      kick: { bottom: '18%', left: '45%' },
      radar: { top: '54%', left: '50%' },
      doorWing: { top: '50%', left: '42%' },
      hingeSvg: { cx: 480, cy: 260 },
      arcPath: 'M 480 260 A 140 140 0 0 1 370 360',
      obstacle: { top: '62%', left: '32%' },
    },
  };

  const currentVehicle = vehicleOptions[selectedVehicle] || vehicleOptions.audi;

  // Core door swing trigger
  const triggerDoorSwing = (method) => {
    if (doorState === 'SWINGING_OPEN' || doorState === 'SWINGING_CLOSE' || doorState === 'CINCHING') {
      return; // Actuator busy
    }

    setLastTriggerMethod(method);
    setObstacleHalted(false);

    if (doorState === 'CLOSED') {
      // OPEN SEQUENCE
      setDoorState('UNLATCHING');
      setHandleExtended(true);

      setTimeout(() => {
        setDoorState('SWINGING_OPEN');

        // Check if obstacle simulation is armed
        if (obstacleSimActive) {
          // Swing partially then halt on radar detection
          setTimeout(() => {
            setDoorAngle(34);
            setDoorState('OBSTACLE_HALTED');
            setObstacleHalted(true);
          }, 700);
        } else {
          // Full VIP smooth swing
          setDoorAngle(72);
          setTimeout(() => {
            setDoorState('OPEN');
            setCycleCount((c) => c + 1);
          }, 1400);
        }
      }, 450);
    } else if (doorState === 'OPEN' || doorState === 'OBSTACLE_HALTED') {
      // CLOSE SEQUENCE
      setDoorState('SWINGING_CLOSE');
      setDoorAngle(6); // Swing to soft-catch position

      setTimeout(() => {
        setDoorState('CINCHING');
        setSoftCloseActive(true);
        setDoorAngle(0);

        // 2-stage electric soft cinch latch draw
        setTimeout(() => {
          setDoorState('CLOSED');
          setSoftCloseActive(false);
          setHandleExtended(false);
        }, 900);
      }, 1300);
    }
  };

  // Resume after clearing obstacle
  const clearObstacleAndResume = () => {
    setObstacleSimActive(false);
    setObstacleHalted(false);
    setDoorState('SWINGING_OPEN');
    setDoorAngle(72);
    setTimeout(() => {
      setDoorState('OPEN');
      setCycleCount((c) => c + 1);
    }, 900);
  };

  // Direct soft-close demo trigger
  const triggerSoftCloseDemo = () => {
    if (doorState !== 'CLOSED') {
      triggerDoorSwing('Soft-Close Command');
      return;
    }
    // Briefly pop door to 8 degrees and soft-cinch it
    setDoorAngle(8);
    setDoorState('SWINGING_CLOSE');
    setTimeout(() => {
      setDoorState('CINCHING');
      setSoftCloseActive(true);
      setDoorAngle(0);
      setTimeout(() => {
        setDoorState('CLOSED');
        setSoftCloseActive(false);
      }, 900);
    }, 600);
  };

  // Touch gesture simulation (drag / mouseover across bar)
  const handleGestureSwipe = () => {
    setGestureSwiping(true);
    setTimeout(() => {
      setGestureSwiping(false);
      triggerDoorSwing('77GHz mmWave Hand Swipe');
    }, 450);
  };

  return (
    <Card className="p-6 sm:p-8 relative overflow-hidden bg-card border-border/80 shadow-2xl mb-16">
      {/* Dynamic ambient backlight */}
      <div
        className={`absolute -top-36 -right-36 w-[500px] h-[500px] rounded-full blur-[110px] pointer-events-none transition-all duration-700 ${
          activeTab === 'glass' ? 'bg-sky-500/12' : 'bg-cyan-500/12'
        }`}
      />

      {/* ===================================================================== */}
      {/* WORKBENCH HEADER & SYSTEM TABS                                        */}
      {/* ===================================================================== */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/80 pb-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-sky-600 dark:text-sky-400 text-xs font-bold tracking-widest uppercase mb-1">
            <Activity size={14} className="animate-pulse" /> Live Hardware Demonstration
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-foreground font-heading tracking-tight">
            Flagship Systems Interactive Workbench
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Test live physics simulations, optical electrochromic tint curves, and CAN-FD sensor triggers.
          </p>
        </div>

        {/* Tab Switcher */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
          <TabsList className="h-12 p-1 bg-muted/60 rounded-xl border border-border/70">
            <TabsTrigger value="glass" className="gap-2 text-xs font-bold px-4 py-2 rounded-lg cursor-pointer">
              <Sun size={15} /> Smart Dimming Glass
            </TabsTrigger>
            <TabsTrigger value="door" className="gap-2 text-xs font-bold px-4 py-2 rounded-lg cursor-pointer">
              <Hand size={15} /> Gesture Power Doors
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* ===================================================================== */}
      {/* MODULE 1: SMART DIMMING GLASS INTERACTIVE SIMULATION                  */}
      {/* ===================================================================== */}
      {activeTab === 'glass' && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          {/* Visual Interactive Viewport (Col 1-7) */}
          <div className="xl:col-span-7 flex flex-col gap-4">
            <div className="relative rounded-2xl overflow-hidden border-2 border-border/80 shadow-2xl bg-black min-h-[380px] sm:min-h-[440px] flex items-center justify-center">
              {/* Photorealistic Luxury Cabin Background Image */}
              <img
                src="/images/flagship/smart-glass-cabin.jpg"
                alt="Luxury Vehicle Interior Looking Out Passenger Window"
                className={`w-full h-full object-cover transition-all duration-700 ${
                  environment === 'night' 
                    ? 'brightness-60 contrast-125 saturate-70' 
                    : environment === 'sunset' 
                    ? 'sepia-25 saturate-120' 
                    : 'brightness-100'
                }`}
              />

              {/* Outside Direct Sun Flare (Intense when untinted) */}
              <div
                className="absolute top-4 left-1/4 w-48 h-48 rounded-full bg-amber-100/40 blur-3xl pointer-events-none transition-opacity duration-500"
                style={{
                  opacity: environment === 'night' ? 0 : Math.max(0, (100 - activeEffectiveTint) / 100),
                }}
              />

              {/* Electrochromic Window Film Area Overlay */}
              {/* Positioned over the side passenger window aperture */}
              <div 
                className="absolute inset-0 pointer-events-none transition-all duration-500"
                style={{
                  // Gradient mask framing the window opening
                  clipPath: 'polygon(7% 6%, 74% 6%, 70% 64%, 8% 64%)',
                }}
              >
                {dimmingMode === 'full' ? (
                  // FULL MONOLITHIC DIMMING LAYER
                  <div
                    className="w-full h-full transition-all duration-400 relative"
                    style={{
                      backgroundColor: `rgba(${currentHue.bgRgb}, ${0.08 + (tintLevel / 100) * 0.88})`,
                      backdropFilter: tintLevel > 80 ? `blur(${Math.round((tintLevel - 80) * 0.35)}px)` : 'none',
                    }}
                  >
                    {/* Liquid Crystal / SPD Alignment Micro-Grid Texture */}
                    <div
                      className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:100%_4px] transition-opacity duration-300 pointer-events-none"
                      style={{ opacity: tintLevel / 100 }}
                    />
                  </div>
                ) : (
                  // SEGMENTED 3-ZONE INDEPENDENT MATRIX
                  <div className="w-full h-full flex flex-col pointer-events-auto">
                    {/* Zone 1: Upper Sun-Visor Strip */}
                    <button
                      onClick={() => toggleSegment('top')}
                      className="flex-1 border-b border-white/20 transition-all duration-400 relative group flex items-center justify-between px-4"
                      style={{
                        backgroundColor: `rgba(${currentHue.bgRgb}, ${0.08 + (segments.top / 100) * 0.88})`,
                      }}
                      title="Click to toggle Zone 1 (Upper Sunshade)"
                    >
                      <span className="text-[10px] font-bold text-white/80 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        Zone 1 (Sunshade): {segments.top}%
                      </span>
                    </button>

                    {/* Zone 2: Mid Passenger Horizon Strip */}
                    <button
                      onClick={() => toggleSegment('mid')}
                      className="flex-[1.5] border-b border-white/20 transition-all duration-400 relative group flex items-center justify-between px-4"
                      style={{
                        backgroundColor: `rgba(${currentHue.bgRgb}, ${0.08 + (segments.mid / 100) * 0.88})`,
                      }}
                      title="Click to toggle Zone 2 (Eye-Level Panorama)"
                    >
                      <span className="text-[10px] font-bold text-white/80 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        Zone 2 (Horizon): {segments.mid}%
                      </span>
                    </button>

                    {/* Zone 3: Lower Body Privacy Strip */}
                    <button
                      onClick={() => toggleSegment('low')}
                      className="flex-1 transition-all duration-400 relative group flex items-center justify-between px-4"
                      style={{
                        backgroundColor: `rgba(${currentHue.bgRgb}, ${0.08 + (segments.low / 100) * 0.88})`,
                      }}
                      title="Click to toggle Zone 3 (Lower Privacy)"
                    >
                      <span className="text-[10px] font-bold text-white/80 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        Zone 3 (Privacy): {segments.low}%
                      </span>
                    </button>
                  </div>
                )}
              </div>

              {/* Window Frame Inner Shadow Accent */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  clipPath: 'polygon(7% 6%, 74% 6%, 70% 64%, 8% 64%)',
                  boxShadow: 'inset 0 0 25px rgba(0,0,0,0.7)',
                }}
              />

              {/* Status HUD Overlays */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
                <Badge variant="outline" className="gap-2 bg-black/75 backdrop-blur-md border-white/20 text-white font-mono text-xs shadow-lg">
                  <div 
                    className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor]"
                    style={{ backgroundColor: currentHue.accent }}
                  />
                  <span>
                    {dimmingMode === 'full' 
                      ? `${activeEffectiveTint}% Optical Shading` 
                      : `Multi-Zone Matrix (${segments.top}% / ${segments.mid}% / ${segments.low}%)`}
                  </span>
                </Badge>

                {isTransitioning && (
                  <Badge variant="outline" className="gap-1.5 bg-sky-500/20 text-sky-300 border-sky-400/40 text-[11px] animate-pulse">
                    <Sparkles size={12} /> Modulating 48V AC PWM Frequency...
                  </Badge>
                )}
              </div>

              {/* Bottom Thermal & Solar Telemetry HUD */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
                <div className="flex gap-2">
                  <Badge variant="outline" className="bg-black/80 backdrop-blur-md border-white/20 text-white text-[11px]">
                    Exterior: <b className="text-amber-400 ml-1">42.5°C</b> (Direct Solar)
                  </Badge>
                  <Badge variant="outline" className="bg-black/80 backdrop-blur-md border-white/20 text-white text-[11px]">
                    Cabin Interior: <b className={`ml-1 ${cabinTemp > 30 ? 'text-rose-400' : 'text-sky-400'}`}>{cabinTemp}°C</b>
                  </Badge>
                </div>

                <Badge variant="outline" className="bg-black/80 backdrop-blur-md border-white/20 text-white text-[11px]">
                  UV Block: <b className="text-emerald-400 ml-1">99.9%</b>
                </Badge>
              </div>
            </div>

            {/* Viewport Sub-Controls: Lighting & Color Hue */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-muted/40 rounded-xl border border-border/70">
              {/* Ambient Environment Switcher */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-muted-foreground uppercase">Outside Sun:</span>
                <div className="inline-flex rounded-lg bg-background p-0.5 border border-border">
                  <button
                    onClick={() => setEnvironment('sun')}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1 transition-colors ${
                      environment === 'sun' ? 'bg-sky-500/15 text-sky-600 dark:text-sky-400' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Sun size={13} /> Noon Sun
                  </button>
                  <button
                    onClick={() => setEnvironment('sunset')}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1 transition-colors ${
                      environment === 'sunset' ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Sparkles size={13} /> Golden Sunset
                  </button>
                  <button
                    onClick={() => setEnvironment('night')}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1 transition-colors ${
                      environment === 'night' ? 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Moon size={13} /> Night
                  </button>
                </div>
              </div>

              {/* Tint Film Hue Switcher */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-muted-foreground uppercase">Glass Film:</span>
                <div className="flex gap-1.5">
                  {Object.entries(filmHues).map(([key, hue]) => (
                    <button
                      key={key}
                      onClick={() => setFilmHue(key)}
                      className={`w-6 h-6 rounded-full border-2 transition-transform ${
                        filmHue === key ? 'scale-110 border-white ring-2 ring-primary' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: hue.accent }}
                      title={hue.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Control Panel & Real-Time Sensors (Col 8-12) */}
          <div className="xl:col-span-5 flex flex-col gap-5">
            {/* Mode Switcher: Full Window vs. 3-Zone Segmented */}
            <div className="flex items-center justify-between p-3.5 bg-muted/40 rounded-xl border border-border/70">
              <div>
                <div className="text-xs font-bold text-foreground">Glass Architecture</div>
                <div className="text-[11px] text-muted-foreground">
                  {dimmingMode === 'full' ? 'Continuous Linear PWM' : 'Porsche/Maybach 3-Zone Matrix'}
                </div>
              </div>

              <div className="inline-flex rounded-lg bg-background p-0.5 border border-border">
                <button
                  onClick={() => setDimmingMode('full')}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors ${
                    dimmingMode === 'full' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Full Window
                </button>
                <button
                  onClick={() => setDimmingMode('segmented')}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors ${
                    dimmingMode === 'segmented' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  3-Zone Matrix
                </button>
              </div>
            </div>

            {/* Controls Based on Active Mode */}
            {dimmingMode === 'full' ? (
              <div className="space-y-4 p-4 rounded-xl bg-muted/30 border border-border/60">
                {/* 4 Instant Quick Presets */}
                <div>
                  <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">
                    1. Instant Shading Profiles
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { level: 0, label: 'Clear', icon: Sun },
                      { level: 35, label: '35% Mild', icon: Droplets },
                      { level: 65, label: '65% Chauffeur', icon: Shield },
                      { level: 100, label: '100% Privacy', icon: Lock },
                    ].map((pr) => (
                      <Button
                        key={pr.level}
                        variant={tintLevel === pr.level ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => applyTintPreset(pr.level)}
                        className={`h-12 flex-col gap-0.5 rounded-xl font-bold text-xs ${
                          tintLevel === pr.level ? 'bg-sky-600 hover:bg-sky-500 text-white' : ''
                        }`}
                      >
                        <pr.icon size={14} />
                        <span>{pr.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Fine Linear Slider */}
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-foreground">
                      2. Fine Linear PWM Dimming:
                    </span>
                    <span className="text-sm font-bold text-sky-600 dark:text-sky-400 font-mono">
                      {tintLevel}%
                    </span>
                  </div>
                  <Slider
                    value={[tintLevel]}
                    max={100}
                    step={1}
                    onValueChange={(val) => setTintLevel(val[0])}
                    className="py-2 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>0% (Full Transparency)</span>
                    <span>50% (Ambient Shade)</span>
                    <span>100% (High Privacy)</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3 p-4 rounded-xl bg-muted/30 border border-border/60">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                    Interactive Multi-Zone Sliders:
                  </span>
                  <span className="text-[10px] text-muted-foreground">Click zones on glass or drag below</span>
                </div>

                {[
                  { id: 'top', label: 'Zone 1: Upper Sunshade Strip', val: segments.top },
                  { id: 'mid', label: 'Zone 2: Mid Eye-Level Panorama', val: segments.mid },
                  { id: 'low', label: 'Zone 3: Lower Body Privacy Strip', val: segments.low },
                ].map((z) => (
                  <div key={z.id} className="space-y-1.5 p-2.5 bg-background rounded-lg border border-border">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>{z.label}</span>
                      <span className="font-mono text-sky-600 dark:text-sky-400 font-bold">{z.val}%</span>
                    </div>
                    <Slider
                      value={[z.val]}
                      max={100}
                      step={1}
                      onValueChange={(v) => setSegments((prev) => ({ ...prev, [z.id]: v[0] }))}
                      className="py-1 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Live Physical Telemetry Sensors */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-card border border-border/70 shadow-sm">
                <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1">
                  VLT Transmittance
                </div>
                <div className="text-2xl font-black text-foreground font-mono">
                  {vlt}%
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">
                  Visible Light Spectrum
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-card border border-border/70 shadow-sm">
                <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1">
                  Solar Rejection (TSER)
                </div>
                <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                  {tser}%
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">
                  ASTM E424 Standard
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-card border border-border/70 shadow-sm">
                <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1">
                  Glare Index
                </div>
                <div className="text-lg font-bold text-foreground font-heading">
                  {solarLux < 150 ? 'Optimal Comfort' : solarLux < 500 ? 'Comfortable' : 'Extreme Glare'}
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">
                  {solarLux} Lux Luxmeter
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-card border border-border/70 shadow-sm">
                <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1">
                  Switching Latency
                </div>
                <div className="text-lg font-bold text-sky-600 dark:text-sky-400 font-heading">
                  &lt; 1.8s Response
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">
                  Microsecond PWM Driver
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODULE 2: GESTURE & TOUCH POWER DOORS INTERACTIVE SIMULATION          */}
      {/* ===================================================================== */}
      {activeTab === 'door' && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          {/* Visual Interactive Viewport (Col 1-7) */}
          <div className="xl:col-span-7 flex flex-col gap-4">
            <div className="relative rounded-2xl overflow-hidden border-2 border-border/80 shadow-2xl bg-[#02050c] min-h-[380px] sm:min-h-[440px] flex items-center justify-center">
              {/* Studio Real Vehicle Photography from Unsplash.com */}
              <img
                src={currentVehicle.image}
                alt={`${currentVehicle.name} - Real Vehicle Photo from Unsplash.com`}
                className="w-full h-full object-cover brightness-95 transition-all duration-500"
              />

              {/* Real Vehicle Selector & Unsplash Attribution (Top Right) */}
              <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-1.5">
                <div className="flex items-center gap-1 bg-black/85 backdrop-blur-md p-1 rounded-xl border border-white/20 shadow-lg">
                  {Object.values(vehicleOptions).map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVehicle(v.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        selectedVehicle === v.id
                          ? 'bg-sky-500 text-white shadow-md'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {v.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
                <Badge variant="outline" className="bg-black/80 backdrop-blur-md border-white/20 text-[10px] text-white/80 font-mono">
                  📷 {currentVehicle.badge}
                </Badge>
              </div>

              {/* Holographic Radar Detection Field Sweep */}
              <div 
                className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
                  gestureSwiping || doorState.includes('SWINGING') ? 'opacity-100' : 'opacity-20'
                }`}
              >
                {/* Concentric radar rings from B-pillar */}
                <div 
                  className="absolute -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-sky-400/40 animate-ping opacity-30 pointer-events-none" 
                  style={{ top: currentVehicle.radar.top, left: currentVehicle.radar.left }}
                />
                <div 
                  className="absolute -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-cyan-400/50 pointer-events-none" 
                  style={{ top: currentVehicle.radar.top, left: currentVehicle.radar.left }}
                />
              </div>

              {/* Physical Door Swing Kinematic Visualization Overlay */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Physical Door Arc Path Indicator */}
                <svg className="w-full h-full" viewBox="0 0 800 450">
                  <path
                    d={currentVehicle.arcPath}
                    fill="none"
                    stroke="rgba(56, 189, 248, 0.35)"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                  {/* Current Door Angle Vector */}
                  <line
                    x1={currentVehicle.hingeSvg.cx}
                    y1={currentVehicle.hingeSvg.cy}
                    x2={currentVehicle.hingeSvg.cx + Math.cos((doorAngle * Math.PI) / 180 + 0.45) * 135}
                    y2={currentVehicle.hingeSvg.cy + Math.sin((doorAngle * Math.PI) / 180 + 0.45) * 135}
                    stroke={obstacleHalted ? '#EF4444' : '#38BDF8'}
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  {/* Hinge Pivot Point */}
                  <circle cx={currentVehicle.hingeSvg.cx} cy={currentVehicle.hingeSvg.cy} r="6" fill="#38BDF8" className="shadow-[0_0_10px_#38BDF8]" />
                </svg>

                {/* Animated Passenger Door Wing Projection */}
                <div
                  className="absolute w-36 sm:w-44 h-24 rounded-lg bg-gradient-to-r from-slate-300/30 via-slate-100/40 to-white/60 border border-white/60 backdrop-blur-sm shadow-2xl origin-left transition-transform duration-700 ease-out flex items-center justify-end pr-3"
                  style={{
                    top: currentVehicle.doorWing.top,
                    left: currentVehicle.doorWing.left,
                    transform: `perspective(600px) rotateY(${-doorAngle * 0.9}deg)`,
                  }}
                >
                  <div className="text-[10px] font-bold text-sky-200 bg-black/60 px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                    {doorAngle}°
                  </div>
                </div>
              </div>

              {/* INTERACTIVE HOT-ZONES ON THE CAR */}

              {/* 1. Flush Handle Hot-Zone */}
              <button
                onClick={() => triggerDoorSwing('Flush Capacitive Handle')}
                className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-all duration-300 ${
                  handleExtended ? 'scale-110' : 'scale-100'
                }`}
                style={{
                  top: currentVehicle.handle.top,
                  left: currentVehicle.handle.left,
                }}
                title="Click to trigger Electronic Flush Handle"
              >
                <div className={`px-3 py-1.5 rounded-full border flex items-center gap-1.5 shadow-lg backdrop-blur-md transition-all ${
                  handleExtended 
                    ? 'bg-sky-500 text-white border-sky-300 ring-4 ring-sky-400/40' 
                    : 'bg-black/80 text-white border-white/40 hover:border-sky-400 hover:bg-black/90'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${handleExtended ? 'bg-white animate-ping' : 'bg-sky-400'}`} />
                  <span className="text-[10px] font-extrabold uppercase tracking-wider">
                    {handleExtended ? 'Handle Popped' : 'Flush Handle'}
                  </span>
                </div>
              </button>

              {/* 2. Interactive Ground Foot-Kick Sensor Zone */}
              <button
                onClick={() => triggerDoorSwing('Hands-Free Foot Kick Sensor')}
                className="absolute -translate-x-1/2 group cursor-pointer"
                style={{
                  bottom: currentVehicle.kick.bottom,
                  left: currentVehicle.kick.left,
                }}
                title="Click to simulate Foot Kick Gesture under rocker panel"
              >
                <div className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-amber-400/50 hover:border-amber-400 hover:bg-amber-500/20 text-amber-300 flex items-center gap-1.5 text-[10px] font-bold transition-all shadow-md">
                  <Hand size={11} className="rotate-90" />
                  <span>Foot Kick Zone (Luggage Entry)</span>
                </div>
              </button>

              {/* 3. Obstacle Visual Marker (When Simulated) */}
              {obstacleSimActive && (
                <div 
                  className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                    obstacleHalted ? 'scale-125 animate-bounce' : 'scale-100'
                  }`}
                  style={{
                    top: currentVehicle.obstacle.top,
                    left: currentVehicle.obstacle.left,
                  }}
                >
                  <div className={`p-2.5 rounded-2xl border-2 flex flex-col items-center gap-1 shadow-2xl backdrop-blur-md ${
                    obstacleHalted 
                      ? 'bg-red-600/90 border-red-300 text-white ring-4 ring-red-500/50' 
                      : 'bg-amber-500/85 border-amber-300 text-white'
                  }`}>
                    <AlertOctagon size={20} />
                    <span className="text-[9px] font-black uppercase tracking-wider">
                      {obstacleHalted ? 'OBSTACLE DETECTED' : 'OBSTACLE IN PATH'}
                    </span>
                  </div>
                </div>
              )}

              {/* Top HUD: Real-time Kinematic Telemetry */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 pointer-events-none">
                <Badge variant="outline" className="gap-2 bg-black/80 backdrop-blur-md border-white/20 text-white font-mono text-xs">
                  <Gauge size={13} className="text-sky-400" />
                  <span>Door Angle: <b className="text-white">{doorAngle}°</b> / 72°</span>
                </Badge>
                <Badge variant="outline" className="gap-2 bg-black/80 backdrop-blur-md border-white/20 text-white text-[11px]">
                  <Activity size={13} className="text-emerald-400" />
                  <span>Actuator: <b className="text-emerald-400">
                    {doorState === 'SWINGING_OPEN' ? 'Opening (24V / 22Nm)' : doorState === 'SWINGING_CLOSE' ? 'Closing (14Nm)' : doorState === 'CINCHING' ? 'Soft-Close Latch Active' : 'Standby (0Nm)'}
                  </b></span>
                </Badge>
              </div>

              {/* Bottom HUD: Status Alert Pill */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2 pointer-events-none">
                <Badge variant="outline" className={`gap-2 py-1.5 px-3.5 backdrop-blur-md text-xs font-bold border ${
                  obstacleHalted 
                    ? 'bg-red-950/90 border-red-500 text-red-200 animate-pulse' 
                    : doorState === 'CLOSED' 
                    ? 'bg-black/85 border-sky-500/40 text-sky-200' 
                    : 'bg-black/85 border-emerald-500/40 text-emerald-200'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    obstacleHalted ? 'bg-red-500 shadow-[0_0_8px_#EF4444]' : doorState === 'CLOSED' ? 'bg-sky-400' : 'bg-emerald-400'
                  }`} />
                  <span>
                    {obstacleHalted 
                      ? 'ASIL-B SAFETY HALT: Obstacle detected at 38cm (0ms Latency)' 
                      : `Kinematic State: ${doorState.replace('_', ' ')}`}
                  </span>
                </Badge>

                {doorState === 'CLOSED' && (
                  <Badge variant="outline" className="bg-black/80 backdrop-blur-md border-white/20 text-white text-[11px]">
                    Latching: <b className="text-emerald-400 ml-1">Hermetic 0mm Lock</b>
                  </Badge>
                )}
              </div>
            </div>

            {/* Interactive Sweep Sensor Bar (Hover/Drag over to simulate gesture) */}
            <div 
              onMouseEnter={handleGestureSwipe}
              className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                gestureSwiping 
                  ? 'bg-sky-500/25 border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.4)]' 
                  : 'bg-muted/40 border-border/70 hover:border-sky-400/60 hover:bg-muted/60'
              }`}
              title="Move cursor over this bar to trigger hands-free swipe gesture"
            >
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                  gestureSwiping ? 'bg-sky-500 text-white' : 'bg-sky-500/10 text-sky-600 dark:text-sky-400'
                }`}>
                  <Radio size={16} className={gestureSwiping ? 'animate-spin' : ''} />
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground">
                    Hands-Free Gesture Sensor Sweep Bar
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    Hover or swipe mouse across here to trigger mmWave radar gesture
                  </div>
                </div>
              </div>

              <Badge variant="cyan" className="text-[10px] font-bold">
                {gestureSwiping ? 'Scanning...' : 'Swipe Here'}
              </Badge>
            </div>
          </div>

          {/* Controls, Triggers & ASIL-B Safety Playground (Col 8-12) */}
          <div className="xl:col-span-5 flex flex-col gap-5">
            {/* Interactive Triggers Suite */}
            <div className="p-4 rounded-xl bg-muted/30 border border-border/60 space-y-3">
              <label className="block text-xs font-bold text-foreground uppercase tracking-wider">
                1. Test Physical & Electronic Triggers:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Trigger 1: Swipe Gesture */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => triggerDoorSwing('77GHz mmWave Hand Gesture')}
                  disabled={doorState.includes('SWINGING') || doorState === 'CINCHING'}
                  className="h-12 px-3 justify-start gap-2.5 rounded-xl text-xs font-bold border-border/80 hover:border-sky-400"
                >
                  <Radio size={15} className="text-sky-500 shrink-0" />
                  <div className="text-left">
                    <div>Hand Gesture</div>
                    <div className="text-[10px] text-muted-foreground font-normal">77GHz mmWave</div>
                  </div>
                </Button>

                {/* Trigger 2: Flush Electronic Handle */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => triggerDoorSwing('Flush Capacitive Handle')}
                  disabled={doorState.includes('SWINGING') || doorState === 'CINCHING'}
                  className="h-12 px-3 justify-start gap-2.5 rounded-xl text-xs font-bold border-border/80 hover:border-sky-400"
                >
                  <Hand size={15} className="text-red-500 shrink-0" />
                  <div className="text-left">
                    <div>Flush Handle</div>
                    <div className="text-[10px] text-muted-foreground font-normal">Micro-Haptic Sensor</div>
                  </div>
                </Button>

                {/* Trigger 3: Soft-Close Cinch Test */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={triggerSoftCloseDemo}
                  disabled={doorState.includes('SWINGING') || doorState === 'CINCHING'}
                  className="h-12 px-3 justify-start gap-2.5 rounded-xl text-xs font-bold border-border/80 hover:border-emerald-400"
                >
                  <Zap size={15} className="text-emerald-500 shrink-0" />
                  <div className="text-left">
                    <div>Test Soft-Close</div>
                    <div className="text-[10px] text-muted-foreground font-normal">Motorized Cinch</div>
                  </div>
                </Button>

                {/* Trigger 4: Foot Kick Sensor */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => triggerDoorSwing('Hands-Free Foot Kick Sensor')}
                  disabled={doorState.includes('SWINGING') || doorState === 'CINCHING'}
                  className="h-12 px-3 justify-start gap-2.5 rounded-xl text-xs font-bold border-border/80 hover:border-amber-400"
                >
                  <Hand size={15} className="text-amber-500 rotate-90 shrink-0" />
                  <div className="text-left">
                    <div>Foot Kick Sensor</div>
                    <div className="text-[10px] text-muted-foreground font-normal">Hands-Free Entry</div>
                  </div>
                </Button>
              </div>
            </div>

            {/* ASIL-B Obstacle Collision Avoidance Playground */}
            <div className={`p-4 rounded-xl border transition-all ${
              obstacleHalted 
                ? 'bg-red-500/10 border-red-500/50 ring-2 ring-red-500/20' 
                : 'bg-muted/30 border-border/60'
            }`}>
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className={obstacleHalted ? 'text-red-500' : 'text-emerald-500'} />
                  <span className="text-xs font-bold text-foreground">
                    ASIL-B Obstacle Avoidance Simulation
                  </span>
                </div>

                <Badge variant={obstacleSimActive ? 'destructive' : 'outline'} className="text-[10px] font-bold">
                  {obstacleSimActive ? 'Obstacle Armed' : 'Path Clear'}
                </Badge>
              </div>

              <p className="text-[11px] text-muted-foreground leading-relaxed mb-3">
                Toggle a simulated pedestrian or garage pillar in the door's 72° swing arc to verify the ultrasonic & mmWave emergency halt safety system.
              </p>

              <div className="flex gap-2">
                <Button
                  variant={obstacleSimActive ? 'destructive' : 'outline'}
                  size="sm"
                  onClick={() => setObstacleSimActive(!obstacleSimActive)}
                  className="flex-1 rounded-xl text-xs font-bold h-9"
                >
                  {obstacleSimActive ? 'Remove Obstacle' : 'Place Obstacle in Path'}
                </Button>

                {obstacleHalted && (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={clearObstacleAndResume}
                    className="flex-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold h-9"
                  >
                    Clear & Resume Swing
                  </Button>
                )}
              </div>
            </div>

            {/* Live CAN-FD Microcontroller Telemetry Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-card border border-border/70 shadow-sm">
                <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1">
                  BLDC Peak Torque
                </div>
                <div className="text-2xl font-black text-foreground font-mono">
                  {doorState.includes('SWINGING') ? '22.4 Nm' : doorState === 'CINCHING' ? '28.0 Nm' : '0.0 Nm'}
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">
                  Planetary 3-Stage Drive
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-card border border-border/70 shadow-sm">
                <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1">
                  Obstacle Reaction
                </div>
                <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                  &lt; 15 ms
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">
                  Current Ripple Frequency
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-card border border-border/70 shadow-sm">
                <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1">
                  Soft Cinch Latch
                </div>
                <div className="text-lg font-bold text-foreground font-heading">
                  {softCloseActive ? 'Engaged (Active)' : 'Hermetic Seal'}
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">
                  Dual-Stage Motor Lock
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-card border border-border/70 shadow-sm">
                <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1">
                  Durability Test
                </div>
                <div className="text-lg font-bold text-sky-600 dark:text-sky-400 font-heading font-mono">
                  {cycleCount.toLocaleString()} Cycles
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">
                  100,000 Rated Lifetime
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
