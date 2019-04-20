import express from 'express';
// SERVICES.
import auth from '../services/auth';
// CONTROLLERS
import userController from '../controllers/user.controller';

const router = express.Router();

router.post("/signUp", userController.signUp);
router.post("/login", userController.login);

export default router;
