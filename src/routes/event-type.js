const EventTypeController = require("../controllers/EventTypeController");
const AuthController = require("../controllers/AuthController");

const express = require("express"),
  router = express.Router();

router.get(
  "/",
  AuthController.checkLogin,
  EventTypeController.getEventTypeList
);
router.post(
  "/",
  AuthController.checkLogin,
  EventTypeController.createEventType
);
router.put("/", AuthController.checkLogin, EventTypeController.updateEventType);

router.delete(
  "/",
  AuthController.checkLogin,
  EventTypeController.deleteEventType
);

module.exports = router;
