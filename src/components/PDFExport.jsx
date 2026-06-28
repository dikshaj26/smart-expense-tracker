import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

function PDFExport({ expenses = [], totalSpent = 0, totalIncome = 0 }) {
  function generatePDF() {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(22);
    doc.setTextColor(15, 118, 110);
    doc.text('Smart Expense Tracker', 14, 20);

    // Subtitle
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.text(`Monthly Report — ${new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}`, 14, 30);

    // Summary
    doc.setFontSize(13);
    doc.setTextColor(0, 0, 0);
    doc.text('Summary', 14, 45);

    autoTable(doc, {
      startY: 50,
      head: [['Total Income', 'Total Spent', 'Net Savings']],
      body: [[
        `Rs. ${totalIncome.toLocaleString()}`,
        `Rs. ${totalSpent.toLocaleString()}`,
        `Rs. ${(totalIncome - totalSpent).toLocaleString()}`
      ]],
      headStyles: { fillColor: [15, 118, 110] },
      styles: { fontSize: 11 }
    });

    // Transactions
    doc.text('All Transactions', 14, doc.lastAutoTable.finalY + 15);

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 20,
      head: [['Name', 'Category', 'Amount', 'Type', 'Date']],
      body: expenses.map(e => [
        e.name,
        e.category,
        `Rs. ${e.amount}`,
        e.type.toUpperCase(),
        e.date
      ]),
      headStyles: { fillColor: [15, 118, 110] },
      alternateRowStyles: { fillColor: [240, 253, 250] },
      styles: { fontSize: 10 }
    });

    doc.save('expense-report.pdf');
  }

  return (
    <button
      onClick={generatePDF}
      style={{
        backgroundColor: "rgba(255,255,255,0.15)",
        color: "white",
        border: "1px solid rgba(255,255,255,0.3)",
        padding: "8px 14px",
        borderRadius: "20px",
        cursor: "pointer",
        fontSize: "14px"
      }}>
      📄 PDF
    </button>
  );
}

export default PDFExport;