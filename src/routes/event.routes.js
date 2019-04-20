import express from 'express';
// SERVICES.
import auth from '../services/auth';
// CONTROLLERS
import eventController from '../controllers/event.controller';

const router = express.Router();

router.post("/", auth, eventController.createEvent);
router.get("/", auth, eventController.getEvents);
router.put("/:id", auth, eventController.updateEvent);
router.delete("/:id", auth, eventController.deleteEvent);
router.post("/addUserToEvent/:id", auth, eventController.addUserToEvent);
router.post("/deleteUserFromEvent/:id", auth, eventController.deleteUserToEvent);
router.get("/inAdded", auth, eventController.inAdded);

export default router;
