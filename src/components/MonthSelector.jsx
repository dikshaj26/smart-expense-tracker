function MonthSelector({ selectedMonth, onSelectMonth, expenses, darkMode }) {

  const months = [...new Set(expenses.map(e => {
    const d = new Date(e.fullDate || Date.now());
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  }))].sort().reverse();

  const allMonths = ['2025-03', '2025-04', '2025-05', '2025-06', ...months]
    .filter((v, i, a) => a.indexOf(v) === i).sort().reverse();

  function formatMonth(ym) {
    const [y, m] = ym.split('-');
    const date = new Date(y, m - 1);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  }

  const cardStyle = {
    backgroundColor: darkMode ? "#1E293B" : "#fff",
    borderRadius: "14px",
    padding: "16px 20px",
    border: darkMode ? "1px solid #334155" : "1px solid #CCFBF1",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap"
  };

  return (
    <div style={cardStyle}>
      <span style={{ fontSize: "14px", fontWeight: "600", color: "#0F766E" }}>
        📅 Month:
      </span>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <button
          onClick={() => onSelectMonth('all')}
          style={{
            padding: "6px 14px", borderRadius: "20px", border: "none",
            cursor: "pointer", fontSize: "13px", fontWeight: "500",
            backgroundColor: selectedMonth === 'all' ? '#0F766E' : (darkMode ? '#334155' : '#F0FDFA'),
            color: selectedMonth === 'all' ? '#fff' : (darkMode ? '#F9FAFB' : '#134e4a')
          }}>
          All
        </button>
        {allMonths.map(m => (
          <button
            key={m}
            onClick={() => onSelectMonth(m)}
            style={{
              padding: "6px 14px", borderRadius: "20px", border: "none",
              cursor: "pointer", fontSize: "13px", fontWeight: "500",
              backgroundColor: selectedMonth === m ? '#0F766E' : (darkMode ? '#334155' : '#F0FDFA'),
              color: selectedMonth === m ? '#fff' : (darkMode ? '#F9FAFB' : '#134e4a')
            }}>
            {formatMonth(m)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MonthSelector;