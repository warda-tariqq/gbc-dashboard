app/
page.tsx # Dashboard UI

lib/
retailcrm.ts # RetailCRM API helper
supabase.ts # Supabase client
telegram.ts # Telegram bot helper

scripts/
import-mock-orders.ts # Upload test orders to RetailCRM
sync-retailcrm-to-supabase.ts # Sync orders → Supabase
test-telegram.ts # Send test Telegram message

mock_orders.json # Test data


---

## ⚙️ Environment Variables

Create a `.env.local` file:

```env
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
RETAILCRM_API_KEY=
RETAILCRM_BASE_URL=
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
▶️ Running Locally
npm install
npm run dev -- --hostname 127.0.0.1

Open:

http://127.0.0.1:3000
📜 Scripts
Import mock orders into RetailCRM
npx tsx scripts/import-mock-orders.ts
Sync orders → Supabase
npx tsx scripts/sync-retailcrm-to-supabase.ts
Test Telegram bot
npx tsx scripts/test-telegram.ts
🤖 AI Usage

I used ChatGPT to:

generate RetailCRM import scripts
build Supabase sync logic
implement Telegram bot integration
debug API errors and invalid keys
fix Supabase Row Level Security issues
debug Next.js runtime and cache issues
💬 Example Prompts
"Create a TypeScript script to import JSON orders into RetailCRM API"
"Write a script to sync RetailCRM orders into Supabase"
"Create a Telegram bot alert for orders above 50,000 ₸"
"Fix Supabase RLS so frontend can read data"
"Debug invalid API key error in Supabase client"
⚠️ Challenges I Faced
Invalid Supabase API key caused connection errors
Supabase returned empty data due to RLS restrictions
Telegram API requests failed due to network restrictions
Next.js local server cache caused runtime issues
Environment variables were not loaded correctly
✅ How I Solved Them
Corrected Supabase anon and service role keys
Added SELECT RLS policy for public access
Used a working network/VPN for Telegram API
Cleared .next cache and restarted dev server
Ensured .env.local variables were correctly loaded
📊 Result

The system successfully:

imports orders into RetailCRM
stores them in Supabase
displays total orders and revenue
shows order table in dashboard
sends Telegram alerts for large orders
🔗 Links
GitHub: https://github.com/warda-tariqq/gbc-dashboard
Live App: https://gbc-dashboard-f9sl.vercel.app
📩 Telegram Alert Example
🚨 Large order detected
Order: 1002
Customer: Sara Ahmed
Total: 60000 ₸
🧠 Summary

This project demonstrates:

API integration
data pipelines
database design
full-stack development
real-time alerting systems
