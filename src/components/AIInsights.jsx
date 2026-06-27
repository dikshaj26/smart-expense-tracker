function AIInsights({ expenses, budgets }) {

  const insights = [];

  // Total this month vs last month
  const now = new Date();
  const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1);
  const lastMonth = `${lastMonthDate.getFullYear()}-${String(lastMonthDate.getMonth() + 1).padStart(2, '0')}`;

  const thisMonthExp = expenses
    .filter(e => e.type === 'expense' && (e.fullDate || '').startsWith(thisMonth))
    .reduce((s, e) => s + e.amount, 0);

  const lastMonthExp = expenses
    .filter(e => e.type === 'expense' && (e.fullDate || '').startsWith(lastMonth))
    .reduce((s, e) => s + e.amount, 0);

  // Insight 1 — Month comparison
  if (lastMonthExp > 0) {
    const diff = thisMonthExp - lastMonthExp;
    const percent = Math.abs(Math.round((diff / lastMonthExp) * 100));
    if (diff > 0) {
      insights.push({
        type: 'warning',
        icon: '📈',
        text: `Spending is ${percent}% higher this month compared to last month. (₹${diff.toLocaleString()} more)`
      });
    } else if (diff < 0) {
      insights.push({
        type: 'success',
        icon: '📉',
        text: `Great job! Spending is ${percent}% lower this month compared to last month. (₹${Math.abs(diff).toLocaleString()} saved)`
      });
    }
  }

  // Insight 2 — Budget alerts per category
  const categories = ['Food', 'Transport', 'Bills', 'Shopping', 'Other'];
  categories.forEach(cat => {
    if (!budgets[cat]) return;
    const spent = expenses
      .filter(e => e.type === 'expense' && e.category === cat && (e.fullDate || '').startsWith(thisMonth))
      .reduce((s, e) => s + e.amount, 0);
    const percent = (spent / budgets[cat]) * 100;
    if (percent >= 100) {
      insights.push({
        type: 'danger',
        icon: '🚨',
        text: `${cat} budget is fully used! You have spent ₹${spent.toLocaleString()} out of ₹${budgets[cat].toLocaleString()}.`
      });
    } else if (percent >= 80) {
      insights.push({
        type: 'warning',
        icon: '⚠️',
        text: `${cat} budget is ${Math.round(percent)}% used. Only ₹${(budgets[cat] - spent).toLocaleString()} remaining.`
      });
    }
  });

  // Insight 3 — Top spending category
  const categoryTotals = {};
  expenses
    .filter(e => e.type === 'expense' && (e.fullDate || '').startsWith(thisMonth))
    .forEach(e => {
      categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
    });

  const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];
  if (topCategory) {
    insights.push({
      type: 'info',
      icon: '🏆',
      text: `Your highest spending this month is on ${topCategory[0]} — ₹${topCategory[1].toLocaleString()}.`
    });
  }

  // Insight 4 — Savings check
  const thisMonthIncome = expenses
    .filter(e => e.type === 'income' && (e.fullDate || '').startsWith(thisMonth))
    .reduce((s, e) => s + e.amount, 0);

  if (thisMonthIncome > 0) {
    const savings = thisMonthIncome - thisMonthExp;
    const savingPercent = Math.round((savings / thisMonthIncome) * 100);
    if (savingPercent >= 30) {
      insights.push({
        type: 'success',
        icon: '💚',
        text: `Excellent! You are saving ${savingPercent}% of your income this month. Keep it up!`
      });
    } else if (savingPercent > 0) {
      insights.push({
        type: 'info',
        icon: '💡',
        text: `You are saving ${savingPercent}% of your income. Try to save at least 30% for better financial health.`
      });
    } else {
      insights.push({
        type: 'danger',
        icon: '🔴',
        text: `You have overspent your income this month by ₹${Math.abs(savings).toLocaleString()}. Try to cut expenses.`
      });
    }
  }

  // Insight 5 — No data
  if (insights.length === 0) {
    insights.push({
      type: 'info',
      icon: '📊',
      text: 'Add more transactions to get smart spending insights!'
    });
  }

  const colors = {
    success: { bg: '#F0FDF4', border: '#16A34A', text: '#166534' },
    warning: { bg: '#FFF7ED', border: '#EA580C', text: '#9A3412' },
    danger: { bg: '#FEF2F2', border: '#DC2626', text: '#991B1B' },
    info: { bg: '#EFF6FF', border: '#2563EB', text: '#1e40af' },
  };

  return (
    <div className="dash-box" style={{
      backgroundColor: "#fff",
      borderRadius: "14px",
      padding: "20px",
      border: "1px solid #CCFBF1",
      marginTop: "20px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
    }}>
      <h3 style={{ color: "#0F766E", marginBottom: "16px", fontSize: "16px", fontWeight: "600" }}>
        🤖 AI Smart Insights
      </h3>

      {insights.map((insight, i) => (
        <div key={i} style={{
          backgroundColor: colors[insight.type].bg,
          border: `1px solid ${colors[insight.type].border}`,
          borderRadius: "10px",
          padding: "12px 16px",
          marginBottom: "10px",
          display: "flex",
          alignItems: "flex-start",
          gap: "10px"
        }}>
          <span style={{ fontSize: "18px" }}>{insight.icon}</span>
          <p style={{
            color: colors[insight.type].text,
            fontSize: "13px",
            lineHeight: "1.5",
            margin: 0
          }}>
            {insight.text}
          </p>
        </div>
      ))}

    </div>
  );
}

export default AIInsights;