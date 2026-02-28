import React, { useMemo, useState } from "react";
import API from "../services/api";

function AttendanceForm({ members, sessions, onSaved }) {
  const [formData, setFormData] = useState({
    memberId: "",
    sessionId: "",
    status: "Present",
  });
  const [saving, setSaving] = useState(false);

  const safeMembers = useMemo(
    () => (Array.isArray(members) ? members : []),
    [members]
  );
  const safeSessions = useMemo(
    () => (Array.isArray(sessions) ? sessions : []),
    [sessions]
  );

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.memberId || !formData.sessionId) {
      alert("Please choose both member and session.");
      return;
    }

    try {
      setSaving(true);
      await API.post("/attendance", formData);
      setFormData((prev) => ({ ...prev, memberId: "", sessionId: "" }));
      if (typeof onSaved === "function") {
        onSaved(formData.sessionId);
      }
    } catch (error) {
      console.error("Error saving attendance:", error);
      const serverMessage = error?.response?.data?.error;
      alert(serverMessage || "Failed to save attendance. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="card form-card attendance-form-card">
      <h2>Mark Attendance</h2>
      <p className="attendance-subtext">
        Select a member and session to mark presence quickly.
      </p>
      <form onSubmit={handleSubmit} className="member-form">
        <div className="attendance-field-grid">
          <div>
            <label htmlFor="memberId">Member</label>
            <select
              id="memberId"
              name="memberId"
              value={formData.memberId}
              onChange={handleChange}
              required
            >
              <option value="">Select Member</option>
              {safeMembers.map((member) => (
                <option key={member._id} value={member._id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="sessionId">Session</label>
            <select
              id="sessionId"
              name="sessionId"
              value={formData.sessionId}
              onChange={handleChange}
              required
            >
              <option value="">Select Session</option>
              {safeSessions.map((session) => (
                <option key={session._id} value={session._id}>
                  {session.title} ({new Date(session.date).toLocaleDateString()})
                </option>
              ))}
            </select>
          </div>
        </div>

        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>

        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? "Saving..." : "Save Attendance"}
        </button>
      </form>
    </section>
  );
}

export default AttendanceForm;
