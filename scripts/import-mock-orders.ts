import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";
import { createRetailOrder } from "../lib/retailcrm";

dotenv.config({ path: ".env.local" });

async function main() {
  const filePath = path.join(process.cwd(), "mock_orders.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  const orders = JSON.parse(raw);

  for (let i = 0; i < orders.length; i++) {
    const item = orders[i];

    const retailOrder = {
      number: item.number || `TEST-${i + 1}`,
      firstName: item.firstName || item.customer?.firstName || "Test",
      lastName: item.lastName || item.customer?.lastName || "User",
      phone: item.phone || item.customer?.phone || "+77000000000",
      orderMethod: "shopping-cart",
      status: item.status || "new",
      items: (item.items || []).map((p: any, idx: number) => ({
        initialPrice: Number(p.initialPrice || p.price || 1000),
        quantity: Number(p.quantity || 1),
        offer: {
          externalId: String(p.offer?.externalId || p.id || `offer-${idx + 1}`),
        },
        productName: p.productName || p.name || `Product ${idx + 1}`,
      })),
    };

    try {
      const result = await createRetailOrder(retailOrder);
      console.log(`Imported ${i + 1}/${orders.length}`, result);
    } catch (error) {
      console.error(`Failed on order ${i + 1}:`, error);
    }
  }
}

main().catch(console.error);