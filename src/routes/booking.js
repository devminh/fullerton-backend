const BookingController = require("../controllers/BookingController");
const AuthController = require("../controllers/AuthController");
const express = require("express"),
  router = express.Router();

router.post(
  "/booking-list",
  AuthController.checkLogin,
  BookingController.getBookingList
);
router.post("/", AuthController.checkLogin, BookingController.createOneBooking);
router.put("/", AuthController.checkLogin, BookingController.updateOneBooking);

module.exports = router;
