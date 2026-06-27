import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#0F766E', '#16A34A', '#EA580C', '#6366F1', '#DC2626'];

function ExpenseCharts({ expenses }) {

  // Pie chart data — category wise
  const categoryData = expenses
    .filter(e => e.type === 'expense')
    .reduce((acc, e) => {
      const found = acc.find(x => x.name === e.category);
      if (found) found.value += e.amount;
      else acc.push({ name: e.category, value: e.amount });
      return acc;
    }, []);

  // Bar chart data — last 4 months (sample)
  const monthlyData = [
    { month: 'March', amount: 9800 },
    { month: 'April', amount: 11200 },
    { month: 'May', amount: 10500 },
    { month: 'June', amount: expenses.filter(e => e.type === 'expense').reduce((s, e) => s + e.amount, 0) },
  ];

  return (
    <div className="bottom-grid" style={{ marginTop: "24px" }}>

      {/* Pie Chart */}
      <div style={{
        backgroundColor: "#fff",
        borderRadius: "14px",
        padding: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        border: "1px solid #CCFBF1"
      }}>
        <h3 style={{ color: "#0F766E", marginBottom: "16px", fontSize: "16px", fontWeight: "600" }}>
          Spending by Category
        </h3>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={4}
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `₹${value}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div style={{
        backgroundColor: "#fff",
        borderRadius: "14px",
        padding: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        border: "1px solid #CCFBF1"
      }}>
        <h3 style={{ color: "#0F766E", marginBottom: "16px", fontSize: "16px", fontWeight: "600" }}>
          Monthly Spending
        </h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={monthlyData}>
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6b7280' }} />
            <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} />
            <Tooltip formatter={(value) => `₹${value}`} />
            <Bar dataKey="amount" fill="#0F766E" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default ExpenseCharts;