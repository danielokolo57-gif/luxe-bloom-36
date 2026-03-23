import { useState, useEffect } from "react";
import { API_URL, DEFAULT_SETTINGS, StoreSettings, Product } from "@/lib/store";

export function useStoreData() {
  const [settings, setSettings] = useState<StoreSettings>(DEFAULT_SETTINGS);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();

        if (!cancelled) {
          const proj = json?.project ?? {};
          setSettings({
            website_name: proj.website_name ?? DEFAULT_SETTINGS.website_name,
            phone_number: proj.phone_number ?? "",
            email: proj.email ?? "",
            location: proj.location ?? "",
            country: proj.country ?? "",
            currency: proj.currency ?? "NGN",
          });

          const apiProducts: Product[] = (json?.data ?? []).map((p: Record<string, unknown>) => ({
            id: p.id ?? Math.random(),
            name: String(p.name ?? "Product"),
            price: Number(p.price ?? 0),
            image: String(p.image ?? p.image_url ?? ""),
            category: String(p.category ?? "Beauty"),
            description: String(p.description ?? ""),
          }));
          setProducts(apiProducts);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError("Could not connect to store. Showing preview products.");
          setProducts([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchData();
    return () => { cancelled = true; };
  }, []);

  return { settings, products, loading, error };
}
