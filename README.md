# GBC Dashboard

A full-stack dashboard that syncs orders from RetailCRM into Supabase, displays analytics in a Next.js app, and sends Telegram alerts for high-value orders.

---

## What I Built

This project does:

* Imports mock orders into RetailCRM
* Syncs orders from RetailCRM → Supabase
* Displays orders and revenue in a dashboard
* Sends Telegram alerts for large orders (> 50,000 ₸)

---

## Tech Stack

* Next.js (React + TypeScript)
* Supabase (PostgreSQL)
* RetailCRM API
* Telegram Bot API
* Vercel (deployment)

---

## Project Structure

* `app/page.tsx` — dashboard UI
* `lib/retailcrm.ts` — RetailCRM API helper
* `lib/supabase.ts` — Supabase client
* `lib/telegram.ts` — Telegram bot
* `scripts/import-mock-orders.ts` — import test orders
* `scripts/sync-retailcrm-to-supabase.ts` — sync orders
* `scripts/test-telegram.ts` — test Telegram

---

## Environment Variables

Create `.env.local`:

SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
RETAILCRM_API_KEY=
RETAILCRM_BASE_URL=
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=

---

## Run Locally

npm install
npm run dev -- --hostname 127.0.0.1

Open: http://127.0.0.1:3000

---

## Scripts

Import orders:
npx tsx scripts/import-mock-orders.ts

Sync orders:
npx tsx scripts/sync-retailcrm-to-supabase.ts

Test Telegram:
npx tsx scripts/test-telegram.ts

---

## AI Usage

I used ChatGPT to:

* generate RetailCRM import script
* generate Supabase sync logic
* create Telegram bot integration
* debug API errors and invalid keys
* fix Supabase RLS issues
* fix Next.js runtime issues

---

## Challenges

* Invalid Supabase API key
* Supabase RLS blocking data
* Telegram API timeout due to network
* Next.js local cache issues
* Environment variables not loading

---

## Solutions

* Fixed Supabase keys
* Added SELECT RLS policy
* Used VPN/network fix for Telegram
* Cleared `.next` cache
* Corrected `.env.local` setup

---

## Result

The system works end-to-end:

* Orders imported from RetailCRM
* Stored in Supabase
* Displayed in dashboard
* Telegram alerts sent for large orders

---

## Links

GitHub: https://github.com/warda-tariqq/gbc-dashboard
Live App: https://gbc-dashboard-f9sl.vercel.app

---

## Telegram Alert Example

🚨 Large order detected
Order: 1002
Customer: Sara Ahmed
Total: 60000 ₸

---

## Summary

This project demonstrates:

* API integration
* data pipeline
* full-stack development
* real-time alert system
