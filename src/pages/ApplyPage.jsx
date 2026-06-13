import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { scholarships } from "../data/scholarships";

function ApplyPage({ onSubmit }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const scholarship = scholarships.find((s) => s.id === Number(id));

  const [form, setForm] = useState({
    studentName: "",
    marks: "",
    income: "",
    marksFile: "",
    incomeFile: "",
    certificateFile: "",
  });

  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!scholarship) {
    return <p style={{ padding: "40px" }}>Scholarship not found.</p>;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.studentName || !form.marks || !form.income) {
      setError("Please fill in all required fields.");
      return;
    }

    const applicationId = [
      scholarship.id,
      form.studentName.trim().toLowerCase().replace(/\s+/g, "-"),
      form.marks.trim(),
      form.income.trim().replace(/\s+/g, ""),
    ].join("-");

    const newApplication = {
      id: applicationId,
      scholarshipId: scholarship.id,
      scholarshipName: scholarship.name,
      ...form,
      departmentStatus: "pending",
      departmentComment: "",
      financeStatus: "pending",
      financeComment: "",
      principalStatus: "pending",
      principalComment: "",
      submittedAt: new Date().toISOString().split("T")[0],
    };

    onSubmit(newApplication);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div style={{ padding: "60px 32px", textAlign: "center" }}>
        <div style={{ fontSize: "32px", marginBottom: "16px", fontWeight: "700" }}>Done</div>
        <h2>Application Submitted!</h2>
        <p style={{ color: "#6b7280", marginBottom: "24px" }}>
          Your application for <strong>{scholarship.name}</strong> has been received.
        </p>
        <button onClick={() => navigate("/")} style={styles.btn}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <section style={styles.header}>
        <span style={styles.type}>{scholarship.type}</span>
        <h1 style={styles.heading}>Apply: {scholarship.name}</h1>
        <p style={styles.sub}>{scholarship.description}</p>
        <div style={styles.metaGrid}>
          <div style={styles.metaItem}>
            <span>Award amount</span>
            <strong>{scholarship.amount}</strong>
          </div>
          <div style={styles.metaItem}>
            <span>Application deadline</span>
            <strong>{scholarship.deadline}</strong>
          </div>
        </div>
      </section>

      <section style={styles.requirements}>
        <div>
          <h2 style={styles.sectionTitle}>Eligibility</h2>
          <p style={styles.requirementText}>{scholarship.eligibility}</p>
        </div>
        <div>
          <h2 style={styles.sectionTitle}>Required documents</h2>
          <div style={styles.docs}>
            {scholarship.documents.map((doc) => (
              <span key={doc} style={styles.doc}>
                {doc}
              </span>
            ))}
          </div>
        </div>
      </section>

      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.formTitle}>Student application details</h2>

        <label style={styles.label}>Student Name *</label>
        <input
          name="studentName"
          value={form.studentName}
          onChange={handleChange}
          style={styles.input}
          placeholder="Your full name"
        />

        <label style={styles.label}>Marks (e.g. 92%) *</label>
        <input
          name="marks"
          value={form.marks}
          onChange={handleChange}
          style={styles.input}
          placeholder="e.g. 88%"
        />

        <label style={styles.label}>Annual Family Income *</label>
        <input
          name="income"
          value={form.income}
          onChange={handleChange}
          style={styles.input}
          placeholder="e.g. Rs. 1,50,000"
        />

        <label style={styles.label}>Marksheet File Name</label>
        <input
          name="marksFile"
          value={form.marksFile}
          onChange={handleChange}
          style={styles.input}
          placeholder="e.g. marksheet.pdf"
        />

        <label style={styles.label}>Income Proof File Name</label>
        <input
          name="incomeFile"
          value={form.incomeFile}
          onChange={handleChange}
          style={styles.input}
          placeholder="e.g. income_proof.pdf"
        />

        <label style={styles.label}>Certificate File Name (optional)</label>
        <input
          name="certificateFile"
          value={form.certificateFile}
          onChange={handleChange}
          style={styles.input}
          placeholder="e.g. certificate.pdf"
        />

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" style={styles.btn}>
          Submit Application
        </button>
      </form>
    </div>
  );
}

const styles = {
  page: { padding: "40px 32px 56px", maxWidth: "860px" },
  header: {
    backgroundColor: "white",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    padding: "24px",
    marginBottom: "18px",
  },
  type: {
    display: "inline-block",
    backgroundColor: "#eff6ff",
    color: "#1d4ed8",
    borderRadius: "999px",
    padding: "5px 10px",
    fontSize: "12px",
    fontWeight: "700",
    marginBottom: "12px",
  },
  heading: { fontSize: "28px", marginBottom: "8px", lineHeight: 1.2 },
  sub: { color: "#6b7280", marginBottom: "20px", lineHeight: 1.6 },
  metaGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "12px",
  },
  metaItem: {
    backgroundColor: "#f9fafb",
    border: "1px solid #eef2f7",
    borderRadius: "8px",
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    color: "#6b7280",
    fontSize: "13px",
  },
  requirements: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "18px",
    marginBottom: "18px",
  },
  sectionTitle: { fontSize: "16px", marginBottom: "8px" },
  requirementText: { color: "#4b5563", lineHeight: 1.5 },
  docs: { display: "flex", gap: "8px", flexWrap: "wrap" },
  doc: {
    backgroundColor: "white",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    padding: "7px 10px",
    color: "#374151",
    fontSize: "13px",
  },
  
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    backgroundColor: "white",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    padding: "24px",
  },
  formTitle: { fontSize: "18px", marginBottom: "4px" },
  label: { fontWeight: "600", fontSize: "14px", marginTop: "12px" },
  input: {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "15px",
    outline: "none",
  },
  error: { color: "#dc2626", fontSize: "14px", marginTop: "4px" },
  btn: {
    marginTop: "20px",
    backgroundColor: "#1e40af",
    color: "white",
    padding: "12px 24px",
    borderRadius: "6px",
    border: "none",
    fontSize: "15px",
    cursor: "pointer",
  },
};

export default ApplyPage;
