const Attendance = require('../models/attendance');
const mongoose = require('mongoose');

exports.markAttendance = async (req, res) => {
  try {
    const memberId = req.body.memberId || req.body.member;
    const sessionId = req.body.sessionId || req.body.session;
    const status = req.body.status || "Absent";

    if (!memberId || !sessionId) {
      return res.status(400).json({ error: "memberId and sessionId are required." });
    }

    if (!mongoose.Types.ObjectId.isValid(memberId) || !mongoose.Types.ObjectId.isValid(sessionId)) {
      return res.status(400).json({ error: "Invalid memberId or sessionId." });
    }

    if (!["Present", "Absent"].includes(status)) {
      return res.status(400).json({ error: "Status must be either 'Present' or 'Absent'." });
    }

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
