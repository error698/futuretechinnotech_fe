import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  FileCode, 
  Building2, 
  Mail, 
  User, 
  Car, 
  Calendar,
  AlertCircle 
} from 'lucide-react';
import { API_ENDPOINTS } from '../../config/api';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export const EngineeringLeadForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: 'Low-Volume Chauffeur Retrofit',
    vehiclePlatform: 'Mercedes Maybach / S-Class',
    timeline: 'Immediate (1-3 months)',
    requestCAD: true,
    requestSafetyDoc: true,
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.company.trim()) {
      setErrorMsg('Please complete all required fields (Name, Email, Organization).');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        vehicle: formData.vehiclePlatform,
        phone: 'Engineering Inquiry',
        items: [
          {
            name: 'Flagship Hardware Integration Kit',
            category: 'Touch & Gesture Power Doors & Smart Dimming Glass',
            quantity: 1,
            specs: {
              projectType: formData.projectType,
              timeline: formData.timeline,
              requestCAD: formData.requestCAD,
              requestSafetyDoc: formData.requestSafetyDoc
            }
          }
        ],
        message: `Project Type: ${formData.projectType}\nPlatform: ${formData.vehiclePlatform}\nTimeline: ${formData.timeline}\nCAD Files: ${formData.requestCAD ? 'YES' : 'NO'}\nSafety Docs: ${formData.requestSafetyDoc ? 'YES' : 'NO'}\nNotes: ${formData.message}`
      };

      const res = await fetch(API_ENDPOINTS.rfq, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmittedId(data.rfqNumber || `SPEC-${Date.now()}`);
      } else {
        setErrorMsg(data.error || 'Submission error. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Unable to connect to backend service. Please verify server connectivity.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card
      id="hardware-inquiry-form"
      className="mt-16 p-8 sm:p-12 relative bg-card border-border/80 shadow-xl"
    >
      <div className="max-w-2xl mx-auto text-center mb-8">
        <div className="inline-flex mb-3">
          <Badge variant="cyan" className="gap-2 py-1 px-3 text-xs uppercase tracking-wider font-bold">
            <FileCode size={13} /> Direct OEM Engineering Channel
          </Badge>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground font-heading tracking-tight">
          Request Hardware Evaluation Kit & CAD Specs
        </h3>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          Connect directly with Futuretech Innotech’s mechatronics applications engineering team. We supply full 3D STEP packaging models, CAN bus DBC matrix definitions, and bench evaluation prototypes.
        </p>
      </div>

      {submittedId ? (
        <div className="p-10 text-center bg-muted/40 rounded-2xl border border-emerald-500/30">
          <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={32} className="text-emerald-500" />
          </div>
          <h4 className="text-2xl font-bold text-foreground font-heading mb-2">
            Engineering Request Dispatched
          </h4>
          <p className="text-sm text-muted-foreground max-w-md mx-auto mb-4">
            Your evaluation inquiry reference <span className="text-sky-600 dark:text-sky-400 font-mono font-bold">{submittedId}</span> has been assigned to our senior automotive applications engineer.
          </p>
          <div className="text-xs text-muted-foreground font-medium">
            Direct OEM line: +91 70424 50591 | Pdhead@futuretechinnotech.in
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-5">
          {errorMsg && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-xs">
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-foreground">
                Full Name *
              </label>
              <div className="relative">
                <Input
                  type="text"
                  required
                  placeholder="e.g. Marcus Vance"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="pl-9"
                />
                <User size={15} className="absolute left-3 top-3 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Corporate Email */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-foreground">
                Corporate / OEM Email *
              </label>
              <div className="relative">
                <Input
                  type="email"
                  required
                  placeholder="name@oem-automotive.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-9"
                />
                <Mail size={15} className="absolute left-3 top-3 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Organization */}
            <div className="space-y-1.5 sm:col-span-2 lg:col-span-1">
              <label className="block text-xs font-bold text-foreground">
                Company / Coachbuilder *
              </label>
              <div className="relative">
                <Input
                  type="text"
                  required
                  placeholder="e.g. Bespoke Coachcraft Ltd"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="pl-9"
                />
                <Building2 size={15} className="absolute left-3 top-3 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Project Scope */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-foreground">
                Project Scope
              </label>
              <select
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                className="flex h-11 w-full rounded-xl border border-input bg-background/80 px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="Low-Volume Chauffeur Retrofit">Low-Volume Chauffeur Retrofit (10-100 Units)</option>
                <option value="OEM Production Series">OEM Production Series (&gt; 500 Units)</option>
                <option value="Custom Coachbuilder / Armored VIP">Custom Coachbuilder / Armored VIP</option>
                <option value="Concept Demonstration & Bench Prototype">Concept Demonstration & Bench Prototype</option>
              </select>
            </div>

            {/* Target Platform */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-foreground">
                Target Vehicle Architecture
              </label>
              <select
                value={formData.vehiclePlatform}
                onChange={(e) => setFormData({ ...formData, vehiclePlatform: e.target.value })}
                className="flex h-11 w-full rounded-xl border border-input bg-background/80 px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="Mercedes Maybach / S-Class (W223)">Mercedes Maybach / S-Class (W223)</option>
                <option value="Rolls-Royce Ghost / Phantom">Rolls-Royce Ghost / Phantom / Cullinan</option>
                <option value="Toyota Vellfire / Alphard / Hycross">Toyota Vellfire / Alphard / Hycross</option>
                <option value="Lexus LM 350h / LX600">Lexus LM 350h / LX600</option>
                <option value="Cadillac Escalade IQ / Range Rover SV">Cadillac Escalade IQ / Range Rover SV</option>
                <option value="Bespoke EV Architecture">Bespoke Custom EV Platform</option>
              </select>
            </div>

            {/* Production Timeline */}
            <div className="space-y-1.5 sm:col-span-2 lg:col-span-1">
              <label className="block text-xs font-bold text-foreground">
                Planned Timeline
              </label>
              <select
                value={formData.timeline}
                onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                className="flex h-11 w-full rounded-xl border border-input bg-background/80 px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="Immediate (1-3 months)">Immediate Prototype (1-3 months)</option>
                <option value="Development (3-6 months)">Pilot Build (3-6 months)</option>
                <option value="Series SOP 2026/2027">Full Series SOP (2026/2027)</option>
              </select>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="flex flex-wrap gap-4 p-4 rounded-xl bg-muted/40 border border-border/70">
            <label className="flex items-center gap-2 text-xs font-medium text-foreground cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.requestCAD}
                onChange={(e) => setFormData({ ...formData, requestCAD: e.target.checked })}
                className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500"
              />
              <span>Request 3D CAD (.STEP) Packaging Models & Connector Pinouts</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-medium text-foreground cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.requestSafetyDoc}
                onChange={(e) => setFormData({ ...formData, requestSafetyDoc: e.target.checked })}
                className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500"
              />
              <span>Request ISO 26262 ASIL-B Safety Dossier & Optical Test Reports</span>
            </label>
          </div>

          {/* Message Area */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-foreground">
              Packaging Constraints / Special Inquiries
            </label>
            <Textarea
              rows={3}
              placeholder="Specify door hinge cavity dimensions, glass curvature radius, or CAN network architecture requirements..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={submitting}
            size="lg"
            className="w-full rounded-xl bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 text-white font-bold h-12 gap-2 shadow-lg shadow-sky-500/25"
          >
            <Send size={16} />
            <span>
              {submitting
                ? 'Transmitting Engineering Dossier...'
                : 'Submit Hardware Evaluation Kit Request'}
            </span>
          </Button>
        </form>
      )}
    </Card>
  );
};
