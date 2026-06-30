function Pagination({ currentPage, totalPages, onPageChange, darkMode }) {

  if (totalPages <= 1) return null;

  function getPageNumbers() {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  }

  const btnStyle = (active) => ({
    minWidth: "32px",
    height: "32px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
    backgroundColor: active ? "#0F766E" : (darkMode ? "#1E293B" : "#F0FDFA"),
    color: active ? "#fff" : (darkMode ? "#F1F5F9" : "#134e4a"),
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  });

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "6px",
      marginTop: "16px",
      flexWrap: "wrap"
    }}>

      {/* Previous */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        style={{
          ...btnStyle(false),
          opacity: currentPage === 1 ? 0.4 : 1,
          padding: "0 12px"
        }}>
        ← Prev
      </button>

      {/* Page numbers */}
      {getPageNumbers().map((page, i) => (
        page === '...' ? (
          <span key={i} style={{ color: darkMode ? "#64748B" : "#9CA3AF", fontSize: "13px" }}>...</span>
        ) : (
          <button
            key={i}
            onClick={() => onPageChange(page)}
            style={btnStyle(page === currentPage)}>
            {page}
          </button>
        )
      ))}

      {/* Next */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        style={{
          ...btnStyle(false),
          opacity: currentPage === totalPages ? 0.4 : 1,
          padding: "0 12px"
        }}>
        Next →
      </button>

    </div>
  );
}

export default Pagination;