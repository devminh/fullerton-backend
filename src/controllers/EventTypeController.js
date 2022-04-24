const { EventTypes } = require("../models/EventType");
const { EventTypeService } = require("../services/EventTypeService");

const autoBind = require("auto-bind"),
  eventTypeService = new EventTypeService(new EventTypes().getInstance());

class EventTypeController {
  constructor(service) {
    this.service = service;
    autoBind(this);
  }

  async getEventTypeList(req, res, next) {
    try {
      const bookingList = await this.service.getEventTypeList();

      await res.status(200).json(bookingList);
    } catch (e) {
      next(e);
    }
  }

  async createEventType(req, res, next) {
    try {
      const createdEventType = await this.service.createEventType(req.body);
      await res.status(200).json(createdEventType);
    } catch (e) {
      next(e);
    }
  }

  async updateEventType(req, res, next) {
    try {
      const updatedEventType = await this.service.updateEventType(req.body);

      await res.status(200).json(updatedEventType);
    } catch (e) {
      next(e);
    }
  }

  async deleteEventType(req, res, next) {
    try {
      const deletedEventType = await this.service.deleteEventType(req.query.id);

      await res.status(200).json(deletedEventType);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new EventTypeController(eventTypeService);
