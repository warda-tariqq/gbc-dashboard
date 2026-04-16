import { createClient } from "@supabase/supabase-js";

async function getOrders() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data || [];
}

export default async function Home() {
  const orders = await getOrders();

  const totalRevenue = orders.reduce(
    (sum: number, o: any) => sum + Number(o.total_sum || 0),
    0
  );

  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Orders Dashboard</h1>

      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <div style={{ border: "1px solid #ccc", padding: "20px" }}>
          <h3>Total Orders</h3>
          <p>{orders.length}</p>
        </div>

        <div style={{ border: "1px solid #ccc", padding: "20px" }}>
          <h3>Total Revenue</h3>
          <p>{totalRevenue} ₸</p>
        </div>
      </div>

      <h2>Orders</h2>

      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Order</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o: any) => (
            <tr key={o.id}>
              <td>{o.order_number}</td>
              <td>{o.customer_name}</td>
              <td>{o.status}</td>
              <td>{o.total_sum} ₸</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}