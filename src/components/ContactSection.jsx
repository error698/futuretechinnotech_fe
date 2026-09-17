import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import companyData from '../data/company.json';
import { API_ENDPOINTS } from '../config/api';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export const ContactSection = () => {
  const { phone, email, address, workingHours } = companyData.company.contact;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Dealership & Bulk Order Inquiry',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch(API_ENDPOINTS.contact, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', subject: 'Dealership & Bulk Order Inquiry', message: '' });
      } else {
        setError(data.error || 'Submission failed');
      }
    } catch (err) {
      setError('Connection to backend failed. Please verify Python backend is running.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section bg-secondary/20 transition-colors duration-300">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <MapPin size={14} />
            <span>Headquarters & Facility</span>
          </div>
          <h2 className="section-title">Get In Touch With FTIT</h2>
          <p className="section-subtitle">
            Reach out to Futuretech Innotech for OEM tie-ups, dealership distribution, precision electroplating, and direct fleet inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Information Cards */}
          <div className="flex flex-col gap-4">
            <Card className="p-5 flex items-start gap-4 shadow-sm bg-card hover:border-primary/40 transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/25 flex items-center justify-center text-red-600 dark:text-red-500 shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Direct Line</div>
                <a href={`tel:${phone}`} className="text-base sm:text-lg font-bold text-foreground hover:text-primary transition-colors">
                  {phone}
                </a>
                <div className="text-xs text-muted-foreground mt-0.5">Support & Sales Hours</div>
              </div>
            </Card>

            <Card className="p-5 flex items-start gap-4 shadow-sm bg-card hover:border-sky-500/40 transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-sky-500/10 border border-sky-500/25 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0">
                <Mail size={20} />
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Corporate Email</div>
                <a href={`mailto:${email}`} className="text-base sm:text-lg font-bold text-foreground hover:text-sky-500 transition-colors">
                  {email}
                </a>
                <div className="text-xs text-muted-foreground mt-0.5">Product & Engineering Inquiries</div>
              </div>
            </Card>

            <Card className="p-5 flex items-start gap-4 shadow-sm bg-card hover:border-emerald-500/40 transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Registered Office</div>
                <div className="text-sm sm:text-base font-semibold text-foreground leading-snug">
                  {address}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">Rajouri Garden, New Delhi, India</div>
              </div>
            </Card>

            <Card className="p-5 flex items-start gap-4 shadow-sm bg-card hover:border-amber-500/40 transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                <Clock size={20} />
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Working Hours</div>
                <div className="text-sm sm:text-base font-semibold text-foreground">{workingHours}</div>
                <div className="text-xs text-muted-foreground mt-0.5">Sunday: Closed (Manufacturing On Call)</div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="p-8 sm:p-10 flex flex-col justify-center bg-card shadow-lg">
            <h3 className="text-xl font-bold text-foreground font-heading mb-2">
              Send Direct Message
            </h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Whether you need bespoke vehicle fittings, catalog distribution, or electroplating services, our team responds within 24 hours.
            </p>

            {success ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
                <CheckCircle2 size={40} className="text-emerald-500 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-foreground mb-1">Message Sent!</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Thank you! Our engineering and sales team in New Delhi has received your inquiry.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSuccess(false)}
                  className="mt-4 rounded-full"
                >
                  Send Another
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-xs">
                    <AlertCircle size={16} />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    type="text"
                    placeholder="Your Name *"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <Input
                    type="email"
                    placeholder="Email Address *"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    type="tel"
                    placeholder="Contact Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="flex h-11 w-full rounded-xl border border-input bg-background/90 px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="Dealership & Bulk Order Inquiry">Dealership Inquiry</option>
                    <option value="OEM Tier-1 Manufacturing">OEM Tier-1 Contract</option>
                    <option value="Surface Electroplating Services">Electroplating Services</option>
                    <option value="Product Support & Warranty">Warranty & Support</option>
                  </select>
                </div>

                <Textarea
                  rows={4}
                  placeholder="How can our engineering team assist you? *"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />

                <Button
                  type="submit"
                  disabled={submitting}
                  size="lg"
                  className="w-full rounded-xl gap-2 h-12 font-bold shadow-md shadow-red-500/20"
                >
                  <Send size={16} />
                  <span>{submitting ? 'Transmitting Message...' : 'Send Message To FTIT'}</span>
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
};
