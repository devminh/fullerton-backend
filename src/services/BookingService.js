const autoBind = require("auto-bind");

class BookingService {
  constructor(model) {
    this.model = model;
    autoBind(this);
  }

  async getBookingList(data) {
    if (data.event_location) {
      data["event_location"] = new RegExp("^" + data.event_location, "i");
    }
    let offset = 0;
    let limit = 10;

    if (data.offset >= 0 && data.limit) {
      offset = data.offset;
      limit = data.limit;
      delete data.offset;
      delete data.limit;
    }

    try {
      const result = await this.model
        .find(data || {})
        .sort({ updatedAt: -1 })
        .skip(offset)
        .limit(limit);

      let total;

      if (data.user_id) {
        total = await this.model.countDocuments({ user_id: data.user_id });
      } else {
        total = await this.model.countDocuments();
      }

      return {
        total: total,
        bookings: result,
      };
    } catch (errors) {
      throw errors;
    }
  }

  async createBooking(data) {
    try {
      const result = await this.model.create(data);
      return { status: "create successfully", id: result._id };
    } catch (errors) {
      throw errors;
    }
  }

  async updateBooking(data) {
    try {
      await this.model.findByIdAndUpdate(data.id, data);
      return { status: "update success" };
    } catch (errors) {
      throw errors;
    }
  }
}

module.exports = { BookingService };
