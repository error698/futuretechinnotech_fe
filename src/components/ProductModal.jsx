import React, { useState } from 'react';
import { useRFQ } from '../context/RFQContext';
import { Plus, Minus, ShieldCheck, Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  const { addToRFQ, rfqItems, setIsModalOpen } = useRFQ();
  const [quantity, setQuantity] = useState(1);
  const [selectedFinish, setSelectedFinish] = useState(
    product.finishes && product.finishes.length > 0 ? product.finishes[0] : 'OEM Standard'
  );

  const inCart = rfqItems.some((it) => it.id === product.id);

  const handleAdd = () => {
    addToRFQ(
      {
        ...product,
        name: `${product.name} (${selectedFinish})`,
      },
      quantity
    );
    onClose();
    setIsModalOpen(true);
  };

  return (
    <Dialog open={!!product} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Product Image Visual Card */}
          <div className="rounded-2xl bg-gradient-to-b from-[#1b2333] to-[#090d16] p-6 flex items-center justify-center border border-border/40 min-h-[280px]">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-[240px] max-w-full object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.7)]"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <DialogHeader className="p-0 space-y-2 mb-3">
              <div className="flex gap-2 items-center flex-wrap">
                <Badge variant="red">{product.category}</Badge>
                <Badge variant="outline">{product.id}</Badge>
              </div>
              <DialogTitle className="text-2xl font-bold font-heading text-foreground">
                {product.name}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
                {product.description}
              </DialogDescription>
            </DialogHeader>

            {/* Specifications Grid */}
            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-muted/60 border border-border/60 mb-4">
              <div>
                <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                  Engineering Standard
                </div>
                <div className="text-xs font-semibold text-foreground">
                  IATF 16949 / ISO 9001
                </div>
              </div>
              <div>
                <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                  Direct Warranty
                </div>
                <div className="text-xs font-semibold text-foreground">
                  {product.warranty}
                </div>
              </div>
              <div className="col-span-2">
                <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                  Material Composition
                </div>
                <div className="text-xs font-semibold text-foreground">
                  {product.material}
                </div>
              </div>
            </div>

            {/* Surface Finishes */}
            {product.finishes && product.finishes.length > 0 && (
              <div className="mb-4">
                <div className="text-xs font-semibold text-muted-foreground mb-2">
                  Select Surface Finish Option:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {product.finishes.map((fn) => (
                    <button
                      key={fn}
                      onClick={() => setSelectedFinish(fn)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                        selectedFinish === fn
                          ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                          : 'bg-muted/50 text-foreground border-border/80 hover:bg-muted'
                      }`}
                    >
                      {fn}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Compatible Cars */}
            <div className="mb-5">
              <div className="text-xs font-semibold text-muted-foreground mb-2">
                Compatible Vehicles:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {product.compatible_cars.map((c) => (
                  <Badge key={c} variant="secondary" className="text-[11px]">
                    {c}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Quantity & CTA */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center bg-muted/60 rounded-full border border-border/80 p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-foreground hover:bg-background transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={13} />
                </button>
                <span className="w-8 text-center font-bold text-sm text-foreground">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-foreground hover:bg-background transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={13} />
                </button>
              </div>

              <Button onClick={handleAdd} className="flex-1 rounded-full gap-2">
                <Plus size={16} />
                <span>Add to RFQ Quotation</span>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
