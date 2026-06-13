function StatusBadge({ status }) {
  const colors = {
    pending: { background: "#fef3c7", color: "#92400e" },
    approved: { background: "#d1fae5", color: "#065f46" },
    rejected: { background: "#fee2e2", color: "#991b1b" },
  };

  const style = colors[status] || colors.pending;

  return (
    <span
      style={{
        ...style,
        padding: "4px 12px",
        borderRadius: "999px",
        fontSize: "13px",
        fontWeight: "600",
        textTransform: "capitalize",
      }}
    >
      {status}
    </span>
  );
}

export default StatusBadge;