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

    try {
      const result = await this.model.find(data || {});
      return result;
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
