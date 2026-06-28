import { useState } from 'react';

function RecurringExpenses({ onAdd, darkMode }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Bills');
  const [showForm, setShowForm] = useState(false);

  const categoryIcons = {
    Bills: '⚡', Food: '🍕', Transport: '🚗',
    Shopping: '🛍️', Other: '💸', Entertainment: '🎬'
  };

  const presets = [
    { name: 'Rent', amount: 8000, category: 'Bills', icon: '🏠' },
    { name: 'Netflix', amount: 649, category: 'Entertainment', icon: '🎬' },
    { name: 'Gym', amount: 1200, category: 'Other', icon: '🏋️' },
    { name: 'Internet', amount: 699, category: 'Bills', icon: '🌐' },
  ];

  function handleAdd(exp) {
    onAdd({
      id: Date.now(),
      name: exp.name,
      amount: exp.amount,
      category: exp.category,
      icon: exp.icon || categoryIcons[exp.category] || '💸',
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
      fullDate: new Date().toISOString().split('T')[0],
      type: 'expense'
    });
  }

  function handleCustomAdd() {
    if (!name || !amount) return;
    handleAdd({ name, amount: Number(amount), category, icon: categoryIcons[category] });
    setName('');
    setAmount('');
    setShowForm(false);
  }

  const cardStyle = {
    backgroundColor: darkMode ? "#1E293B" : "#fff",
    borderRadius: "14px",
    padding: "20px",
    border: darkMode ? "1px solid #334155" : "1px solid #CCFBF1",
    marginTop: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
  };

  return (
    <div className="dash-box" style={cardStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h3 style={{ color: "#0F766E", fontSize: "16px", fontWeight: "600" }}>
          🔄 Recurring Expenses
        </h3>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            backgroundColor: "#0F766E", color: "#fff",
            border: "none", borderRadius: "8px",
            padding: "6px 14px", cursor: "pointer",
            fontSize: "12px", fontWeight: "500"
          }}>
          + Custom
        </button>
      </div>

      {/* Preset quick add */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "14px" }}>
        {presets.map((preset, i) => (
          <div key={i} style={{
            backgroundColor: darkMode ? "#0F172A" : "#F0FDFA",
            borderRadius: "10px",
            padding: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: darkMode ? "1px solid #334155" : "1px solid #CCFBF1"
          }}>
            <div>
              <p style={{ fontSize: "13px", fontWeight: "500", color: darkMode ? "#F1F5F9" : "#134e4a" }}>
                {preset.icon} {preset.name}
              </p>
              <p style={{ fontSize: "11px", color: "#6b7280" }}>
                ₹{preset.amount}/month
              </p>
            </div>
            <button
              onClick={() => handleAdd(preset)}
              style={{
                backgroundColor: "#0F766E", color: "#fff",
                border: "none", borderRadius: "6px",
                padding: "4px 10px", cursor: "pointer",
                fontSize: "11px", fontWeight: "500"
              }}>
              + Add
            </button>
          </div>
        ))}
      </div>

      {/* Custom Form */}
      {showForm && (
        <div style={{
          backgroundColor: darkMode ? "#0F172A" : "#F0FDFA",
          borderRadius: "10px",
          padding: "14px",
          border: darkMode ? "1px solid #334155" : "1px solid #CCFBF1"
        }}>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <input
              type="text"
              placeholder="Expense name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                flex: 2, padding: "8px 12px",
                borderRadius: "8px",
                border: darkMode ? "1px solid #334155" : "1px solid #CCFBF1",
                fontSize: "13px", outline: "none",
                backgroundColor: darkMode ? "#1E293B" : "#fff",
                color: darkMode ? "#F1F5F9" : "#134e4a",
                minWidth: "120px"
              }}
            />
            <input
              type="number"
              placeholder="Amount..."
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{
                flex: 1, padding: "8px 12px",
                borderRadius: "8px",
                border: darkMode ? "1px solid #334155" : "1px solid #CCFBF1",
                fontSize: "13px", outline: "none",
                backgroundColor: darkMode ? "#1E293B" : "#fff",
                color: darkMode ? "#F1F5F9" : "#134e4a",
                minWidth: "80px"
              }}
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                flex: 1, padding: "8px 12px",
                borderRadius: "8px",
                border: darkMode ? "1px solid #334155" : "1px solid #CCFBF1",
                fontSize: "13px", outline: "none",
                backgroundColor: darkMode ? "#1E293B" : "#fff",
                color: darkMode ? "#F1F5F9" : "#134e4a",
                minWidth: "100px"
              }}>
              <option>Bills</option>
              <option>Food</option>
              <option>Transport</option>
              <option>Entertainment</option>
              <option>Other</option>
            </select>
            <button
              onClick={handleCustomAdd}
              style={{
                padding: "8px 16px",
                backgroundColor: "#0F766E", color: "#fff",
                border: "none", borderRadius: "8px",
                cursor: "pointer", fontWeight: "600", fontSize: "13px"
              }}>
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecurringExpenses;