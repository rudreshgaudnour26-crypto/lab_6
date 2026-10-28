export default function OrderHistory({ orders = [] }) {
  return (
    <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
      <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem' }}>Order History</h3>
      {orders.length === 0 ? (
        <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9375rem' }}>
          No previous orders found.
        </p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {orders.map((order, index) => (
            <li key={order.id || index} style={{ padding: '0.75rem 0', borderBottom: '1px solid #e5e7eb' }}>
              Order #{order.id || index + 1}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
