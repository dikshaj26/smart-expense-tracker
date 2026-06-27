import { useState } from 'react';

function EditExpenseForm({ expense, onSave, onClose, customCategories }) {

  const [name, setName] = useState(expense.name);
  const [amount, setAmount] = useState(expense.amount);
  const [category, setCategory] = useState(expense.category);

  const defaultCategories = ['Food', 'Transport', 'Bills', 'Shopping', 'Other'];
  const allCategories = [...defaultCategories, ...customCategories];

  const categoryIcons = {
    Food: '🍕', Transport: '🚗', Bills: '⚡',
    Shopping: '🛍️', Other: '💸', Salary: '💰',
    Freelance: '💻', Medical: '💊', Gym: '🏋️',
    Education: '📚', Entertainment: '🎬'
  };

  function handleSave() {
    if (!name || !amount) {
      alert('Naam aur amount bharo!');
      return;
    }
    const updated = {
      ...expense,
      name,
      amount: Number(amount),
      category,
      icon: categoryIcons[category] || '💸'
    };
    onSave(updated);
    onClose();
  }

  const inputStyle = {
    width: "100%", padding: "10px 14px",
    borderRadius: "8px", border: "1px solid #CCFBF1",
    fontSize: "14px", outline: "none",
    backgroundColor: "#F0FDFA", marginBottom: "14px"
  };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0,
      width: "100%", height: "100%",
      backgroundColor: "rgba(0,0,0,0.4)",
      display: "flex", justifyContent: "center",
      alignItems: "center", zIndex: 1000
    }}>
      <div style={{
        backgroundColor: "#fff", borderRadius: "16px",
        padding: "28px", width: "420px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
      }}>
        <h2 style={{ color: "#0F766E", marginBottom: "20px", fontSize: "18px" }}>
          ✏️ Edit Transaction
        </h2>

        {/* Name */}
        <label style={{ fontSize: "12px", color: "#6b7280", display: "block", marginBottom: "6px" }}>
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        {/* Amount */}
        <label style={{ fontSize: "12px", color: "#6b7280", display: "block", marginBottom: "6px" }}>
          Amount (₹)
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={inputStyle}
        />

        {/* Category */}
        {expense.type === 'expense' && (
          <>
            <label style={{ fontSize: "12px", color: "#6b7280", display: "block", marginBottom: "6px" }}>
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={inputStyle}>
              {allCategories.map(cat => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </>
        )}

        {expense.type === 'income' && (
          <>
            <label style={{ fontSize: "12px", color: "#6b7280", display: "block", marginBottom: "6px" }}>
              Income Type
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={inputStyle}>
              <option>Salary</option>
              <option>Freelance</option>
              <option>Business</option>
              <option>Other Income</option>
            </select>
          </>
        )}

        {/* Buttons */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={onClose} style={{
            flex: 1, padding: "10px", borderRadius: "8px",
            border: "1px solid #CCFBF1", backgroundColor: "#fff",
            color: "#6b7280", cursor: "pointer", fontSize: "14px"
          }}>
            Cancel
          </button>
          <button onClick={handleSave} style={{
            flex: 1, padding: "10px", borderRadius: "8px", border: "none",
            backgroundColor: "#0F766E", color: "#fff",
            cursor: "pointer", fontSize: "14px", fontWeight: "600"
          }}>
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}

export default EditExpenseForm;