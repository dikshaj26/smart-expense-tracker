import { useState } from 'react';

function AddExpenseForm({ onAdd, onClose, customCategories }) {

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [type, setType] = useState('expense');
  const [newCategory, setNewCategory] = useState('');
  const [showNewCategory, setShowNewCategory] = useState(false);

  const defaultCategories = ['Food', 'Transport', 'Bills', 'Shopping', 'Other'];
  const allCategories = [...defaultCategories, ...customCategories];

  const categoryIcons = {
    Food: '🍕', Transport: '🚗', Bills: '⚡',
    Shopping: '🛍️', Other: '💸', Salary: '💰',
    Freelance: '💻', Medical: '💊', Gym: '🏋️',
    Education: '📚', Entertainment: '🎬'
  };

  function handleSubmit() {
    if (!name || !amount) {
      alert('Naam aur amount bharo!');
      return;
    }
    const newExpense = {
      id: Date.now(),
      name,
      amount: Number(amount),
      category,
      icon: categoryIcons[category] || '💸',
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
      type
    };
    onAdd(newExpense);
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
        boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
        maxHeight: "90vh", overflowY: "auto"
      }}>
        <h2 style={{ color: "#0F766E", marginBottom: "20px", fontSize: "18px" }}>
          Add Transaction
        </h2>

        {/* Type Toggle — Expense ya Income */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
          <button
            onClick={() => setType('expense')}
            style={{
              flex: 1, padding: "10px", borderRadius: "8px", cursor: "pointer",
              border: "none", fontWeight: "600", fontSize: "14px",
              backgroundColor: type === 'expense' ? '#DC2626' : '#F0FDFA',
              color: type === 'expense' ? '#fff' : '#6b7280'
            }}>
            💸 Expense
          </button>
          <button
            onClick={() => { setType('income'); setCategory('Salary'); }}
            style={{
              flex: 1, padding: "10px", borderRadius: "8px", cursor: "pointer",
              border: "none", fontWeight: "600", fontSize: "14px",
              backgroundColor: type === 'income' ? '#16A34A' : '#F0FDFA',
              color: type === 'income' ? '#fff' : '#6b7280'
            }}>
            💰 Income
          </button>
        </div>

        {/* Name */}
        <label style={{ fontSize: "12px", color: "#6b7280", display: "block", marginBottom: "6px" }}>
          {type === 'income' ? 'Income Source' : 'Expense Name'}
        </label>
        <input
          type="text"
          placeholder={type === 'income' ? 'e.g. Salary, Freelance...' : 'e.g. Dominos, Uber...'}
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
          placeholder="e.g. 450"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={inputStyle}
        />

        {/* Category */}
        {type === 'expense' && (
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

            {/* Add Custom Category */}
            {!showNewCategory ? (
              <p
                onClick={() => setShowNewCategory(true)}
                style={{ color: "#0F766E", fontSize: "12px", cursor: "pointer", marginBottom: "14px" }}>
                + Add custom category
              </p>
            ) : (
              <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
                <input
                  type="text"
                  placeholder="e.g. Gym, Medical..."
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  style={{ ...inputStyle, marginBottom: 0, flex: 1 }}
                />
                <button
                  onClick={() => {
                    if (newCategory.trim()) {
                      onAdd({ type: 'newCategory', name: newCategory.trim() });
                      setCategory(newCategory.trim());
                      setNewCategory('');
                      setShowNewCategory(false);
                    }
                  }}
                  style={{
                    padding: "10px 14px", backgroundColor: "#0F766E",
                    color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer"
                  }}>
                  Add
                </button>
              </div>
            )}
          </>
        )}

        {/* Income category */}
        {type === 'income' && (
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
          <button onClick={handleSubmit} style={{
            flex: 1, padding: "10px", borderRadius: "8px", border: "none",
            backgroundColor: type === 'income' ? '#16A34A' : '#0F766E',
            color: "#fff", cursor: "pointer", fontSize: "14px", fontWeight: "600"
          }}>
            Add {type === 'income' ? 'Income' : 'Expense'}
          </button>
        </div>

      </div>
    </div>
  );
}

export default AddExpenseForm;