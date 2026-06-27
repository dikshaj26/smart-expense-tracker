function SummaryCard({ title, amount, note, color, bg }) {
  return (
    <div style={{
      backgroundColor: bg,
      borderRadius: "14px",
      padding: "20px 24px",
      flex: 1,
      borderLeft: `4px solid ${color}`,
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
    }}>
      <p style={{
        color: "#6b7280",
        fontSize: "12px",
        marginBottom: "8px",
        textTransform: "uppercase",
        letterSpacing: "0.5px"
      }}>
        {title}
      </p>
      <h2 style={{
        color: "#134e4a",
        fontSize: "26px",
        fontWeight: "700",
        marginBottom: "6px"
      }}>
        {amount}
      </h2>
      <p style={{
        color: color,
        fontSize: "12px",
        fontWeight: "500"
      }}>
        {note}
      </p>
    </div>
  );
}

export default SummaryCard;