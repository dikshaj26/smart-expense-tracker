import { useState } from 'react';

function SavingsGoal({ totalIncome, totalSpent, darkMode }) {
  const [goal, setGoal] = useState(() => {
    return Number(localStorage.getItem('savingsGoal')) || 0;
  });
  const [inputGoal, setInputGoal] = useState('');

  const currentSavings = totalIncome - totalSpent;
  const percent = goal > 0 ? Math.min((currentSavings / goal) * 100, 100) : 0;

  function handleSaveGoal() {
    if (!inputGoal) return;
    const g = Number(inputGoal);
    setGoal(g);
    localStorage.setItem('savingsGoal', g);
    setInputGoal('');
  }

  function getColor() {
    if (percent >= 100) return '#16A34A';
    if (percent >= 50) return '#0F766E';
    return '#EA580C';
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
    <div style={cardStyle}>
      <h3 style={{ color: "#0F766E", marginBottom: "16px", fontSize: "16px", fontWeight: "600" }}>
        🏆 Savings Goal
      </h3>

      {/* Current Savings */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
        <span style={{ fontSize: "13px", color: darkMode ? "#9CA3AF" : "#6b7280" }}>
          Current Savings
        </span>
        <span style={{ fontSize: "13px", fontWeight: "600", color: currentSavings >= 0 ? "#16A34A" : "#DC2626" }}>
          ₹{currentSavings.toLocaleString()}
        </span>
      </div>

      {/* Goal */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
        <span style={{ fontSize: "13px", color: darkMode ? "#9CA3AF" : "#6b7280" }}>
          Target Goal
        </span>
        <span style={{ fontSize: "13px", fontWeight: "600", color: "#0F766E" }}>
          ₹{goal > 0 ? goal.toLocaleString() : 'Not set'}
        </span>
      </div>

      {/* Progress Bar */}
      {goal > 0 && (
        <>
          <div style={{ height: "10px", backgroundColor: darkMode ? "#334155" : "#F0FDFA", borderRadius: "5px", marginBottom: "8px", overflow: "hidden" }}>
            <div style={{
              height: "100%",
              width: `${percent}%`,
              backgroundColor: getColor(),
              borderRadius: "5px",
              transition: "width 0.5s ease"
            }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
            <span style={{ fontSize: "12px", color: darkMode ? "#9CA3AF" : "#6b7280" }}>
              {percent.toFixed(1)}% achieved
            </span>
            {percent >= 100 && (
              <span style={{ fontSize: "12px", color: "#16A34A", fontWeight: "600" }}>
                🎉 Goal Achieved!
              </span>
            )}
            {percent < 100 && goal > 0 && (
              <span style={{ fontSize: "12px", color: "#EA580C" }}>
                ₹{(goal - currentSavings).toLocaleString()} more needed
              </span>
            )}
          </div>
        </>
      )}

      {/* Set Goal Input */}
      <div style={{ display: "flex", gap: "8px" }}>
        <input
          type="number"
          placeholder="Set savings goal..."
          value={inputGoal}
          onChange={(e) => setInputGoal(e.target.value)}
          style={{
            flex: 1, padding: "10px 14px",
            borderRadius: "8px",
            border: darkMode ? "1px solid #334155" : "1px solid #CCFBF1",
            fontSize: "14px", outline: "none",
            backgroundColor: darkMode ? "#0F172A" : "#F0FDFA",
            color: darkMode ? "#F9FAFB" : "#134e4a"
          }}
        />
        <button
          onClick={handleSaveGoal}
          style={{
            padding: "10px 18px",
            backgroundColor: "#0F766E",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "14px"
          }}>
          Set
        </button>
      </div>
    </div>
  );
}

export default SavingsGoal;