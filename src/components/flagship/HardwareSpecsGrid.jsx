import React from 'react';
import { 
  Cpu, 
  Check, 
  ChevronRight,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const HardwareSpecsGrid = ({ onOpenDataSheet }) => {
  return (
    <div className="mt-16">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex mb-3">
          <Badge variant="cyan" className="gap-2 py-1 px-3 text-xs uppercase tracking-wider font-bold">
            <Cpu size={13} /> Engineering Grade Specifications
          </Badge>
        </div>
        <h2 className="text-3xl font-extrabold text-foreground font-heading tracking-tight">
          Subsystem Technical Architecture
        </h2>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          Production-validated hardware designed to meet ISO 26262 ASIL-B functional safety, ECE R21 interior fittings, and severe automotive environmental thermal cycles (-40°C to +85°C).
        </p>
      </div>

      {/* Side by Side Dual Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* CARD A: POWER DOOR ACTUATION & GESTURE MODULE */}
        <Card className="p-8 relative flex flex-col justify-between border-red-500/30 hover:border-red-500/50 shadow-lg">
          <div>
            <div className="flex justify-between items-center mb-4">
              <Badge variant="red" className="text-[11px] font-extrabold tracking-wider">
                Subsystem Card A
              </Badge>
              <span className="text-xs text-muted-foreground font-mono">HW-REV 4.2 / CAN-FD</span>
            </div>

            <h3 className="text-xl font-bold text-foreground font-heading tracking-tight mb-2">
              Power Door Actuation & Gesture Module
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
              High-torque brushless servo drive pairing multi-sensor exterior gesture radar with motorized soft-close cinch latches for ultra-quiet, VIP entry.
            </p>

            {/* Spec Features Itemized Grid */}
            <div className="space-y-4 mb-6">
              <div className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-lg bg-red-500/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={14} className="text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-foreground">
                    Integrated BLDC Motor & Magnetic Clutch
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    Planetary 3-stage gearbox delivering 28 Nm peak torque with fail-safe zero-resistance magnetic clutch for manual override if 12V power is disconnected.
                  </div>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-lg bg-red-500/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={14} className="text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-foreground">
                    Dual-Zone Optical ToF & 77GHz mmWave Radar
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    Weatherproof gesture detection operable in rain, snow, mud, and dust. Detects swipe gestures within 15cm–45cm envelope without false-positive activation.
                  </div>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-lg bg-red-500/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={14} className="text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-foreground">
                    Multi-Perimeter Current-Ripple Anti-Pinch
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    High-frequency current monitoring samples motor armature inductance every 2ms. Instantly reverses door motion within 80ms upon encountering &gt; 12N obstacle resistance.
                  </div>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-lg bg-red-500/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={14} className="text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-foreground">
                    Two-Stage Rotary Latch & Automatic Soft Cinch
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    Whisper-quiet motorized pull-in cinch draws door from primary striker catch to secondary sealed latch in under 1.2 seconds, achieving &lt; 42 dB cabin acoustic isolation.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-2 p-3 bg-muted/40 rounded-xl border border-border/70 mb-4 text-xs">
              <div>
                <span className="text-[10px] text-muted-foreground uppercase font-bold">Motor Voltage:</span>
                <div className="font-bold text-foreground">12V/24V DC Compatible</div>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground uppercase font-bold">Ingress Rating:</span>
                <div className="font-bold text-foreground">IP67 Sealed Housing</div>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground uppercase font-bold">Operating Temp:</span>
                <div className="font-bold text-foreground">-40°C to +85°C</div>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground uppercase font-bold">Endurance Life:</span>
                <div className="font-bold text-foreground">100,000 Full Cycles</div>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={() => onOpenDataSheet('door')}
              className="w-full rounded-xl gap-2 text-red-600 dark:text-red-400 border-red-500/30 hover:bg-red-500/10 text-xs font-bold h-11"
            >
              <span>View Full Door Pinout & Kinematics Specs</span>
              <ChevronRight size={14} />
            </Button>
          </div>
        </Card>

        {/* CARD B: ELECTRONIC SWITCHABLE WINDOW TINT MODULE */}
        <Card className="p-8 relative flex flex-col justify-between border-sky-500/30 hover:border-sky-500/50 shadow-lg">
          <div>
            <div className="flex justify-between items-center mb-4">
              <Badge variant="cyan" className="text-[11px] font-extrabold tracking-wider">
                Subsystem Card B
              </Badge>
              <span className="text-xs text-muted-foreground font-mono">SPD/EC-GEN3 / PWM</span>
            </div>

            <h3 className="text-xl font-bold text-foreground font-heading tracking-tight mb-2">
              Electronic Switchable Window Tint Module
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
              Suspended Particle Device (SPD) and Electrochromic laminated glazing for instant variable privacy, infrared rejection, and passenger thermal comfort.
            </p>

            {/* Spec Features Itemized Grid */}
            <div className="space-y-4 mb-6">
              <div className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-lg bg-sky-500/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={14} className="text-sky-600 dark:text-sky-400" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-foreground">
                    Dual-Layer Suspended Particle & EC Glass
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    Microscopic light-absorbing particles suspended between conductive PET films align under electric field for seamless 1% to 74% opacity modulation.
                  </div>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-lg bg-sky-500/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={14} className="text-sky-600 dark:text-sky-400" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-foreground">
                    Microsecond PWM/AC Inverter Driver Board
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    Automotive-grade high-frequency 400Hz sinusoidal AC driver eliminates visible flicker, acoustic coil whine, and guarantees linear gradient dimming transitions.
                  </div>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-lg bg-sky-500/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={14} className="text-sky-600 dark:text-sky-400" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-foreground">
                    Multi-Channel Vehicle Control Integration
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    Controlled via Central Body Control Module (BCM), door armrest capacitive touchpads, VIP rear partition touchscreen, or wireless phone app.
                  </div>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-lg bg-sky-500/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={14} className="text-sky-600 dark:text-sky-400" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-foreground">
                    Acoustic Lamination & Solar Shielding (TSER &gt; 80%)
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    Blocks 99.8% of ultraviolet (UV) radiation and 98% infrared heat, drastically reducing rear-cabin HVAC thermal load and extending EV battery range.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-2 p-3 bg-muted/40 rounded-xl border border-border/70 mb-4 text-xs">
              <div>
                <span className="text-[10px] text-muted-foreground uppercase font-bold">Haze Factor:</span>
                <div className="font-bold text-foreground">&lt; 1.8% (Crystal Clear)</div>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground uppercase font-bold">Power Draw:</span>
                <div className="font-bold text-foreground">~3.5 W / m² Active</div>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground uppercase font-bold">Fail-Safe Mode:</span>
                <div className="font-bold text-foreground">Clear on 0V Depletion</div>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground uppercase font-bold">Sound Reduction:</span>
                <div className="font-bold text-foreground">-38 dB Acoustic Film</div>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={() => onOpenDataSheet('glass')}
              className="w-full rounded-xl gap-2 text-sky-600 dark:text-sky-400 border-sky-500/30 hover:bg-sky-500/10 text-xs font-bold h-11"
            >
              <span>View Full Photometrics & Inverter Specs</span>
              <ChevronRight size={14} />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
