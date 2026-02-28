const Attendance = require('../models/attendance');

exports.markAttendance = async (req, res) => {
  try {
    const { memberId, sessionId, status } = req.body;
    let record = await Attendance.findOne({ member: memberId, session: sessionId });
    if (record) {
      record.status = status;
      await record.save();
    } else {
      record = await Attendance.create({ member: memberId, session: sessionId, status });
    }
    res.json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAttendanceBySession = async (req, res) => {
  try {
    const records = await Attendance.find({ session: req.params.sessionId }).populate('member');
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAttendanceSummary = async (req, res) => {
  try {
    const records = await Attendance.find({ member: req.params.memberId });
    const total = records.length;
    const present = records.filter(r => r.status === 'Present').length;
    const percentage = total > 0 ? ((present / total) * 100).toFixed(1) : 0;
    res.json({ total, present, absent: total - present, percentage });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};