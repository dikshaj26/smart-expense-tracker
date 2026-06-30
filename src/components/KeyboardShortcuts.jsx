import { useEffect, useState } from 'react';

function KeyboardShortcuts({ onAddExpense, onToggleDark }) {
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    function handleKeyDown(e) {
      // Alt+N — New Expense
      if (e.altKey && e.key === 'n') {
        e.preventDefault();
        onAddExpense();
      }
      // Alt+D — Toggle Dark Mode
      if (e.altKey && e.key === 'd') {
        e.preventDefault();
        onToggleDark();
      }
      // ? — Show shortcuts help
      if (e.key === '?' && !e.ctrlKey && !e.altKey) {
        setShowHelp(prev => !prev);
      }
      // Escape — Close help
      if (e.key === 'Escape') {
        setShowHelp(false);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onAddExpense, onToggleDark]);

  if (!showHelp) {
    return (
      <button
        onClick={() => setShowHelp(true)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          backgroundColor: "#0F766E",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          fontSize: "18px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          zIndex: 998
        }}>
        ⌨️
      </button>
    );
  }

  return (
    <div
      onClick={() => setShowHelp(false)}
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100%", height: "100%",
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999
      }}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#fff",
          borderRadius: "16px",
          padding: "24px",
          width: "320px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
        }}>
        <h3 style={{ color: "#0F766E", marginBottom: "16px", fontSize: "16px" }}>
          ⌨️ Keyboard Shortcuts
        </h3>

        {[
          { keys: 'Alt + N', action: 'Add new expense' },
          { keys: 'Alt + D', action: 'Toggle dark mode' },
          { keys: '?', action: 'Show this help' },
          { keys: 'Esc', action: 'Close this popup' },
        ].map((s, i) => (
          <div key={i} style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 0",
            borderBottom: i < 3 ? "1px solid #F0FDFA" : "none"
          }}>
            <span style={{ fontSize: "13px", color: "#134e4a" }}>{s.action}</span>
            <kbd style={{
              backgroundColor: "#F0FDFA",
              border: "1px solid #CCFBF1",
              borderRadius: "6px",
              padding: "4px 10px",
              fontSize: "12px",
              fontWeight: "600",
              color: "#0F766E"
            }}>
              {s.keys}
            </kbd>
          </div>
        ))}

        <button
          onClick={() => setShowHelp(false)}
          style={{
            width: "100%",
            marginTop: "16px",
            padding: "10px",
            backgroundColor: "#0F766E",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600"
          }}>
          Got it!
        </button>
      </div>
    </div>
  );
}

export default KeyboardShortcuts;