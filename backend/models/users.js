const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name:          { type: String, required: true },
  email:         { type: String, required: true, unique: true },
  password:      { type: String, required: true },
  role:          { type: String, enum: ['user','problemSetter','admin'], default: 'user' },
  globalRank:    { type: Number, default: 0 },
  contestRating: { type: Number, default: -1000 },
  codingTitle: {
    type: String,
    enum: [
      'Newbie',
      'Pupil',
      'Specialist',
      'Expert',
      'Candidate Master',
      'Master',
      'Grand Master'
    ],
    default: 'Newbie'
  },

  activity: {
    type: Map,
    of: Number,
    default: {}
  },

  solvedTotal:  { type: Number, default: 0 },
  solvedEasy:   { type: Number, default: 0 },
  solvedMedium: { type: Number, default: 0 },
  solvedHard:   { type: Number, default: 0 },
  attempting: {type: Number, default: 0},
  createdAt: { type: Date, default: Date.now }
});

UserSchema.pre('save', function(next) {
  const now       = new Date();
  const currentY  = now.getFullYear();
  const allowed   = new Set([ currentY, currentY - 1, currentY - 2 ]);

  for (const dateStr of this.activity.keys()) {
    const year = Number(dateStr.slice(0, 4));
    if (!allowed.has(year)) {
      this.activity.delete(dateStr);
    }
  }

  next();
});

module.exports = mongoose.model('User', UserSchema);
