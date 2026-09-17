import React, { useState } from 'react';
import { 
  Network, 
  ShieldAlert, 
  Lock, 
  AlertOctagon, 
  Zap, 
  CheckCircle2, 
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const SystemArchitectureDiagram = () => {
  const [selectedNode, setSelectedNode] = useState('dcu');

  const nodes = {
    sensors: {
      id: 'sensors',
      title: '1. Exterior Gesture & Sensor Array',
      badge: 'Input Subsystem',
      color: '#38BDF8',
      summary: 'Collects optical, radar, and capacitive hand interactions under all weather conditions.',
      details: [
        'Dual-zone 77GHz mmWave radar proximity sensing (penetrates rain, ice, and road grime).',
        'Optical Time-of-Flight (ToF) laser array for directional kick/swipe gesture decoding.',
        'Flush-mount capacitive touch strips with multi-stage wake-up logic (< 10µA sleep mode).'
      ]
    },
    dcu: {
      id: 'dcu',
      title: '2. Door Control Unit (DCU / Microcontroller)',
      badge: 'Core Processing Unit',
      color: '#F42C37',
      summary: 'Automotive 32-bit dual-core lockstep MCU executing motion profiles, anti-pinch algorithms, and bus telemetry.',
      details: [
        'ISO 26262 ASIL-B certified hardware architecture with real-time hardware diagnostics.',
        'High-speed current-ripple frequency decoding for millisecond-level anti-pinch obstacle detection.',
        'Controls both high-torque BLDC servo motors and secondary soft-close latch cinchers.'
      ]
    },
    bus: {
      id: 'bus',
      title: '3. Vehicle Network (CAN-FD / LIN 2.2A)',
      badge: 'Bi-Directional Bus',
      color: '#A855F7',
      summary: 'Interconnects door intelligence with vehicle Body Control Module (BCM), telemetry gateway, and infotainment.',
      details: [
        '5 Mbps CAN-FD high-speed protocol supporting OEM encryption and authentication tokens.',
        'Dedicated sub-network LIN 2.2A bus for door armrest switches and window controls.',
        'Broadcasts live glass opacity, door latch position, and torque monitoring metrics.'
      ]
    },
    actuators: {
      id: 'actuators',
      title: '4. Power Actuators & Glass Inverter',
      badge: 'Actuation Output',
      color: '#10B981',
      summary: 'Executes physical power swing and drives Suspended Particle / Electrochromic dimming matrix.',
      details: [
        'Brushless DC (BLDC) motor with planetary reduction delivering 28 Nm peak holding torque.',
        '400Hz sinusoidal AC inverter driver board with linear PWM opacity regulation.',
        'Magnetic fail-safe manual override clutch that releases instantly when power is cut.'
      ]
    }
  };

  return (
    <Card className="mt-16 p-8 sm:p-10 bg-card border-border/80 shadow-xl">
      <div className="text-center max-w-2xl mx-auto mb-9">
        <div className="inline-flex mb-3">
          <Badge variant="red" className="gap-2 py-1 px-3 text-xs uppercase tracking-wider font-bold">
            <Network size={13} /> Integrated Bus Topology
          </Badge>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground font-heading tracking-tight">
          System Data-Flow & Control Architecture
        </h3>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          Click any architecture node below to inspect communication protocols, hardware interfaces, and safety interlocks.
        </p>
      </div>

      {/* Interactive Data-Flow Pipeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {Object.keys(nodes).map((key, index) => {
          const item = nodes[key];
          const isSelected = selectedNode === key;

          return (
            <div
              key={key}
              onClick={() => setSelectedNode(key)}
              className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 relative border ${
                isSelected
                  ? 'bg-sky-500/10 border-sky-500 shadow-md ring-1 ring-sky-500/30'
                  : 'bg-muted/40 border-border/70 hover:border-sky-500/40'
              }`}
            >
              <div className="flex justify-between items-center mb-2.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  {item.badge}
                </span>
                <span className="text-xs text-muted-foreground font-mono">0{index + 1}</span>
              </div>

              <div className="text-sm font-bold text-foreground mb-1.5 font-heading">
                {item.title.split('. ')[1]}
              </div>

              <div className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                {item.summary}
              </div>

              {isSelected && (
                <div
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-2 bg-sky-500"
                  style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Node Inspector Detail Card */}
      {selectedNode && (
        <Card className="p-6 bg-muted/30 border-sky-500/30 shadow-md mb-9">
          <div className="flex items-center gap-2.5 mb-3">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{
                backgroundColor: nodes[selectedNode].color,
                boxShadow: `0 0 10px ${nodes[selectedNode].color}`,
              }}
            />
            <h4 className="text-lg font-bold text-foreground font-heading">
              {nodes[selectedNode].title}
            </h4>
          </div>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            {nodes[selectedNode].summary}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {nodes[selectedNode].details.map((point, idx) => (
              <div key={idx} className="flex gap-2.5 items-start text-xs text-muted-foreground">
                <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{point}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Safety Interlocks & Redundancy Banner */}
      <div>
        <div className="flex items-center gap-2 mb-3.5">
          <ShieldAlert size={16} className="text-amber-500" />
          <h4 className="text-xs font-bold text-foreground uppercase tracking-wider font-heading">
            Triple-Tier Safety & Functional Overrides
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 bg-muted/40 border-border/70">
            <div className="flex items-center gap-2 text-amber-500 font-bold text-xs mb-1">
              <Lock size={14} />
              <span>1. Vehicle In-Drive Speed Lockout</span>
            </div>
            <div className="text-xs text-muted-foreground leading-relaxed">
              Hardware CAN interlock automatically locks all power swing actuation whenever vehicle speed exceeds 0 km/h or gear selector is outside of Park (P).
            </div>
          </Card>

          <Card className="p-4 bg-muted/40 border-border/70">
            <div className="flex items-center gap-2 text-amber-500 font-bold text-xs mb-1">
              <AlertOctagon size={14} />
              <span>2. Blind-Spot Proximity Radar Shield</span>
            </div>
            <div className="text-xs text-muted-foreground leading-relaxed">
              Fuses exterior mmWave sensors with vehicle Blind-Spot Monitoring (BSM) to immediately halt swing if bicycles, pedestrians, or curbs are detected within 30cm.
            </div>
          </Card>

          <Card className="p-4 bg-muted/40 border-border/70">
            <div className="flex items-center gap-2 text-amber-500 font-bold text-xs mb-1">
              <Zap size={14} />
              <span>3. Low-Voltage Magnetic Fail-Safe</span>
            </div>
            <div className="text-xs text-muted-foreground leading-relaxed">
              Magnetic override clutch mechanically disengages the planetary gearbox when 12V battery drops below 9.0V, requiring only &lt; 15N manual force to open/close.
            </div>
          </Card>
        </div>
      </div>
    </Card>
  );
};
