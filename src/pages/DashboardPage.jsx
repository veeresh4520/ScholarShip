import { useState } from "react";
import StatusBadge from "../components/StatusBadge";

function DashboardPage({ applications }) {
  const [filter, setFilter] = useState("all");

  function getOverallStatus(app) {
    if (app.departmentStatus === "rejected" || app.financeStatus === "rejected" || app.principalStatus === "rejected") {
      return "rejected";
    }
    if (app.principalStatus === "approved") return "approved";
    return "pending";
  }

  const filtered = applications.filter((app) => {
    if (filter === "all") return true;
    return getOverallStatus(app) === filter;
  });

  const counts = {
    all: applications.length,
    pending: applications.filter((a) => getOverallStatus(a) === "pending").length,
    approved: applications.filter((a) => getOverallStatus(a) === "approved").length,
    rejected: applications.filter((a) => getOverallStatus(a) === "rejected").length,
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Admin Dashboard</h1>
      <p style={styles.sub}>All submitted scholarship applications.</p>

      <div style={styles.filterRow}>
        {["all", "pending", "approved", "rejected"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              ...styles.filterBtn,
              backgroundColor: filter === f ? "#1e40af" : "#f3f4f6",
              color: filter === f ? "white" : "#374151",
            }}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)} ({counts[f]})
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p style={styles.empty}>No applications found.</p>
      )}

      <table style={styles.table}>
        {filtered.length > 0 && (
          <thead>
            <tr style={styles.thead}>
              <th style={styles.th}>Student</th>
              <th style={styles.th}>Scholarship</th>
              <th style={styles.th}>Submitted</th>
              <th style={styles.th}>Dept</th>
              <th style={styles.th}>Finance</th>
              <th style={styles.th}>Principal</th>
              <th style={styles.th}>Overall</th>
            </tr>
          </thead>
        )}
        <tbody>
          {filtered.map((app) => (
            <tr key={app.id} style={styles.tr}>
              <td style={styles.td}><strong>{app.studentName}</strong></td>
              <td style={styles.td}>{app.scholarshipName}</td>
              <td style={styles.td}>{app.submittedAt}</td>
              <td style={styles.td}><StatusBadge status={app.departmentStatus} /></td>
              <td style={styles.td}><StatusBadge status={app.financeStatus} /></td>
              <td style={styles.td}><StatusBadge status={app.principalStatus} /></td>
              <td style={styles.td}><StatusBadge status={getOverallStatus(app)} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  page: { padding: "40px 32px" },
  heading: { fontSize: "26px", marginBottom: "8px" },
  sub: { color: "#6b7280", marginBottom: "28px" },
  filterRow: { display: "flex", gap: "12px", marginBottom: "28px", flexWrap: "wrap" },
  filterBtn: {
    padding: "8px 18px", borderRadius: "8px", border: "none",
    cursor: "pointer", fontWeight: "600", fontSize: "14px",
  },
  empty: { color: "#9ca3af" },
  table: { width: "100%", borderCollapse: "collapse", backgroundColor: "white", borderRadius: "12px", overflow: "hidden" },
  thead: { backgroundColor: "#f9fafb" },
  th: { padding: "12px 16px", textAlign: "left", fontSize: "13px", color: "#6b7280", fontWeight: "600", borderBottom: "1px solid #e5e7eb" },
  tr: { borderBottom: "1px solid #f3f4f6" },
  td: { padding: "14px 16px", fontSize: "14px" },
};

export default DashboardPage;