import React, { useEffect, useState } from "react";
import "./App.css";
import API from "./services/api";
import MemberForm from "./components/MemberForm";
import MemberList from "./components/MemberList";
import EditModal from "./components/EditModal";
import SessionForm from "./components/SessionForm";
import SessionList from "./components/SessionList";
import SessionDetails from "./components/SessionDetails";
import AttendanceForm from "./components/AttendanceForm";
import AttendanceList from "./components/AttendanceList";

function App() {
  const [members, setMembers] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [activePage, setActivePage] = useState("dashboard");
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [selectedAttendanceSessionId, setSelectedAttendanceSessionId] = useState("");
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

  const fetchSessions = async () => {
    try {
      const res = await API.get("/sessions");
      setSessions(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching sessions:", error);
      setSessions([]);
    }
  };

  useEffect(() => {
    fetchMembers();
    fetchSessions();
  }, []);

  const getPageTitle = () => {
    switch (activePage) {
      case "dashboard": return "Dashboard";
      case "add": return "Add Member";
      case "sessions": return "Sessions";
      case "add-session": return "Create Session";
      case "session-details": return "Session Details";
      case "attendance-add": return "Mark Attendance";
      case "attendance-view": return "View Attendance";
      default: return "Dashboard";
    }
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h2 className="sidebar-title">Team Tracker</h2>

        <p style={{ color: "#94a3b8", fontSize: "12px", padding: "0 16px", marginTop: "16px" }}>MEMBERS</p>
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

        <p style={{ color: "#94a3b8", fontSize: "12px", padding: "0 16px", marginTop: "16px" }}>SESSIONS</p>
        <button
          type="button"
          className={`nav-btn ${activePage === "sessions" ? "active" : ""}`}
          onClick={() => setActivePage("sessions")}
        >
          All Sessions
        </button>
        <button
          type="button"
          className={`nav-btn ${activePage === "add-session" ? "active" : ""}`}
          onClick={() => setActivePage("add-session")}
        >
          Create Session
        </button>

        <p style={{ color: "#94a3b8", fontSize: "12px", padding: "0 16px", marginTop: "16px" }}>ATTENDANCE</p>
        <button
          type="button"
          className={`nav-btn ${activePage === "attendance-add" ? "active" : ""}`}
          onClick={() => setActivePage("attendance-add")}
        >
          Mark Attendance
        </button>
        <button
          type="button"
          className={`nav-btn ${activePage === "attendance-view" ? "active" : ""}`}
          onClick={() => setActivePage("attendance-view")}
        >
          View Attendance
        </button>
      </aside>

      <main className="main-content">
        <div className="page-header">
          <h1>{getPageTitle()}</h1>
        </div>

        {loading && <p className="status-text">Loading...</p>}

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

        {activePage === "sessions" && (
          <SessionList
            sessions={sessions}
            onSelectSession={(session) => {
              setSelectedSession(session);
              setActivePage("session-details");
            }}
          />
        )}

        {activePage === "add-session" && (
          <SessionForm
            fetchSessions={fetchSessions}
            goToDashboard={() => setActivePage("sessions")}
          />
        )}

        {activePage === "session-details" && (
          <SessionDetails
            session={selectedSession}
            onBack={() => setActivePage("sessions")}
          />
        )}

        {activePage === "attendance-add" && (
          <AttendanceForm
            members={members}
            sessions={sessions}
            onSaved={(sessionId) => {
              setSelectedAttendanceSessionId(sessionId);
              setActivePage("attendance-view");
            }}
          />
        )}

        {activePage === "attendance-view" && (
          <AttendanceList
            sessions={sessions}
            selectedSessionId={selectedAttendanceSessionId}
            setSelectedSessionId={setSelectedAttendanceSessionId}
            records={attendanceRecords}
            setRecords={setAttendanceRecords}
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
