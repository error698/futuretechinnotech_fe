import React, { useState } from 'react';
import { useRFQ } from '../context/RFQContext';
import {
  Trash2,
  Plus,
  Minus,
  FileDown,
  Send,
  CheckCircle2,
  AlertCircle,
  ShoppingBag,
} from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export const RFQCartModal = () => {
  const {
    rfqItems,
    isModalOpen,
    setIsModalOpen,
    updateQuantity,
    removeFromRFQ,
    clearRFQ,
    selectedVehicle,
  } = useRFQ();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    vehicle: selectedVehicle !== 'All Vehicles' ? selectedVehicle : 'Toyota Hycross',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmitRFQ = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setErrorMsg('Please enter your name and email address.');
      return;
    }
    if (rfqItems.length === 0) {
      setErrorMsg('Your quotation basket is empty.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      const payload = {
        ...formData,
        items: rfqItems,
      };

      const res = await fetch(API_ENDPOINTS.rfq, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitSuccess(data.rfqNumber || 'RFQ-SUCCESS');
        clearRFQ();
      } else {
        setErrorMsg(data.error || 'Failed to submit quote.');
      }
    } catch (err) {
      setErrorMsg('Unable to connect to Python backend. Please ensure the server is running.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!formData.name || !formData.email) {
      setErrorMsg('Please provide your name and email before downloading the PDF quote.');
      return;
    }

    setDownloadingPdf(true);
    setErrorMsg('');

    try {
      const payload = {
        rfqNumber: submitSuccess || `RFQ-${Date.now()}`,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        vehicle: formData.vehicle,
        items: rfqItems,
      };

      const res = await fetch(API_ENDPOINTS.generatePdf, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('PDF Generation failed');

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `FTIT_Quotation_${payload.rfqNumber}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setErrorMsg('Python PDF generator service error: ' + err.message);
    } finally {
      setDownloadingPdf(false);
    }
  };

  return (
    <Sheet open={isModalOpen} onOpenChange={setIsModalOpen}>
      <SheetContent side="right" className="w-full sm:max-w-xl p-0 flex flex-col justify-between">
        {/* Header */}
        <div className="p-6 border-b border-border/80">
          <SheetHeader className="p-0">
            <div className="flex items-center gap-2 text-primary mb-1">
              <ShoppingBag size={22} />
              <SheetTitle className="text-xl font-bold font-heading text-foreground">
                Request for Quotation (RFQ)
              </SheetTitle>
            </div>
            <SheetDescription className="text-xs text-muted-foreground">
              Direct OEM pricing, custom engineering specs & lead times
            </SheetDescription>
          </SheetHeader>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {submitSuccess ? (
            <div className="text-center py-10 px-4">
              <CheckCircle2 size={54} className="text-emerald-500 mx-auto mb-4 animate-in zoom-in-50" />
              <h3 className="text-2xl font-bold font-heading text-foreground mb-2">
                Quotation Request Submitted!
              </h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Your RFQ Reference:{' '}
                <b className="text-sky-600 dark:text-sky-400 font-mono text-base">{submitSuccess}</b>. Our engineering team at Shivaji Vihar, New Delhi will get in touch with technical drawings and pricing within 24 hours.
              </p>
              <Button
                variant="outline"
                onClick={() => setSubmitSuccess(null)}
                className="w-full mt-4"
              >
                Create Another Quotation
              </Button>
            </div>
          ) : (
            <>
              {errorMsg && (
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-xs">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Items List */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                    Line Items ({rfqItems.length})
                  </span>
                  {rfqItems.length > 0 && (
                    <button
                      onClick={clearRFQ}
                      className="text-xs text-red-500 hover:text-red-600 font-semibold"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {rfqItems.length === 0 ? (
                  <div className="text-center py-8 px-4 rounded-xl bg-muted/40 border border-dashed border-border/80">
                    <p className="text-sm text-muted-foreground mb-3">
                      Your quotation basket is empty.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsModalOpen(false)}
                      className="rounded-full"
                    >
                      Explore Products
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {rfqItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border/60"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-contain rounded-lg bg-background/50 p-1 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-foreground truncate">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-muted-foreground">
                            {item.category}
                          </div>
                        </div>

                        {/* Quantity Counter */}
                        <div className="flex items-center bg-background rounded-full border border-border/80 p-0.5 shrink-0">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-6 h-6 flex items-center justify-center text-foreground hover:bg-muted rounded-full"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="text-xs font-bold px-2 text-foreground">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-6 h-6 flex items-center justify-center text-foreground hover:bg-muted rounded-full"
                            aria-label="Increase quantity"
                          >
                            <Plus size={11} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromRFQ(item.id)}
                          className="text-muted-foreground hover:text-red-500 p-1 shrink-0 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Separator />

              {/* Inquiry Form */}
              <form onSubmit={handleSubmitRFQ} className="space-y-3.5">
                <span className="text-xs font-bold uppercase tracking-wider text-foreground block">
                  Client / Organization Details
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <Input
                    type="text"
                    placeholder="Your Full Name *"
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <Input
                    type="tel"
                    placeholder="Phone / WhatsApp"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                  <Input
                    type="text"
                    placeholder="Company / Dealership"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>

                <Input
                  type="text"
                  placeholder="Target Vehicle Model (e.g. Hycross, Thar, Fortuner)"
                  value={formData.vehicle}
                  onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                />

                <Textarea
                  rows={2}
                  placeholder="Specific requirements, volume (MOQ), or custom finish specifications..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />

                {/* Submit & PDF Triggers */}
                <div className="space-y-2 pt-2">
                  <Button
                    type="submit"
                    disabled={submitting || rfqItems.length === 0}
                    className="w-full rounded-full gap-2 h-11"
                  >
                    <Send size={16} />
                    <span>
                      {submitting
                        ? 'Submitting to Engineering...'
                        : 'Submit Quotation Request'}
                    </span>
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleDownloadPDF}
                    disabled={downloadingPdf || rfqItems.length === 0}
                    className="w-full rounded-full gap-2 text-cyan-600 dark:text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/10 h-11"
                  >
                    <FileDown size={16} />
                    <span>
                      {downloadingPdf
                        ? 'Generating PDF via Python...'
                        : 'Download Official PDF Quotation (Python)'}
                    </span>
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
