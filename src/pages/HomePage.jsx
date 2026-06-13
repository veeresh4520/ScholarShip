import { Link } from "react-router-dom";
import { scholarships } from "../data/scholarships";

function HomePage() {
  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <div>
          <p style={styles.kicker}>Student funding portal</p>
          <h1 style={styles.heading}>Find the right scholarship for your profile</h1>
          <p style={styles.sub}>
            Review eligibility, deadlines, award amounts, and required documents before applying.
          </p>
        </div>
        <div style={styles.summary}>
          <strong style={styles.summaryNumber}>{scholarships.length}</strong>
          <span style={styles.summaryLabel}>active scholarship programs</span>
        </div>
      </section>

      <div style={styles.grid}>
        {scholarships.map((s) => (
          <div key={s.id} style={styles.card}>
            <div style={styles.cardTop}>
              <span style={styles.type}>{s.type}</span>
              <span style={styles.deadline}>Due {s.deadline}</span>
            </div>
            <h2 style={styles.cardTitle}>{s.name}</h2>
            <p style={styles.amount}>{s.amount}</p>
            <p style={styles.desc}>{s.description}</p>
            <div style={styles.infoBox}>
              <strong>Eligibility</strong>
              <span>{s.eligibility}</span>
            </div>
            <div style={styles.docs}>
              {s.documents.slice(0, 3).map((doc) => (
                <span key={doc} style={styles.doc}>
                  {doc}
                </span>
              ))}
            </div>
            <Link to={`/apply/${s.id}`} style={styles.btn}>
              Apply now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: { padding: "40px 32px 56px" },
  hero: {
    display: "flex",
    justifyContent: "space-between",
    gap: "24px",
    alignItems: "flex-end",
    marginBottom: "32px",
    flexWrap: "wrap",
  },
  kicker: {
    color: "#2563eb",
    fontSize: "13px",
    fontWeight: "700",
    marginBottom: "8px",
    textTransform: "uppercase",
  },
  heading: { fontSize: "34px", marginBottom: "10px", maxWidth: "680px", lineHeight: 1.15 },
  sub: { color: "#6b7280", maxWidth: "720px", lineHeight: 1.6 },
  summary: {
    backgroundColor: "white",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    padding: "18px 22px",
    minWidth: "220px",
  },
  summaryNumber: { display: "block", fontSize: "32px", color: "#111827" },
  summaryLabel: { color: "#6b7280", fontSize: "14px" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  },
  card: {
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    padding: "24px",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
  },
  type: {
    backgroundColor: "#eff6ff",
    color: "#1d4ed8",
    borderRadius: "999px",
    padding: "5px 10px",
    fontSize: "12px",
    fontWeight: "700",
  },
  deadline: { color: "#6b7280", fontSize: "13px" },
  cardTitle: { fontSize: "19px", lineHeight: 1.3 },
  amount: { fontSize: "24px", color: "#1e40af", fontWeight: "bold" },
  desc: { color: "#4b5563", fontSize: "14px", lineHeight: 1.5 },
  infoBox: {
    backgroundColor: "#f9fafb",
    border: "1px solid #eef2f7",
    borderRadius: "8px",
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    color: "#374151",
    fontSize: "13px",
    lineHeight: 1.45,
  },
  docs: { display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "2px" },
  doc: {
    backgroundColor: "#f3f4f6",
    borderRadius: "6px",
    padding: "5px 8px",
    color: "#4b5563",
    fontSize: "12px",
  },
  btn: {
    display: "inline-block",
    backgroundColor: "#1e40af",
    color: "white",
    padding: "10px 20px",
    borderRadius: "6px",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "700",
    textAlign: "center",
    marginTop: "auto",
  },
};

export default HomePage;
