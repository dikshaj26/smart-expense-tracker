function Navbar({ onAddClick, darkMode, onToggleDark, onExportCSV }) {
  return (
    <nav style={{
      backgroundColor: darkMode ? "#1E293B" : "#0F766E",
      padding: "16px 24px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 2px 8px rgba(15,118,110,0.3)"
    }}>
      <h1 style={{ color: "#fff", fontSize: "20px", fontWeight: "600" }}>
        💰 Smart Expense Tracker
      </h1>

      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>

        {/* Dark Mode Toggle */}
        <button
          onClick={onToggleDark}
          style={{
            backgroundColor: "rgba(255,255,255,0.15)",
            color: "white",
            border: "1px solid rgba(255,255,255,0.3)",
            padding: "8px 14px",
            borderRadius: "20px",
            cursor: "pointer",
            fontSize: "14px"
          }}>
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        {/* CSV Export */}
        <button
          onClick={onExportCSV}
          style={{
            backgroundColor: "rgba(255,255,255,0.15)",
            color: "white",
            border: "1px solid rgba(255,255,255,0.3)",
            padding: "8px 14px",
            borderRadius: "20px",
            cursor: "pointer",
            fontSize: "14px"
          }}>
          📥 Export CSV
        </button>

        {/* Add Expense */}
        <button
          onClick={onAddClick}
          style={{
            backgroundColor: "rgba(255,255,255,0.2)",
            color: "white",
            border: "1px solid rgba(255,255,255,0.4)",
            padding: "8px 20px",
            borderRadius: "20px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500"
          }}>
          + Add Expense
        </button>

      </div>
    </nav>
  );
}

export default Navbar;