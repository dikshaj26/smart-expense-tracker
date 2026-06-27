function SearchFilter({ search, setSearch, filterCategory, setFilterCategory, filterType, setFilterType, categories }) {
  return (
    <div style={{
      backgroundColor: "#fff",
      borderRadius: "14px",
      padding: "16px 20px",
      border: "1px solid #CCFBF1",
      marginBottom: "20px",
      display: "flex",
      gap: "12px",
      flexWrap: "wrap",
      alignItems: "center"
    }}>

      {/* Search */}
      <input
        type="text"
        placeholder="🔍 Search transactions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          flex: 2, padding: "10px 14px",
          borderRadius: "8px", border: "1px solid #CCFBF1",
          fontSize: "14px", outline: "none",
          backgroundColor: "#F0FDFA", minWidth: "180px"
        }}
      />

      {/* Type Filter */}
      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
        style={{
          flex: 1, padding: "10px 14px",
          borderRadius: "8px", border: "1px solid #CCFBF1",
          fontSize: "14px", outline: "none",
          backgroundColor: "#F0FDFA", minWidth: "120px"
        }}>
        <option value="all">All Types</option>
        <option value="expense">Expense Only</option>
        <option value="income">Income Only</option>
      </select>

      {/* Category Filter */}
      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
        style={{
          flex: 1, padding: "10px 14px",
          borderRadius: "8px", border: "1px solid #CCFBF1",
          fontSize: "14px", outline: "none",
          backgroundColor: "#F0FDFA", minWidth: "140px"
        }}>
        <option value="all">All Categories</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      {/* Clear Button */}
      <button
        onClick={() => { setSearch(''); setFilterCategory('all'); setFilterType('all'); }}
        style={{
          padding: "10px 16px", borderRadius: "8px",
          border: "1px solid #CCFBF1", backgroundColor: "#FEF2F2",
          color: "#DC2626", cursor: "pointer", fontSize: "13px",
          fontWeight: "500"
        }}>
        ✕ Clear
      </button>

    </div>
  );
}

export default SearchFilter;