import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import SummaryCard from './components/SummaryCard';
import ExpenseList from './components/ExpenseList';
import AddExpenseForm from './components/AddExpenseForm';
import EditExpenseForm from './components/EditExpenseForm';
import ExpenseCharts from './components/ExpenseCharts';
import SearchFilter from './components/SearchFilter';
import BudgetManager from './components/BudgetManager';
import SavingsGoal from './components/SavingsGoal';
import MonthSelector from './components/MonthSelector';
import AIInsights from './components/AIInsights';

const initialExpenses = [
  { id: 1, name: "Dominos", category: "Food", amount: 450, date: "27 Jun", icon: "🍕", type: "expense", fullDate: "2025-06-27" },
  { id: 2, name: "Uber", category: "Transport", amount: 180, date: "26 Jun", icon: "🚗", type: "expense", fullDate: "2025-06-26" },
  { id: 3, name: "Electricity Bill", category: "Bills", amount: 800, date: "20 Jun", icon: "⚡", type: "expense", fullDate: "2025-06-20" },
  { id: 4, name: "Salary", category: "Salary", amount: 20000, date: "1 Jun", icon: "💰", type: "income", fullDate: "2025-06-01" },
  { id: 5, name: "Zomato", category: "Food", amount: 320, date: "25 May", icon: "🍕", type: "expense", fullDate: "2025-05-25" },
  { id: 6, name: "Petrol", category: "Transport", amount: 500, date: "20 May", icon: "🚗", type: "expense", fullDate: "2025-05-20" },
  { id: 7, name: "Salary", category: "Salary", amount: 20000, date: "1 May", icon: "💰", type: "income", fullDate: "2025-05-01" },
  { id: 8, name: "Netflix", category: "Entertainment", amount: 649, date: "15 Apr", icon: "🎬", type: "expense", fullDate: "2025-04-15" },
  { id: 9, name: "Salary", category: "Salary", amount: 20000, date: "1 Apr", icon: "💰", type: "income", fullDate: "2025-04-01" },
];

function App() {
  const [showForm, setShowForm] = useState(false);
  const [editExpense, setEditExpense] = useState(null);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : initialExpenses;
  });

  const [customCategories, setCustomCategories] = useState(() => {
    const saved = localStorage.getItem('customCategories');
    return saved ? JSON.parse(saved) : [];
  });

  const [budgets, setBudgets] = useState(() => {
    const saved = localStorage.getItem('budgets');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('customCategories', JSON.stringify(customCategories));
  }, [customCategories]);

  useEffect(() => {
    localStorage.setItem('budgets', JSON.stringify(budgets));
  }, [budgets]);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  function handleAdd(data) {
    if (data.type === 'newCategory') {
      setCustomCategories([...customCategories, data.name]);
      return;
    }
    const withDate = { ...data, fullDate: new Date().toISOString().split('T')[0] };
    setExpenses([withDate, ...expenses]);
  }

  function handleDelete(id) {
    setExpenses(expenses.filter(e => e.id !== id));
  }

  function handleEdit(updated) {
    setExpenses(expenses.map(e => e.id === updated.id ? updated : e));
  }

  function handleSaveBudget(category, amount) {
    setBudgets({ ...budgets, [category]: amount });
  }

  // CSV Export
  function handleExportCSV() {
    const headers = ['Name', 'Category', 'Amount', 'Type', 'Date'];
    const rows = expenses.map(e => [e.name, e.category, e.amount, e.type, e.date]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'expenses.csv';
    a.click();
  }

  const allCategories = ['Food', 'Transport', 'Bills', 'Shopping', 'Other', ...customCategories];

  // Month filter
  const monthFiltered = selectedMonth === 'all' ? expenses : expenses.filter(e => {
    const d = e.fullDate || '';
    return d.startsWith(selectedMonth);
  });

  // Search + category + type filter
  const filteredExpenses = monthFiltered.filter(e => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = filterCategory === 'all' || e.category === filterCategory;
    const matchType = filterType === 'all' || e.type === filterType;
    return matchSearch && matchCategory && matchType;
  });

  const totalSpent = monthFiltered
    .filter(e => e.type === 'expense')
    .reduce((sum, e) => sum + e.amount, 0);

  const totalIncome = monthFiltered
    .filter(e => e.type === 'income')
    .reduce((sum, e) => sum + e.amount, 0);

  const cardBg = darkMode ? "#1E293B" : null;
  const cardBorder = darkMode ? "#334155" : null;

  return (
    <div className="app">
      <Navbar
        onAddClick={() => setShowForm(true)}
        darkMode={darkMode}
        onToggleDark={() => setDarkMode(!darkMode)}
        onExportCSV={handleExportCSV}
      />
      <div className="dashboard">

        {/* Month Selector */}
        <MonthSelector
          selectedMonth={selectedMonth}
          onSelectMonth={setSelectedMonth}
          expenses={expenses}
          darkMode={darkMode}
        />

        {/* Summary Cards */}
        <div className="cards-grid">
          <SummaryCard
            title="Total Spent"
            amount={`₹${totalSpent.toLocaleString()}`}
            note="↑ 8% vs last month"
            color="#DC2626"
            bg={darkMode ? "#1E293B" : "#CCFBF1"}
          />
          <SummaryCard
            title="Total Income"
            amount={`₹${totalIncome.toLocaleString()}`}
            note="💰 This month"
            color="#16A34A"
            bg={darkMode ? "#1E293B" : "#F0FDF4"}
          />
          <SummaryCard
            title="Net Savings"
            amount={`₹${(totalIncome - totalSpent).toLocaleString()}`}
            note={totalIncome - totalSpent >= 0 ? "✓ Saving!" : "⚠️ Overspent!"}
            color={totalIncome - totalSpent >= 0 ? "#16A34A" : "#DC2626"}
            bg={darkMode ? "#1E293B" : "#FFF7ED"}
          />
        </div>

        {/* Savings Goal */}
        <SavingsGoal
          totalIncome={totalIncome}
          totalSpent={totalSpent}
          darkMode={darkMode}
        />
        
        {/* AI Insights */}
<AIInsights
  expenses={expenses}
  budgets={budgets}
/>

        {/* Charts */}
        <ExpenseCharts expenses={monthFiltered} />

        {/* Budget Manager */}
        <BudgetManager
          expenses={monthFiltered}
          budgets={budgets}
          onSaveBudget={handleSaveBudget}
          customCategories={customCategories}
        />

        {/* Search + Filter */}
        <SearchFilter
          search={search}
          setSearch={setSearch}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          filterType={filterType}
          setFilterType={setFilterType}
          categories={allCategories}
        />

        {/* Expense List */}
        <ExpenseList
          expenses={filteredExpenses}
          onDelete={handleDelete}
          onEdit={(exp) => setEditExpense(exp)}
        />

      </div>

      {showForm && (
        <AddExpenseForm
          onAdd={handleAdd}
          onClose={() => setShowForm(false)}
          customCategories={customCategories}
        />
      )}

      {editExpense && (
        <EditExpenseForm
          expense={editExpense}
          onSave={handleEdit}
          onClose={() => setEditExpense(null)}
          customCategories={customCategories}
        />
      )}

    </div>
  );
}

export default App;