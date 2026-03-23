import React from "react";
import { X, Minus, Plus, Trash2, MessageCircle } from "lucide-react";
import { CartItem, StoreSettings, formatPrice } from "@/lib/store";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  settings: StoreSettings;
  totalPrice: number;
  onUpdateQuantity: (id: string | number, qty: number) => void;
  onRemove: (id: string | number) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  settings,
  totalPrice,
  onUpdateQuantity,
  onRemove,
}: CartDrawerProps) {
  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;
    const lines = cart
      .map((item) => `• ${item.name} x${item.quantity} — ${formatPrice(item.price * item.quantity, settings.currency)}`)
      .join("\n");
    const total = formatPrice(totalPrice, settings.currency);
    const message = encodeURIComponent(
      `Hello, I would like to place an order:\n\n${lines}\n\nTotal: ${total}\n\nPlease confirm availability.`
    );
    const number = settings.phone_number.replace(/\D/g, "");
    window.open(`https://wa.me/${number}?text=${message}`, "_blank");
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 h-full z-50 flex flex-col transition-transform duration-400 ease-in-out w-full max-w-md"
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          background: "hsl(var(--background))",
          boxShadow: "-8px 0 40px rgba(0,0,0,0.12)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5 border-b"
          style={{ borderColor: "hsl(var(--border))" }}
        >
          <h2 className="font-serif text-xl" style={{ color: "hsl(var(--charcoal))" }}>
            Shopping Bag ({cart.length})
          </h2>
          <button
            onClick={onClose}
            className="p-2 transition-opacity hover:opacity-60"
            style={{ color: "hsl(var(--charcoal))" }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 gap-3">
              <p className="font-serif text-xl" style={{ color: "hsl(var(--muted-foreground))" }}>
                Your bag is empty
              </p>
              <button className="btn-outline-gold text-xs" onClick={onClose}>
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 pb-4 border-b last:border-0"
                style={{ borderColor: "hsl(var(--border))" }}
              >
                <div
                  className="w-20 h-20 flex-shrink-0 overflow-hidden"
                  style={{ background: "hsl(var(--cream))" }}
                >
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                      No img
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-sm leading-tight mb-1 truncate" style={{ color: "hsl(var(--charcoal))" }}>
                    {item.name}
                  </p>
                  <p className="text-xs mb-2" style={{ color: "hsl(var(--gold))" }}>
                    {formatPrice(item.price, settings.currency)}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 flex items-center justify-center border transition-colors hover:bg-muted"
                      style={{ borderColor: "hsl(var(--border))" }}
                    >
                      <Minus size={10} />
                    </button>
                    <span className="text-sm w-6 text-center tabular-nums">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 flex items-center justify-center border transition-colors hover:bg-muted"
                      style={{ borderColor: "hsl(var(--border))" }}
                    >
                      <Plus size={10} />
                    </button>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="ml-auto p-1 transition-opacity hover:opacity-60"
                      style={{ color: "hsl(var(--destructive))" }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div
            className="px-6 py-5 border-t space-y-4"
            style={{ borderColor: "hsl(var(--border))" }}
          >
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground tracking-wide uppercase text-xs">Total</span>
              <span className="font-serif text-xl" style={{ color: "hsl(var(--charcoal))" }}>
                {formatPrice(totalPrice, settings.currency)}
              </span>
            </div>
            <button
              onClick={handleWhatsAppOrder}
              className="w-full btn-gold flex items-center justify-center gap-2 text-sm"
              disabled={!settings.phone_number}
            >
              <MessageCircle size={16} />
              Order via WhatsApp
            </button>
            {!settings.phone_number && (
              <p className="text-xs text-center text-muted-foreground">
                WhatsApp number not configured
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
