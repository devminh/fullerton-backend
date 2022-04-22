const mongoose = require("mongoose");
const { Schema } = require("mongoose");

class Bookings {
  initSchema() {
    const schema = new Schema(
      {
        user_id: {
          type: String,
          required: true,
        },
        user_name: {
          type: String,
          required: true,
        },
        event_type: {
          type: String,
          required: true,
        },
        event_location: {
          type: String,
          required: true,
        },
        proposed_datetime_1: {
          type: String,
          required: true,
        },
        proposed_datetime_2: {
          type: String,
          required: true,
        },
        proposed_datetime_3: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          required: true,
        },
        rejected_reason: {
          type: String,
          default: "",
          required: false,
        },
      },
      { timestamps: true }
    );

    try {
      mongoose.model("bookings", schema);
    } catch (e) {}
  }

  getInstance() {
    this.initSchema();
    return mongoose.model("bookings");
  }
}

module.exports = { Bookings };
