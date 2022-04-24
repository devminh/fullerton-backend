const mongoose = require("mongoose");
const { Schema } = require("mongoose");

class EventTypes {
  initSchema() {
    const schema = new Schema(
      {
        label: {
          type: String,
          required: true,
        },
        value: {
          type: String,
          required: true,
        },
      },
      { timestamps: true }
    );

    try {
      mongoose.model("event_types", schema);
    } catch (e) {}
  }

  getInstance() {
    this.initSchema();
    return mongoose.model("event_types");
  }
}

module.exports = { EventTypes };
