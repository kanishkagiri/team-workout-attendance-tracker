const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema(
  {
  member: { type: mongoose.Schema.Types.ObjectId,
    ref: 'Member', 
    required: true },
  session: { type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
    required: true },
  status: { type: String, 
    enum: ['Present', 'Absent'], 
    default: 'Absent' },
  }, 
{ timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);