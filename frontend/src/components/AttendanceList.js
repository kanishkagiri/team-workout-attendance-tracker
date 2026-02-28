import React, { useEffect } from "react";
import API from "../services/api";

function AttendanceList({
  sessions,
  selectedSessionId,
  setSelectedSessionId,
  records,
  setRecords,
}) {
  const safeSessions = Array.isArray(sessions) ? sessions : [];
  const safeRecords = Array.isArray(records) ? records : [];
  const presentCount = safeRecords.filter((record) => record.status === "Present").length;
  const absentCount = safeRecords.length - presentCount;
  const attendanceRate =
    safeRecords.length > 0 ? Math.round((presentCount / safeRecords.length) * 100) : 0;

  const fetchAttendance = async (sessionId) => {
    if (!sessionId) {
      setRecords([]);
      return;
    }

    try {
      const res = await API.get(`/attendance/session/${sessionId}`);
      setRecords(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching attendance:", error);
      alert("Failed to fetch attendance.");
      setRecords([]);
    }
  };

  useEffect(() => {
    fetchAttendance(selectedSessionId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSessionId]);

  const handleSessionChange = (e) => {
    const sessionId = e.target.value;
    setSelectedSessionId(sessionId);
  };

  return (
    <section className="card attendance-list-card">
      <div className="attendance-list-top">
        <div>
          <h2>Attendance Records</h2>
          <p className="attendance-subtext">
            View attendance per session with quick totals.
          </p>
        </div>

        <div className="attendance-kpis">
          <span className="attendance-kpi">Total: {safeRecords.length}</span>
          <span className="attendance-kpi attendance-kpi-present">Present: {presentCount}</span>
          <span className="attendance-kpi attendance-kpi-absent">Absent: {absentCount}</span>
          <span className="attendance-kpi">Rate: {attendanceRate}%</span>
        </div>
      </div>

      <label htmlFor="attendance-session-filter">Session</label>
      <select
        className="attendance-session-filter"
        id="attendance-session-filter"
        value={selectedSessionId}
        onChange={handleSessionChange}
      >
        <option value="">Select Session</option>
        {safeSessions.map((session) => (
          <option key={session._id} value={session._id}>
            {session.title} ({new Date(session.date).toLocaleDateString()})
          </option>
        ))}
      </select>

      {!selectedSessionId ? (
        <p className="status-text attendance-empty">Choose a session to view attendance.</p>
      ) : safeRecords.length === 0 ? (
        <p className="status-text attendance-empty">
          No attendance records for this session yet.
        </p>
      ) : (
        <div className="attendance-table-wrap">
          <table className="attendance-table">
          <thead>
            <tr>
              <th>Member</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {safeRecords.map((record) => (
              <tr key={record._id}>
                <td>{record.member?.name || "Unknown member"}</td>
                <td>
                  <span
                    className={`attendance-badge ${
                      record.status === "Present"
                        ? "attendance-badge-present"
                        : "attendance-badge-absent"
                    }`}
                  >
                    {record.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </section>
  );
}



export default AttendanceList;
