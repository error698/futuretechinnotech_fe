import React, { useState } from 'react';
import { FileText, Printer, ShieldCheck, Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const TechDataSheetModal = ({ isOpen, onClose, initialSubsystem = 'door' }) => {
  const [activeTab, setActiveTab] = useState(initialSubsystem);

  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-6 border-b border-border/80 flex items-center justify-between bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center shrink-0">
              <FileText size={20} className="text-sky-600 dark:text-sky-400" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold font-heading text-foreground">
                Technical Engineering Data Sheet
              </DialogTitle>
              <p className="text-xs text-muted-foreground">
                Futuretech Innotech OEM Application Dossier • Ref: FTIT-DS-2026-V4
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 mr-8">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="gap-1.5 h-8 text-xs rounded-lg"
            >
              <Printer size={13} /> Print
            </Button>
          </div>
        </div>

        {/* Tab Selector & Content */}
        <Tabs
          defaultValue={initialSubsystem}
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col overflow-hidden"
        >
          <div className="px-6 pt-3 border-b border-border/70 bg-background">
            <TabsList className="grid grid-cols-2 max-w-md h-10">
              <TabsTrigger value="door" className="text-xs font-semibold">
                Touch & Gesture Power Doors
              </TabsTrigger>
              <TabsTrigger value="glass" className="text-xs font-semibold">
                Smart Dimming Glass
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="p-6 overflow-y-auto flex-1">
            <TabsContent value="door" className="mt-0 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="p-3.5 bg-muted/40 rounded-xl border border-border/70">
                  <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                    Nominal Operating Voltage
                  </div>
                  <div className="text-sm font-extrabold text-foreground mt-1">
                    12.0 V DC (9V - 16V)
                  </div>
                </div>
                <div className="p-3.5 bg-muted/40 rounded-xl border border-border/70">
                  <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                    Peak Holding Torque
                  </div>
                  <div className="text-sm font-extrabold text-foreground mt-1">
                    28.0 Nm (Continuous: 18 Nm)
                  </div>
                </div>
                <div className="p-3.5 bg-muted/40 rounded-xl border border-border/70">
                  <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                    Acoustic Sound Emission
                  </div>
                  <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                    &lt; 42 dB (Ultra-Quiet)
                  </div>
                </div>
                <div className="p-3.5 bg-muted/40 rounded-xl border border-border/70">
                  <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                    Mechanical Override Force
                  </div>
                  <div className="text-sm font-extrabold text-sky-600 dark:text-sky-400 mt-1">
                    &lt; 15 N Manual Resistance
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-foreground mb-3 font-heading">
                  Electrical Connector & Pinout Specification (TE Connectivity 18-Pin)
                </h4>
                <div className="rounded-xl border border-border/70 overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-muted/60 text-foreground font-semibold border-b border-border/70">
                      <tr>
                        <th className="p-2.5">Pin #</th>
                        <th className="p-2.5">Signal Name</th>
                        <th className="p-2.5">Type</th>
                        <th className="p-2.5">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60 text-muted-foreground">
                      <tr>
                        <td className="p-2.5 font-bold text-foreground">1, 2</td>
                        <td className="p-2.5 font-mono text-foreground">VBAT_PWR</td>
                        <td className="p-2.5">Power Input</td>
                        <td className="p-2.5">Fused 30A 12V Main Actuator Feed</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-foreground">3, 4</td>
                        <td className="p-2.5 font-mono text-foreground">GND_CHASSIS</td>
                        <td className="p-2.5">Ground</td>
                        <td className="p-2.5">Primary Low-Impedance Return</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-foreground">7</td>
                        <td className="p-2.5 font-mono text-cyan-600 dark:text-cyan-400">CAN_FD_H</td>
                        <td className="p-2.5">Bus High</td>
                        <td className="p-2.5">5 Mbps ISO 11898-2 CAN-FD Bus</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-foreground">8</td>
                        <td className="p-2.5 font-mono text-cyan-600 dark:text-cyan-400">CAN_FD_L</td>
                        <td className="p-2.5">Bus Low</td>
                        <td className="p-2.5">5 Mbps ISO 11898-2 CAN-FD Bus</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-foreground">11</td>
                        <td className="p-2.5 font-mono text-foreground">LIN_SW_BUS</td>
                        <td className="p-2.5">LIN I/O</td>
                        <td className="p-2.5">Armrest & Roof Switch Interconnect</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-foreground">14, 15</td>
                        <td className="p-2.5 font-mono text-foreground">RADAR_TX/RX</td>
                        <td className="p-2.5">Sensor Bus</td>
                        <td className="p-2.5">77GHz mmWave Obstacle Radar Link</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-foreground mb-2 font-heading">
                  Regulatory Standards & Compliance
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Check size={14} className="text-emerald-500 shrink-0" />
                    <span><b>Functional Safety:</b> ISO 26262 ASIL-B Motion Supervisor</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check size={14} className="text-emerald-500 shrink-0" />
                    <span><b>Anti-Pinch:</b> ECE R21 & FMVSS 206 Standard</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check size={14} className="text-emerald-500 shrink-0" />
                    <span><b>EMC/EMI:</b> CISPR 25 Class 5 Conducted Immunity</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check size={14} className="text-emerald-500 shrink-0" />
                    <span><b>Thermal Shock:</b> ISO 16750-4 (-40°C to +85°C)</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="glass" className="mt-0 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="p-3.5 bg-muted/40 rounded-xl border border-border/70">
                  <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                    VLT Modulation Range
                  </div>
                  <div className="text-sm font-extrabold text-foreground mt-1">
                    1.2% to 74.0% Linear
                  </div>
                </div>
                <div className="p-3.5 bg-muted/40 rounded-xl border border-border/70">
                  <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                    Solar Heat Rejection
                  </div>
                  <div className="text-sm font-extrabold text-sky-600 dark:text-sky-400 mt-1">
                    TSER &gt; 84.0% (Opaque)
                  </div>
                </div>
                <div className="p-3.5 bg-muted/40 rounded-xl border border-border/70">
                  <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                    Inverter Frequency
                  </div>
                  <div className="text-sm font-extrabold text-foreground mt-1">
                    AC 65V / 400Hz Sinusoidal
                  </div>
                </div>
                <div className="p-3.5 bg-muted/40 rounded-xl border border-border/70">
                  <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                    Switch Latency
                  </div>
                  <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                    &lt; 1.8s Full Gradient
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-foreground mb-2 font-heading">
                  Laminated Glass Cross-Section & Optical Matrix
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  The FTIT SPD/EC composite laminate features an asymmetrical 5-layer acoustic structure (2.1mm outer float glass + 0.76mm acoustic PVB + active suspended particle film + 0.76mm structural PVB + 2.1mm tempered interior glass). Fail-safe logic maintains transparent state upon vehicle power shutdown.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-foreground mb-2 font-heading">
                  Automotive Certification & Photometric Compliance
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Check size={14} className="text-emerald-500 shrink-0" />
                    <span><b>Automotive Glazing:</b> ECE R43 & ANSI/SAE Z26.1 Certified</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check size={14} className="text-emerald-500 shrink-0" />
                    <span><b>Optical Haze:</b> ASTM D1003 Haze &lt; 1.8% in clear mode</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check size={14} className="text-emerald-500 shrink-0" />
                    <span><b>Weathering:</b> Accelerated QUV 2,000 hrs ASTM G154</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check size={14} className="text-emerald-500 shrink-0" />
                    <span><b>Durability:</b> Tested beyond 250,000 gradient cycles</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-border/80 flex justify-end bg-muted/30">
          <Button onClick={onClose} className="rounded-full text-xs font-bold px-6">
            Close Dossier
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
