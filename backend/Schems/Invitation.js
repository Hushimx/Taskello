const mongoose = require("mongoose");
const { Schema } = mongoose;

const invitationSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: "User" },
  recipient: { type: Schema.Types.ObjectId, ref: "User" },
  recipientEmail: { type: String, required: true },
  board: { type: Schema.Types.ObjectId, ref: "Board" },
  status: {
    type: String,
    enum: ["pending", "accepted", "declined"],
    default: "pending",
  },
});

module.exports = mongoose.model("Invitation", invitationSchema);
