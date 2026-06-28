import { useEffect } from 'react';

function Toast({ message, type, onClose }) {

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: { bg: '#F0FDF4', border: '#16A34A', text: '#166534', icon: '✅' },
    error: { bg: '#FEF2F2', border: '#DC2626', text: '#991B1B', icon: '❌' },
    warning: { bg: '#FFF7ED', border: '#EA580C', text: '#9A3412', icon: '⚠️' },
    info: { bg: '#EFF6FF', border: '#2563EB', text: '#1e40af', icon: 'ℹ️' },
  };

  const c = colors[type] || colors.success;

  return (
    <div style={{
      position: "fixed",
      top: "20px",
      right: "20px",
      zIndex: 9999,
      backgroundColor: c.bg,
      border: `1px solid ${c.border}`,
      borderRadius: "12px",
      padding: "14px 18px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
      minWidth: "260px",
      maxWidth: "360px",
      animation: "slideIn 0.3s ease"
    }}>
      <span style={{ fontSize: "18px" }}>{c.icon}</span>
      <p style={{ color: c.text, fontSize: "14px", fontWeight: "500", margin: 0, flex: 1 }}>
        {message}
      </p>
      <span
        onClick={onClose}
        style={{ color: c.text, cursor: "pointer", fontSize: "16px", opacity: 0.6 }}>
        ✕
      </span>
    </div>
  );
}

export default Toast;