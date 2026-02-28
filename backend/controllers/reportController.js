const Attendance = require('../models/attendance');
const Session = require('../models/session');

exports.getWeeklyReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const start = startDate ? new Date(startDate) : (() => {
      const d = new Date();
      d.setDate(d.getDate() - 7);
      return d;
    })();
    const end = endDate ? new Date(endDate) : new Date();

    // Get sessions in date range
    const sessions = await Session.find({
      date: { $gte: start, $lte: end }
    });

    const sessionIds = sessions.map(s => s._id);
    const totalSessions = sessions.length;

    // Get all attendance for those sessions
    const attendanceRecords = await Attendance.find({
      session: { $in: sessionIds }
    }).populate('member').populate('session');

    // Calculate per-member stats
    const memberStats = {};
    attendanceRecords.forEach(record => {
      const memberId = record.member._id.toString();
      const memberName = record.member.name;
      if (!memberStats[memberId]) {
        memberStats[memberId] = {
          name: memberName,
          present: 0,
          absent: 0,
          total: 0
        };
      }
      memberStats[memberId].total += 1;
      if (record.status === 'Present') {
        memberStats[memberId].present += 1;
      } else {
        memberStats[memberId].absent += 1;
      }
    });

    // Add percentage to each member
    const memberReport = Object.values(memberStats).map(m => ({
      ...m,
      percentage: m.total > 0 ? ((m.present / m.total) * 100).toFixed(1) : 0
    }));

    // Overall avg attendance
    const avgAttendance = memberReport.length > 0
      ? (memberReport.reduce((sum, m) => sum + parseFloat(m.percentage), 0) / memberReport.length).toFixed(1)
      : 0;

    res.json({
      startDate: start,
      endDate: end,
      totalSessions,
      avgAttendance,
      memberReport,
      sessions
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};