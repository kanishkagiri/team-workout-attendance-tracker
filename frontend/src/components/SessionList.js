import React from "react";

function SessionList({ sessions, onSelectSession }) {
  if (sessions.length === 0) {
    return <p>No sessions found. Create one!</p>;
  }

  return (
    <section className="card">
      <h2>All Sessions</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#1e293b", color: "white" }}>
            <th style={{ padding: "10px" }}>Title</th>
            <th style={{ padding: "10px" }}>Date</th>
            <th style={{ padding: "10px" }}>Description</th>
            <th style={{ padding: "10px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
            <tr key={session._id} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "10px" }}>{session.title}</td>
              <td style={{ padding: "10px" }}>
                {new Date(session.date).toLocaleDateString()}
              </td>
              <td style={{ padding: "10px" }}>{session.description || "-"}</td>
              <td style={{ padding: "10px" }}>
                <button
                  className="btn btn-primary"
                  onClick={() => onSelectSession(session)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default SessionList;