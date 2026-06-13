import { useState } from "react";
import StatusBadge from "../components/StatusBadge";

const STAGES = ["department", "finance", "principal"];

const STAGE_LABELS = {
  department: "Department Review",
  finance: "Finance Office Review",
  principal: "Principal Approval",
};

function ReviewPage({ applications, onUpdateApplication }) {
  const [activeStage, setActiveStage] = useState("department");
  const [comments, setComments] = useState({});

  function getOverallStatus(app) {
    if (app.departmentStatus === "rejected" || app.financeStatus === "rejected" || app.principalStatus === "rejected") {
      return "rejected";
    }
    if (app.principalStatus === "approved") return "approved";
    return "pending";
  }

  function isStageUnlocked(app, stage) {
    if (stage === "department") return true;
    if (stage === "finance") return app.departmentStatus === "approved";
    if (stage === "principal") return app.departmentStatus === "approved" && app.financeStatus === "approved";
    return false;
  }

  function handleAction(app, action) {
    const comment = comments[app.id] || "";
    const updated = { ...app };
    updated[`${activeStage}Status`] = action;
    updated[`${activeStage}Comment`] = comment;
    onUpdateApplication(updated);
    setComments((currentComments) => ({ ...currentComments, [app.id]: "" }));
  }

  const appsForStage = applications.filter((app) => isStageUnlocked(app, activeStage));

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Reviewer Panel</h1>

      <div style={styles.tabs}>
        {STAGES.map((stage) => (
          <button
            key={stage}
            onClick={() => setActiveStage(stage)}
            style={{
              ...styles.tab,
              backgroundColor: activeStage === stage ? "#1e40af" : "#f3f4f6",
              color: activeStage === stage ? "white" : "#374151",
            }}
          >
            {STAGE_LABELS[stage]}
          </button>
        ))}
      </div>

      {appsForStage.length === 0 && (
        <p style={styles.empty}>No applications available for this stage yet.</p>
      )}

      {appsForStage.map((app) => (
        <div key={app.id} style={styles.card}>
          <div style={styles.cardHeader}>
            <div>
              <h3 style={styles.name}>{app.studentName}</h3>
              <p style={styles.schName}>{app.scholarshipName}</p>
            </div>
            <StatusBadge status={getOverallStatus(app)} />
          </div>

          <div style={styles.details}>
            <span>Marks: <strong>{app.marks}</strong></span>
            <span>Income: <strong>{app.income}</strong></span>
            <span>Submitted: <strong>{app.submittedAt}</strong></span>
          </div>

          <div style={styles.files}>
            {app.marksFile && <span style={styles.file}>File: {app.marksFile}</span>}
            {app.incomeFile && <span style={styles.file}>File: {app.incomeFile}</span>}
            {app.certificateFile && <span style={styles.file}>File: {app.certificateFile}</span>}
          </div>

          <div style={styles.chain}>
            <strong>Approval chain: </strong>
            <StatusBadge status={app.departmentStatus} /> Dept to{" "}
            <StatusBadge status={app.financeStatus} /> Finance to{" "}
            <StatusBadge status={app.principalStatus} /> Principal
          </div>

          {app[`${activeStage}Status`] === "pending" ? (
            <div style={styles.actionBox}>
              <textarea
                value={comments[app.id] || ""}
                onChange={(e) =>
                  setComments((currentComments) => ({
                    ...currentComments,
                    [app.id]: e.target.value,
                  }))
                }
                placeholder="Add a comment (optional)..."
                style={styles.textarea}
              />
              <div style={styles.actionBtns}>
                <button
                  onClick={() => handleAction(app, "approved")}
                  style={styles.approveBtn}
                >
                  Approve
                </button>
                <button
                  onClick={() => handleAction(app, "rejected")}
                  style={styles.rejectBtn}
                >
                  Reject
                </button>
              </div>
            </div>
          ) : (
            <div style={styles.doneBox}>
              <StatusBadge status={app[`${activeStage}Status`]} />
              {app[`${activeStage}Comment`] && (
                <p style={styles.existingComment}>"{app[`${activeStage}Comment`]}"</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const styles = {
  page: { padding: "40px 32px" },
  heading: { fontSize: "26px", marginBottom: "24px" },
  tabs: { display: "flex", gap: "12px", marginBottom: "32px" },
  tab: {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
  },
  empty: { color: "#9ca3af", fontSize: "16px" },
  card: {
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "24px",
    marginBottom: "20px",
    backgroundColor: "white",
  },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" },
  name: { fontSize: "18px", margin: 0 },
  schName: { color: "#6b7280", fontSize: "14px", margin: "4px 0 0" },
  details: { display: "flex", gap: "24px", fontSize: "14px", marginBottom: "12px", color: "#374151" },
  files: { display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "12px" },
  file: { backgroundColor: "#f3f4f6", padding: "4px 10px", borderRadius: "6px", fontSize: "13px" },
  chain: { fontSize: "13px", display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px", flexWrap: "wrap" },
  actionBox: { display: "flex", flexDirection: "column", gap: "10px" },
  textarea: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    resize: "vertical",
    minHeight: "70px",
  },
  actionBtns: { display: "flex", gap: "12px" },
  approveBtn: {
    padding: "10px 24px", borderRadius: "8px", border: "none",
    backgroundColor: "#059669", color: "white", cursor: "pointer", fontWeight: "600",
  },
  rejectBtn: {
    padding: "10px 24px", borderRadius: "8px", border: "none",
    backgroundColor: "#dc2626", color: "white", cursor: "pointer", fontWeight: "600",
  },
  doneBox: { display: "flex", alignItems: "center", gap: "12px" },
  existingComment: { color: "#6b7280", fontSize: "14px", fontStyle: "italic", margin: 0 },
};

export default ReviewPage;
