export async function createRetailOrder(order: any) {
  const BASE_URL = process.env.RETAILCRM_BASE_URL;
  const API_KEY = process.env.RETAILCRM_API_KEY;

  if (!BASE_URL) {
    throw new Error("RETAILCRM_BASE_URL is missing in .env.local");
  }

  if (!API_KEY) {
    throw new Error("RETAILCRM_API_KEY is missing in .env.local");
  }

  const body = new URLSearchParams();
  body.set("apiKey", API_KEY);
  body.set("site", "gbc-demo");
  body.set("order", JSON.stringify(order));

  const res = await fetch(`${BASE_URL}/api/v5/orders/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  const data = await res.json();

  if (!res.ok || data.success === false) {
    throw new Error(`RetailCRM error: ${JSON.stringify(data)}`);
  }

  return data;
}

export async function fetchRetailOrders() {
  const BASE_URL = process.env.RETAILCRM_BASE_URL;
  const API_KEY = process.env.RETAILCRM_API_KEY;

  if (!BASE_URL) {
    throw new Error("RETAILCRM_BASE_URL is missing in .env.local");
  }

  if (!API_KEY) {
    throw new Error("RETAILCRM_API_KEY is missing in .env.local");
  }

  const url = new URL(`${BASE_URL}/api/v5/orders`);
  url.searchParams.set("apiKey", API_KEY);
  url.searchParams.set("limit", "100");

  const res = await fetch(url.toString());
  const data = await res.json();

  if (!res.ok || data.success === false) {
    throw new Error(`RetailCRM fetch error: ${JSON.stringify(data)}`);
  }

  return data.orders || [];
}