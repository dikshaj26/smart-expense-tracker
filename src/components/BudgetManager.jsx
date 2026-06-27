function BudgetManager({ expenses, budgets, onSaveBudget, customCategories }) {

  const defaultCategories = ['Food', 'Transport', 'Bills', 'Shopping', 'Other'];
  const categories = [...defaultCategories, ...customCategories];

  function getSpent(category) {
    return expenses
      .filter(e => e.type === 'expense' && e.category === category)
      .reduce((sum, e) => sum + e.amount, 0);
  }

  function getPercent(category) {
    if (!budgets[category]) return 0;
    return Math.min((getSpent(category) / budgets[category]) * 100, 100);
  }

  function getColor(percent) {
    if (percent >= 100) return '#DC2626';
    if (percent >= 80) return '#EA580C';
    return '#16A34A';
  }

  return (
    <div style={{
      backgroundColor: "#fff",
      borderRadius: "14px",
      padding: "20px",
      border: "1px solid #CCFBF1",
      marginTop: "20px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
    }}>
      <h3 style={{ color: "#0F766E", marginBottom: "20px", fontSize: "16px", fontWeight: "600" }}>
        🎯 Budget Manager
      </h3>

      {categories.map(cat => {
        const spent = getSpent(cat);
        const budget = budgets[cat] || 0;
        const percent = getPercent(cat);
        const color = getColor(percent);

        return (
          <div key={cat} style={{ marginBottom: "20px" }}>

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontSize: "14px", fontWeight: "500", color: "#134e4a" }}>
                {cat}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {percent >= 100 && (
                  <span style={{ fontSize: "11px", backgroundColor: "#FEF2F2", color: "#DC2626", padding: "2px 8px", borderRadius: "10px", fontWeight: "600" }}>
                    ⚠️ No Budget Left!
                  </span>
                )}
                {percent >= 80 && percent < 100 && (
                  <span style={{ fontSize: "11px", backgroundColor: "#FFF7ED", color: "#EA580C", padding: "2px 8px", borderRadius: "10px", fontWeight: "600" }}>
                    ⚡ Almost Full!
                  </span>
                )}
                <span style={{ fontSize: "12px", color: "#6b7280" }}>
                  ₹{spent} / {budget ? `₹${budget}` : 'No limit set'}
                </span>
              </div>
            </div>

            <div style={{ height: "8px", backgroundColor: "#F0FDFA", borderRadius: "4px", marginBottom: "8px", overflow: "hidden" }}>
              <div style={{
                height: "100%",
                width: `${percent}%`,
                backgroundColor: color,
                borderRadius: "4px",
                transition: "width 0.3s ease"
              }} />
            </div>

            <input
              type="number"
              placeholder={`Set ${cat} budget...`}
              defaultValue={budget || ''}
              onBlur={(e) => onSaveBudget(cat, Number(e.target.value))}
              style={{
                width: "100%", padding: "8px 12px",
                borderRadius: "8px", border: "1px solid #CCFBF1",
                fontSize: "13px", outline: "none",
                backgroundColor: "#F0FDFA"
              }}
            />

          </div>
        );
      })}

    </div>
  );
}

export default BudgetManager;