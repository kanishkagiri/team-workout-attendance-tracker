import React, { useState, useEffect, useCallback } from "react";
import API from "../services/api";

function Reports() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    return d.toISOString().split("T")[0];
  });
  const [endDate, setEndDate] = useState(() => {
    return new Date().toISOString().split("T")[0];
  });

  const fetchReport = useCallback(async () => {
    try {
      setLoading(true);
      const res = await API.get(`/reports/weekly?startDate=${startDate}&endDate=${endDate}`);
      setReport(res.data);
    } catch (err) {
      console.error("Error fetching report:", err);
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  return (
    <div>
      <section className="card" style={{ marginBottom: "20px" }}>
        <h3>Filter by Date Range</h3>
        <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
          <div>
            <label>Start Date</label><br />
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }} />
          </div>
          <div>
            <label>End Date</label><br />
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} style={{ padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }} />
          </div>
          <button className="btn btn-primary" onClick={fetchReport} style={{ marginTop: "20px" }}>Generate Report</button>
        </div>
      </section>

      {loading && <p>Loading report...</p>}

      {report && (
        <>
          <div style={{ display: "flex", gap: "16px", marginBottom: "20px", flexWrap: "wrap" }}>
            <div className="card" style={{ flex: 1, textAlign: "center", background: "#1e293b", color: "white" }}>
              <h2 style={{ fontSize: "36px", margin: "10px 0" }}>{report.totalSessions}</h2>
              <p>Total Sessions</p>
            </div>
            <div className="card" style={{ flex: 1, textAlign: "center", background: "#0f766e", color: "white" }}>
              <h2 style={{ fontSize: "36px", margin: "10px 0" }}>{report.avgAttendance}%</h2>
              <p>Avg Attendance</p>
            </div>
            <div className="card" style={{ flex: 1, textAlign: "center", background: "#1d4ed8", color: "white" }}>
              <h2 style={{ fontSize: "36px", margin: "10px 0" }}>{report.memberReport.length}</h2>
              <p>Members Tracked</p>
            </div>
          </div>

          <section className="card" style={{ marginBottom: "20px" }}>
            <h3>Attendance by Member</h3>
            {report.memberReport.length === 0 ? (
              <p>No attendance data for this period.</p>
            ) : (
              report.memberReport.map((member, i) => (
                <div key={i} style={{ marginBottom: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span>{member.name}</span>
                    <span>{member.present}/{member.total} sessions ({member.percentage}%)</span>
                  </div>
                  <div style={{ background: "#e2e8f0", borderRadius: "999px", height: "12px" }}>
                    <div style={{ width: `${member.percentage}%`, background: member.percentage >= 75 ? "#16a34a" : member.percentage >= 50 ? "#f59e0b" : "#dc2626", height: "12px", borderRadius: "999px" }} />
                  </div>
                </div>
              ))
            )}
          </section>

          <section className="card">
            <h3>Sessions This Period</h3>
            {report.sessions.length === 0 ? (
              <p>No sessions in this date range.</p>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#1e293b", color: "white" }}>
                    <th style={{ padding: "10px" }}>Title</th>
                    <th style={{ padding: "10px" }}>Date</th>
                    <th style={{ padding: "10px" }}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {report.sessions.map((session, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #ddd" }}>
                      <td style={{ padding: "10px" }}>{session.title}</td>
                      <td style={{ padding: "10px" }}>{new Date(session.date).toLocaleDateString()}</td>
                      <td style={{ padding: "10px" }}>{session.description || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        </>
      )}
    </div>
  );
}

export default Reports;
