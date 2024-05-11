const mongoose = require("../mongooseConnection");
const user = mongoose.Schema({
  email: { type: String, required: true },
  fname: { type: String, required: true },
  password: { type: String, required: true },
  invites: { type: [{ id: String }], required: false, default: [] },
  createdAt: { type: Date, default: () => Date.now() },
  updetedAt: { type: Date },
  boards: {
    type: [],
    default: [],
  },
});

module.exports = mongoose.model("users", user);
