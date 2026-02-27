import React, { useEffect, useState } from "react";
import "./App.css";
import API from "./services/api";
import MemberForm from "./components/MemberForm";
import MemberList from "./components/MemberList";
import EditModal from "./components/EditModal";

function App() {
  const [members, setMembers] = useState([]);
  const [activePage, setActivePage] = useState("dashboard");
  const [selectedMember, setSelectedMember] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await API.get("/members");

      if (Array.isArray(res.data)) {
        setMembers(res.data);
      } else if (Array.isArray(res.data.members)) {
        setMembers(res.data.members);
      } else {
        setMembers([]);
      }
    } catch (error) {
      console.error("Error fetching members:", error);
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h2 className="sidebar-title">Team Tracker</h2>

        <button
          type="button"
          className={`nav-btn ${activePage === "dashboard" ? "active" : ""}`}
          onClick={() => setActivePage("dashboard")}
        >
          Dashboard
        </button>

        <button
          type="button"
          className={`nav-btn ${activePage === "add" ? "active" : ""}`}
          onClick={() => setActivePage("add")}
        >
          Add Member
        </button>
      </aside>

      <main className="main-content">
        <div className="page-header">
          <h1>{activePage === "dashboard" ? "Dashboard" : "Add Member"}</h1>
        </div>

        {loading && <p className="status-text">Loading members...</p>}

        {!loading && activePage === "dashboard" && (
          <MemberList
            members={members}
            fetchMembers={fetchMembers}
            openEdit={setSelectedMember}
          />
        )}

        {!loading && activePage === "add" && (
          <MemberForm
            fetchMembers={fetchMembers}
            goToDashboard={() => setActivePage("dashboard")}
          />
        )}
      </main>

      {selectedMember && (
        <EditModal
          member={selectedMember}
          close={() => setSelectedMember(null)}
          fetchMembers={fetchMembers}
        />
      )}
    </div>
  );
}

export default App;
