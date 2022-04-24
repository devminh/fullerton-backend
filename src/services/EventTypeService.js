const autoBind = require("auto-bind");

class EventTypeService {
  constructor(model) {
    this.model = model;
    autoBind(this);
  }

  async getEventTypeList() {
    try {
      const result = await this.model.find({});
      return result;
    } catch (errors) {
      throw errors;
    }
  }

  async createEventType(data) {
    try {
      const result = await this.model.create(data);
      return { status: "create successfully", id: result._id };
    } catch (errors) {
      throw errors;
    }
  }

  async updateEventType(data) {
    try {
      await this.model.findByIdAndUpdate(data.id, data);
      return { status: "update success" };
    } catch (errors) {
      throw errors;
    }
  }

  async deleteEventType(id) {
    try {
      await this.model.deleteOne({ _id: id });
      return { status: "delete success" };
    } catch (errors) {
      throw errors;
    }
  }
}

module.exports = { EventTypeService };
