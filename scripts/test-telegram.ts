import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { sendTelegramMessage } from "../lib/telegram";

async function main() {
  await sendTelegramMessage("✅ Test message from GBC dashboard project");
  console.log("Telegram message sent");
}

main().catch(console.error);