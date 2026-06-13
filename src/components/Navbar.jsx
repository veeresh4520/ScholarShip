import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>
        Scholarship Portal
      </Link>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        <Link to="/review" style={styles.link}>Review</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 32px",
    backgroundColor: "white",
    color: "#111827",
    borderBottom: "1px solid #e5e7eb",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  brand: {
    color: "#111827",
    textDecoration: "none",
    fontSize: "19px",
    fontWeight: "800",
  },
  links: {
    display: "flex",
    gap: "8px",
  },
  link: {
    color: "#374151",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "600",
    padding: "8px 12px",
    borderRadius: "6px",
  },
};

export default Navbar;
