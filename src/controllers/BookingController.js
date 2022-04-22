const { Controller } = require("../../system/controllers/Controller");
const { BookingService } = require("./../services/BookingService");
const { Bookings } = require("./../models/Booking");

const autoBind = require("auto-bind"),
  bookingService = new BookingService(new Bookings().getInstance());

class BookingController {
  constructor(service) {
    this.service = service;
    autoBind(this);
  }

  async getBookingList(req, res, next) {
    try {
      const bookingList = await this.service.getBookingList(req.body);
      await res.status(200).json(bookingList);
    } catch (e) {
      next(e);
    }
  }

  async createOneBooking(req, res, next) {
    try {
      const createdBooking = await this.service.createBooking(req.body);
      await res.status(200).json(createdBooking);
    } catch (e) {
      next(e);
    }
  }

  async updateOneBooking(req, res, next) {
    try {
      const updatedBooking = await this.service.updateBooking(req.body);

      await res.status(200).json(updatedBooking);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new BookingController(bookingService);
