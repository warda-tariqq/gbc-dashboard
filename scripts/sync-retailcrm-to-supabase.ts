import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { fetchRetailOrders } from "../lib/retailcrm";
import { getSupabase } from "../lib/supabase";
import { sendTelegramMessage } from "../lib/telegram";

async function main() {
  const supabase = getSupabase();
  const orders = await fetchRetailOrders();

  for (const order of orders) {
    const retailcrmId = String(order.id);

    const { data: existing, error: checkError } = await supabase
      .from("orders")
      .select("id")
      .eq("retailcrm_id", retailcrmId)
      .maybeSingle();

    if (checkError) {
      console.error("Check error:", checkError);
      continue;
    }

    if (existing) {
      console.log(`Skipped existing order ${retailcrmId}`);
      continue;
    }

    const total = Number(order.totalSumm ?? order.summ ?? 0);

    const row = {
      retailcrm_id: retailcrmId,
      order_number: order.number ?? null,
      status: order.status ?? null,
      total_sum: total,
      customer_name: [order.firstName, order.lastName].filter(Boolean).join(" "),
      created_at: order.createdAt
        ? new Date(order.createdAt.replace(" ", "T") + "Z").toISOString()
        : new Date().toISOString(),
    };

    const { error: insertError } = await supabase.from("orders").insert(row);

    if (insertError) {
      console.error(`Insert error for ${retailcrmId}:`, insertError);
      continue;
    }

    console.log(`Inserted order ${retailcrmId}`);

    if (total > 50000) {
      await sendTelegramMessage(
        `🚨 Large order detected\nOrder: ${row.order_number}\nCustomer: ${row.customer_name}\nTotal: ${row.total_sum} ₸`
      );
      console.log(`Telegram alert sent for order ${retailcrmId}`);
    }
  }
}

main().catch(console.error);