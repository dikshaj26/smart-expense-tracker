function StreakTracker({ expenses, darkMode }) {

  function getCurrentStreak() {
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const spent = expenses
        .filter(e => e.type === 'expense' && e.fullDate === dateStr)
        .reduce((sum, e) => sum + e.amount, 0);
      if (spent === 0) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  }

  const streak = getCurrentStreak();

  function getBadge() {
    if (streak >= 30) return { emoji: '👑', text: 'Legend!' };
    if (streak >= 14) return { emoji: '🏆', text: 'Champion!' };
    if (streak >= 7) return { emoji: '⭐', text: 'On Fire!' };
    if (streak >= 3) return { emoji: '💪', text: 'Going Strong!' };
    return { emoji: '🌱', text: 'Just Started' };
  }

  const badge = getBadge();

  return (
    <div className="dash-box" style={{
      backgroundColor: darkMode ? "#1E293B" : "#fff",
      borderRadius: "14px",
      padding: "24px",
      border: darkMode ? "1px solid #334155" : "1px solid #CCFBF1",
      marginTop: "20px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      textAlign: "center"
    }}>

      <h3 style={{ color: "#0F766E", fontSize: "16px", fontWeight: "600", marginBottom: "16px" }}>
        🔥 No-Spend Streak
      </h3>

      <div style={{ fontSize: "48px", marginBottom: "8px" }}>
        {streak > 0 ? '🔥' : '💤'}
      </div>

      <div style={{ fontSize: "32px", fontWeight: "700", color: streak > 0 ? "#EA580C" : "#9CA3AF", marginBottom: "4px" }}>
        {streak} {streak === 1 ? 'Day' : 'Days'}
      </div>

      <div style={{
        display: "inline-block",
        backgroundColor: darkMode ? "#334155" : "#F0FDFA",
        padding: "4px 14px",
        borderRadius: "20px",
        fontSize: "13px",
        fontWeight: "600",
        color: "#0F766E",
        marginBottom: "12px"
      }}>
        {badge.emoji} {badge.text}
      </div>

      <p style={{ fontSize: "12px", color: "#6b7280" }}>
        {streak === 0
          ? "Don't spend today to start your streak!"
          : `You haven't spent anything for ${streak} ${streak === 1 ? 'day' : 'days'} straight. Keep it up!`}
      </p>

    </div>
  );
}

export default StreakTracker;