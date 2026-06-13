import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initialApplications } from "./data/scholarships";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ApplyPage from "./pages/ApplyPage";
import ReviewPage from "./pages/ReviewPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  const [applications, setApplications] = useState(initialApplications);

  function handleSubmit(newApp) {
    setApplications((currentApplications) => [...currentApplications, newApp]);
  }

  function handleUpdateApplication(updatedApp) {
    setApplications((currentApplications) =>
      currentApplications.map((app) =>
        app.id === updatedApp.id ? updatedApp : app
      )
    );
  }

  return (
    <BrowserRouter>
      <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/apply/:id" element={<ApplyPage onSubmit={handleSubmit} />} />
          <Route path="/review" element={<ReviewPage applications={applications} onUpdateApplication={handleUpdateApplication} />} />
          <Route path="/dashboard" element={<DashboardPage applications={applications} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
