import React from "react";

function SessionDetails({ session, onBack }) {
  if (!session) return null;

  return (
    <section className="card form-card">
      <button className="btn" onClick={onBack} style={{ marginBottom: "20px" }}>
        ← Back to Sessions
      </button>
      <h2>Session Details</h2>
      <p><strong>Title:</strong> {session.title}</p>
      <p><strong>Date:</strong> {new Date(session.date).toLocaleDateString()}</p>
      <p><strong>Description:</strong> {session.description || "No description"}</p>
      <p><strong>Created:</strong> {new Date(session.createdAt).toLocaleString()}</p>
    </section>
  );
}

export default SessionDetails;