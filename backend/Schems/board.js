const mongoose = require("../mongooseConnection");
const Schema = mongoose.Schema;
// Function to generate a random alphanumeric ID

const boardSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  columns: {
    type: [
      {
        title: { type: String, required: true },
        tasks: {
          type: [
            {
              _id: { type: String, required: true },
              title: { type: String, required: true },
              description: { type: String, default: "" },
              subTasks: {
                type: [
                  {
                    title: { type: String, required: true },
                    isChecked: { type: Boolean, required: true },
                  },
                ],
                default: [],
                required: false,
              },
            },
          ],
          default: [],
          required: false,
        },
      },
    ],
    required: false,
  },
  users: [
    {
      _id: { type: String, required: true },
      name: { type: String, required: true },
      role: {
        type: String,
        default: "user",
      },
    },
  ],
  invites: { type: [{ id: String }], required: false, default: [] },

  background: { type: String, required: false, default: null },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("boards", boardSchema);
