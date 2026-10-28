import { useUser } from "../context/UserContext";
export default function ProfileInfo({ user = {} }) {

  const { logout } = useUser();

  const handleLogout = () => {
    logout();
  };

  return (
    <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
      <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem' }}>Personal Information</h3>
      <div style={{ display: 'grid', gap: '0.75rem', fontSize: '0.9375rem' }}>
        <div>
          <span style={{ fontWeight: 600, color: '#4b5563' }}>Name: </span>
          <span>{user.name || 'Not provided'}</span>
        </div>
        <div>
          <span style={{ fontWeight: 600, color: '#4b5563' }}>Email: </span>
          <span>{user.email || 'Not provided'}</span>
        </div>
        <div>
          <span style={{ fontWeight: 600, color: '#4b5563' }}>Phone: </span>
          <span>{user.phone || 'Not provided'}</span>
        </div>
        <div>
          <span style={{ fontWeight: 600, color: '#4b5563' }}>Address: </span>
          <span>{user.address || 'Not provided'}</span>
        </div>
      </div>
       <button
        type="button"
        onClick={handleLogout}
        style={{
          display: "block",
          marginTop: "30px",
          padding: "10px 24px",
          border: "none",
          borderRadius: "6px",
          backgroundColor: "#080001",
          color: "#ffffff",
          fontSize: "14px",
          fontWeight: "600",
          cursor: "pointer"
        }}
      >
        Logout
      </button>
    
    </div>
  );
}
