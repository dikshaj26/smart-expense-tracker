function ExpenseList({ expenses, onDelete, onEdit }) {
  return (
    <div style={{
      backgroundColor: "#fff",
      borderRadius: "14px",
      padding: "20px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      border: "1px solid #CCFBF1",
      marginTop: "24px"
    }}>
      <h3 style={{ color: "#0F766E", marginBottom: "16px", fontSize: "16px", fontWeight: "600" }}>
        Recent Transactions
      </h3>

      {expenses.length === 0 && (
        <p style={{ color: "#9CA3AF", textAlign: "center", padding: "20px" }}>
          No transactions found for the selected period.
        </p>
      )}

      {expenses.map((exp) => (
        <div key={exp.id} style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 0",
          borderBottom: "1px solid #F0FDFA"
        }}>

          {/* Left */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: "38px", height: "38px", borderRadius: "10px",
              backgroundColor: exp.type === 'income' ? '#F0FDF4' : '#CCFBF1',
              display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: "18px"
            }}>
              {exp.icon}
            </div>
            <div>
              <p style={{ color: "#134e4a", fontSize: "14px", fontWeight: "500" }}>
                {exp.name}
              </p>
              <p style={{ color: "#9CA3AF", fontSize: "12px" }}>
                {exp.category} • {exp.date}
              </p>
            </div>
          </div>

          {/* Right */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{
              color: exp.type === 'income' ? '#16A34A' : '#DC2626',
              fontWeight: "600", fontSize: "14px"
            }}>
              {exp.type === 'income' ? '+' : '-'}₹{exp.amount}
            </span>

            {/* Edit Button */}
            <button
              onClick={() => onEdit(exp)}
              style={{
                backgroundColor: "#F0FDFA",
                color: "#0F766E",
                border: "1px solid #CCFBF1",
                borderRadius: "6px",
                padding: "4px 10px",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: "500"
              }}>
              ✏️ Edit
            </button>

            {/* Delete Button */}
            <button
              onClick={() => onDelete(exp.id)}
              style={{
                backgroundColor: "#FEF2F2",
                color: "#DC2626",
                border: "1px solid #FECACA",
                borderRadius: "6px",
                padding: "4px 10px",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: "500"
              }}>
              🗑️ Delete
            </button>
          </div>

        </div>
      ))}
    </div>
  );
}

export default ExpenseList;