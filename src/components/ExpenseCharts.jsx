import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';

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

  // Bar chart data — monthly
  const monthlyData = [
    { month: 'March', amount: 9800 },
    { month: 'April', amount: 11200 },
    { month: 'May', amount: 10500 },
    { month: 'June', amount: expenses.filter(e => e.type === 'expense').reduce((s, e) => s + e.amount, 0) },
  ];

  // Line chart data — last 7 days trend
  function getLast7DaysData() {
    const days = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayLabel = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

      const total = expenses
        .filter(e => e.type === 'expense' && e.fullDate === dateStr)
        .reduce((sum, e) => sum + e.amount, 0);

      days.push({ day: dayLabel, amount: total });
    }
    return days;
  }

  const lineData = getLast7DaysData();

  return (
    <>
      <div className="bottom-grid" style={{ marginTop: "24px" }}>

        {/* Pie Chart */}
        <div className="dash-box" style={{
          backgroundColor: "#fff",
          borderRadius: "14px",
          padding: "20px",
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
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="dash-box" style={{
          backgroundColor: "#fff",
          borderRadius: "14px",
          padding: "20px",
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

      {/* Line Chart — Full Width */}
      <div className="dash-box" style={{
        backgroundColor: "#fff",
        borderRadius: "14px",
        padding: "20px",
        border: "1px solid #CCFBF1",
        marginTop: "16px"
      }}>
        <h3 style={{ color: "#0F766E", marginBottom: "16px", fontSize: "16px", fontWeight: "600" }}>
          📈 Last 7 Days Spending Trend
        </h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0FDFA" />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#6b7280' }} />
            <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} />
            <Tooltip formatter={(value) => `₹${value}`} />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#0F766E"
              strokeWidth={3}
              dot={{ fill: '#0F766E', r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export default ExpenseCharts;