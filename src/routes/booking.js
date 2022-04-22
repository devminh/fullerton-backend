const BookingController = require("../controllers/BookingController");
const express = require("express"),
  router = express.Router();

router.post("/booking-list", BookingController.getBookingList);
router.post("/", BookingController.createOneBooking);
router.put("/", BookingController.updateOneBooking);

module.exports = router;
