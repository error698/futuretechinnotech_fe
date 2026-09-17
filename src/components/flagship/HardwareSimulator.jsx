import React, { useState } from 'react';
import { 
  Eye, 
  ShieldCheck, 
  Sun, 
  Zap, 
  Hand, 
  Activity, 
  Lock,
  Radio,
  Gauge,
  CheckCircle2
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const HardwareSimulator = ({ onRequestQuote }) => {
  const [activeTab, setActiveTab] = useState('glass'); // 'glass' | 'door'

  // --- SMART GLASS STATE ---
  const [tintLevel, setTintLevel] = useState(50); // 0 (Clear) to 100 (Opaque)
  const [glassPreset, setGlassPreset] = useState('shade'); // 'clear' | 'shade' | 'opaque'
  const [isTransitioning, setIsTransitioning] = useState(false);

  // --- POWER DOOR STATE ---
  const [doorState, setDoorState] = useState('CLOSED');
  const [doorAngle, setDoorAngle] = useState(0); // 0 deg to 72 deg
  const [lastTrigger, setLastTrigger] = useState(null);
  const [cycleCount, setCycleCount] = useState(14820);

  // Handle glass presets
  const handlePresetSelect = (preset, level) => {
    setGlassPreset(preset);
    setIsTransitioning(true);
    setTintLevel(level);
    setTimeout(() => setIsTransitioning(false), 900);
  };

  // Dynamic Glass Metrics Calculation
  const vlt = Math.round(74 - (tintLevel * 0.728)); // 74% down to 1.2%
  const tser = Math.round(42 + (tintLevel * 0.42)); // 42% up to 84%
  const uvBlock = (99.8 + (tintLevel * 0.0019)).toFixed(2);

  // Door Animation Sequence
  const triggerDoor = (triggerType) => {
    if (doorState !== 'CLOSED' && doorState !== 'OPEN') return; // busy
    setLastTrigger(triggerType);

    if (doorState === 'CLOSED') {
      // Open sequence
      setDoorState('LATCH_RELEASE');
      setTimeout(() => {
        setDoorState('SWINGING_OPEN');
        setDoorAngle(72);
        setTimeout(() => {
          setDoorState('OPEN');
          setCycleCount((prev) => prev + 1);
        }, 1400);
      }, 500);
    } else {
      // Close sequence
      setDoorState('SWINGING_CLOSE');
      setDoorAngle(8);
      setTimeout(() => {
        setDoorState('SOFT_CINCH');
        setDoorAngle(0);
        setTimeout(() => {
          setDoorState('CLOSED');
        }, 800);
      }, 1400);
    }
  };

  return (
    <Card className="p-6 sm:p-8 relative overflow-hidden bg-card border-border/80 shadow-xl mb-16">
      {/* Background ambient lighting */}
      <div
        className={`absolute -top-28 -right-28 w-96 h-96 rounded-full blur-[90px] pointer-events-none transition-all duration-700 ${
          activeTab === 'glass' ? 'bg-sky-500/15' : 'bg-red-500/15'
        }`}
      />

      {/* System Toggle Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/80 pb-6 mb-7">
        <div>
          <div className="inline-flex items-center gap-2 text-sky-600 dark:text-sky-400 text-xs font-bold tracking-widest uppercase mb-1">
            <Activity size={14} /> Interactive Hardware Workbench
          </div>
          <h3 className="text-2xl font-extrabold text-foreground font-heading tracking-tight">
            Executive Hardware Simulator
          </h3>
        </div>

        {/* Tab Switcher */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
          <TabsList className="h-11 p-1 bg-muted/60">
            <TabsTrigger value="glass" className="gap-2 text-xs font-bold px-4 py-2">
              <Sun size={15} /> Smart Dimming Glass
            </TabsTrigger>
            <TabsTrigger value="door" className="gap-2 text-xs font-bold px-4 py-2">
              <Hand size={15} /> Gesture Power Doors
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* ======================================================== */}
      {/* MODULE 1: SMART DIMMING GLASS SIMULATOR                  */}
      {/* ======================================================== */}
      {activeTab === 'glass' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Visual Glass Viewport */}
          <div className="relative">
            <div className="relative h-[340px] rounded-2xl overflow-hidden border-2 border-border/70 shadow-2xl bg-[#040711]">
              {/* VIP Executive Limousine Interior (Behind Glass) */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,#1E293B_0%,#0F172A_70%,#020617_100%)] flex items-center justify-center overflow-hidden">
                {/* Starlight Roof */}
                <div className="absolute top-4 w-[90%] flex justify-around opacity-60">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="w-0.5 h-0.5 rounded-full bg-sky-100 shadow-[0_0_4px_#38BDF8]"
                    />
                  ))}
                </div>

                {/* Executive Seat Silhouette */}
                <div className="text-center translate-y-6">
                  <div className="w-44 h-36 mx-auto rounded-t-[30px] rounded-b-[10px] bg-gradient-to-b from-slate-700 to-slate-900 border border-white/10 shadow-2xl flex items-center justify-center">
                    <div className="w-20 h-12 rounded-2xl bg-slate-600 opacity-40" />
                  </div>
                  <div className="text-slate-400 text-[10px] mt-2 tracking-widest uppercase font-semibold">
                    VIP Executive Passenger Cell
                  </div>
                </div>
              </div>

              {/* Dynamic Electrochromic / SPD Film Overlay */}
              <div
                className="absolute inset-0 transition-all duration-400 pointer-events-none"
                style={{
                  backgroundColor: `rgba(6, 11, 25, ${0.1 + (tintLevel / 100) * 0.88})`,
                  backdropFilter: tintLevel > 80 ? `blur(${Math.round((tintLevel - 80) * 0.4)}px)` : 'none',
                }}
              >
                {/* Micro-louver optical grid effect when darkened */}
                <div
                  className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.03)_1px,transparent_1px)] bg-[length:100%_4px] transition-opacity duration-400"
                  style={{ opacity: tintLevel / 100 }}
                />
              </div>

              {/* Luxury Automotive Window Frame Accent */}
              <div className="absolute inset-0 border-[10px] border-t-[16px] border-slate-900 pointer-events-none shadow-[inset_0_0_15px_rgba(0,0,0,0.8)]" />

              {/* Live Opacity Badge */}
              <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 py-1.5 px-3.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-sky-500/30 text-sky-100 text-xs font-bold">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: tintLevel === 0 ? '#4ADE80' : tintLevel === 50 ? '#38BDF8' : '#A855F7',
                    boxShadow: '0 0 8px currentColor',
                  }}
                />
                State: {tintLevel === 0 ? '100% Clear' : tintLevel === 50 ? '50% Chauffeur Shade' : tintLevel === 100 ? '100% High-Privacy' : `${tintLevel}% Custom Tint`}
              </div>

              {/* Transition Active Pulse */}
              {isTransitioning && (
                <div className="absolute top-4 right-4 text-xs font-bold text-sky-400 py-1 px-2.5 rounded-md bg-sky-500/20 border border-sky-500/40 animate-pulse">
                  Switching SPD Matrix...
                </div>
              )}
            </div>
          </div>

          {/* Controls & Real-Time Telemetry */}
          <div className="flex flex-col gap-5">
            {/* 3-Step Preset Toggles */}
            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2.5">
                Quick Tint Profile Select:
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                <Button
                  variant={glassPreset === 'clear' && tintLevel === 0 ? 'default' : 'outline'}
                  onClick={() => handlePresetSelect('clear', 0)}
                  className={`h-auto py-3 px-2 flex-col gap-1 rounded-xl text-xs font-bold ${
                    glassPreset === 'clear' && tintLevel === 0
                      ? 'bg-sky-600 hover:bg-sky-500 text-white'
                      : ''
                  }`}
                >
                  <Eye size={16} />
                  <span>100% Clear</span>
                </Button>

                <Button
                  variant={glassPreset === 'shade' && tintLevel === 50 ? 'default' : 'outline'}
                  onClick={() => handlePresetSelect('shade', 50)}
                  className={`h-auto py-3 px-2 flex-col gap-1 rounded-xl text-xs font-bold ${
                    glassPreset === 'shade' && tintLevel === 50
                      ? 'bg-sky-600 hover:bg-sky-500 text-white'
                      : ''
                  }`}
                >
                  <Sun size={16} />
                  <span>50% Chauffeur</span>
                </Button>

                <Button
                  variant={glassPreset === 'opaque' && tintLevel === 100 ? 'default' : 'outline'}
                  onClick={() => handlePresetSelect('opaque', 100)}
                  className={`h-auto py-3 px-2 flex-col gap-1 rounded-xl text-xs font-bold ${
                    glassPreset === 'opaque' && tintLevel === 100
                      ? 'bg-violet-600 hover:bg-violet-500 text-white'
                      : ''
                  }`}
                >
                  <Lock size={16} />
                  <span>100% Opaque</span>
                </Button>
              </div>
            </div>

            {/* Granular Slider Control */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-muted-foreground">
                  Fine Linear PWM Dimming:
                </span>
                <span className="text-sm font-bold text-sky-600 dark:text-sky-400 font-mono">
                  {tintLevel}%
                </span>
              </div>
              <Slider
                value={[tintLevel]}
                max={100}
                step={1}
                onValueChange={(val) => {
                  setTintLevel(val[0]);
                  setGlassPreset('custom');
                }}
                className="py-2 cursor-pointer"
              />
            </div>

            {/* Dynamic Telemetry Metric Cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-muted/40 rounded-xl border border-border/70">
                <div className="text-[10px] text-muted-foreground uppercase font-semibold">
                  VLT Transmittance
                </div>
                <div className="text-xl font-extrabold text-foreground font-heading mt-0.5">
                  {vlt}%
                </div>
                <div className="text-[10px] text-sky-600 dark:text-sky-400 font-medium">Visible light</div>
              </div>

              <div className="p-3 bg-muted/40 rounded-xl border border-border/70">
                <div className="text-[10px] text-muted-foreground uppercase font-semibold">
                  UV Shielding
                </div>
                <div className="text-xl font-extrabold text-sky-600 dark:text-sky-400 font-heading mt-0.5">
                  {uvBlock}%
                </div>
                <div className="text-[10px] text-muted-foreground font-medium">ISO 9050</div>
              </div>

              <div className="p-3 bg-muted/40 rounded-xl border border-border/70">
                <div className="text-[10px] text-muted-foreground uppercase font-semibold">
                  Switch Latency
                </div>
                <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-heading mt-0.5">
                  &lt; 1.8s
                </div>
                <div className="text-[10px] text-muted-foreground font-medium">Microsecond PWM</div>
              </div>
            </div>

            {/* CTA */}
            <Button
              onClick={onRequestQuote}
              className="w-full rounded-xl bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 text-white font-bold h-11 gap-2"
            >
              <Zap size={16} /> Request Smart Glass Kit Specs
            </Button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODULE 2: GESTURE & TOUCH POWER DOORS SIMULATOR          */}
      {/* ======================================================== */}
      {activeTab === 'door' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Kinematic Door Viewport */}
          <div className="relative">
            <div className="relative h-[340px] rounded-2xl overflow-hidden border-2 border-border/70 shadow-2xl bg-[#070b14] flex items-center justify-center">
              {/* Automotive Vehicle Floor Top-Down Representation */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#111827_0%,#030712_100%)] flex items-center justify-center">
                {/* Vehicle B-Pillar */}
                <div className="absolute left-8 top-10 bottom-10 w-8 rounded-lg bg-slate-800 border border-slate-700 flex flex-col items-center justify-between py-3">
                  <span className="text-[7px] text-slate-400 -rotate-90 tracking-wider">B-PILLAR</span>
                  <div
                    className="w-4 h-8 rounded bg-red-600 shadow-[0_0_10px_rgba(244,44,55,0.6)]"
                    title="BLDC Motor Actuator"
                  />
                  <span className="text-[7px] text-slate-400 -rotate-90">CHASSIS</span>
                </div>

                {/* Hinge Point */}
                <div className="absolute top-12 left-14 w-3.5 h-3.5 rounded-full bg-slate-100 shadow-[0_0_10px_#38BDF8] z-10" />

                {/* Rotating Passenger Door Wing */}
                <div
                  className="absolute top-12 left-16 w-44 h-6 rounded-md bg-gradient-to-b from-slate-200 via-slate-400 to-slate-600 border border-white shadow-2xl origin-left transition-transform duration-1000 ease-out z-5"
                  style={{
                    transform: `rotate(${doorAngle}deg)`,
                  }}
                >
                  {/* Outer Flush Handle Indicator */}
                  <div
                    className={`absolute right-5 top-1 w-8 h-2 rounded ${
                      doorState === 'CLOSED' ? 'bg-sky-400 shadow-[0_0_8px_#38BDF8]' : 'bg-red-500 shadow-[0_0_8px_#EF4444]'
                    }`}
                  />
                  {/* Anti-pinch sensor edge */}
                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-amber-500" title="Anti-Pinch Edge" />
                </div>
              </div>

              {/* Status HUD */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                <Badge variant="outline" className="gap-1.5 bg-slate-950/80 backdrop-blur-md text-slate-300 font-mono text-[11px]">
                  <Gauge size={12} className="text-sky-400" />
                  <span>Angle: <b className="text-white">{doorAngle}°</b></span>
                </Badge>
                <Badge variant="outline" className="gap-1.5 bg-slate-950/80 backdrop-blur-md text-slate-300 text-[11px]">
                  <Activity size={12} className="text-emerald-400" />
                  <span>Motor: <b className="text-emerald-400">{doorState.includes('SWINGING') ? '24V Active (22Nm)' : 'Standby (0Nm)'}</b></span>
                </Badge>
              </div>

              {/* State Pill Bottom */}
              <div className="absolute bottom-4 left-4 z-10">
                <Badge variant="outline" className="gap-2 py-1 px-3 bg-slate-950/90 backdrop-blur-md border-red-500/40 text-white font-bold text-xs">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: doorState === 'CLOSED' ? '#38BDF8' : doorState === 'OPEN' ? '#4ADE80' : '#F59E0B',
                      boxShadow: '0 0 8px currentColor',
                    }}
                  />
                  <span>Kinematic State: {doorState.replace('_', ' ')}</span>
                </Badge>
              </div>
            </div>
          </div>

          {/* Door Controls & Interactive Triggers */}
          <div className="flex flex-col gap-5">
            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2.5">
                Test Physical & Gesture Triggers:
              </label>

              <div className="flex flex-col gap-2.5">
                <Button
                  variant="outline"
                  onClick={() => triggerDoor('Swipe Gesture Sensor (ToF)')}
                  disabled={doorState.includes('SWINGING')}
                  className="h-12 px-4 justify-between rounded-xl font-bold text-xs"
                >
                  <span className="flex items-center gap-2 text-foreground">
                    <Radio size={16} className="text-sky-600 dark:text-sky-400" />
                    <span>1. Swipe Gesture (ToF Laser + mmWave)</span>
                  </span>
                  <Badge variant="cyan" className="text-[10px]">
                    {doorState === 'CLOSED' ? 'Trigger Open' : 'Trigger Close'}
                  </Badge>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => triggerDoor('Flush Capacitive Handle')}
                  disabled={doorState.includes('SWINGING')}
                  className="h-12 px-4 justify-between rounded-xl font-bold text-xs"
                >
                  <span className="flex items-center gap-2 text-foreground">
                    <Hand size={16} className="text-red-500" />
                    <span>2. Capacitive Flush Handle (Micro-Haptic)</span>
                  </span>
                  <Badge variant="red" className="text-[10px]">
                    Tap Sensor
                  </Badge>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => triggerDoor('Executive Roof Switch')}
                  disabled={doorState.includes('SWINGING')}
                  className="h-12 px-4 justify-between rounded-xl font-bold text-xs"
                >
                  <span className="flex items-center gap-2 text-foreground">
                    <Zap size={16} className="text-violet-500" />
                    <span>3. Chauffeur Center Console / Roof Switch</span>
                  </span>
                  <Badge variant="secondary" className="text-[10px]">
                    LIN Bus Command
                  </Badge>
                </Button>
              </div>
            </div>

            {/* Floating Safety Status Badges */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="p-2.5 bg-muted/40 rounded-xl border border-border/70">
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                  <ShieldCheck size={12} /> Sensor Active
                </div>
                <div className="text-xs text-foreground font-semibold mt-1">Dual-Zone Radar</div>
              </div>

              <div className="p-2.5 bg-muted/40 rounded-xl border border-border/70">
                <div className="flex items-center gap-1.5 text-[10px] text-sky-600 dark:text-sky-400 font-bold">
                  <Activity size={12} /> Torque Monitored
                </div>
                <div className="text-xs text-foreground font-semibold mt-1">Current Ripple</div>
              </div>

              <div className="p-2.5 bg-muted/40 rounded-xl border border-border/70">
                <div className="flex items-center gap-1.5 text-[10px] text-amber-600 dark:text-amber-400 font-bold">
                  <CheckCircle2 size={12} /> Anti-Pinch
                </div>
                <div className="text-xs text-foreground font-semibold mt-1">ECE R21 Certified</div>
              </div>
            </div>

            {/* CTA */}
            <Button
              onClick={onRequestQuote}
              className="w-full rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold h-11 gap-2 shadow-lg shadow-red-500/20"
            >
              <Zap size={16} /> Request Power Door Kit Specs
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};
