// Shared types and API hooks for the cosmetic store

export interface StoreSettings {
  website_name: string;
  phone_number: string;
  email: string;
  location: string;
  country: string;
  currency: string;
}

export interface Product {
  id: string | number;
  name: string;
  price: number;
  image: string;
  category?: string;
  description?: string;
  isDemo?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export const API_URL =
  "https://ctzluwfqilwgelexslco.supabase.co/functions/v1/products-api?project_id=skincare-by-oma-9246";

export const DEFAULT_SETTINGS: StoreSettings = {
  website_name: "Lumière Beauty",
  phone_number: "",
  email: "",
  location: "",
  country: "",
  currency: "NGN",
};

export function getCurrencySymbol(currency: string): string {
  const map: Record<string, string> = {
    NGN: "₦",
    USD: "$",
    EUR: "€",
    GBP: "£",
    GHS: "₵",
    KES: "KSh",
    ZAR: "R",
  };
  return map[currency?.toUpperCase()] ?? currency ?? "₦";
}

export function formatPrice(amount: number, currency: string): string {
  const symbol = getCurrencySymbol(currency);
  return `${symbol}${amount.toLocaleString()}`;
}
