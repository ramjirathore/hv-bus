
import express from "express";
import userController from '../controllers/user.controller'
import auth from "../middleware/auth";

const router = express.Router();

router.get('/get-users', auth.authenticateToken, auth.restrictTo('admin'), userController.getAllUsers);

router.post('/register-user', userController.registerUser);
router.post('/register-admin', userController.registerAdmin);
router.post('/login-user', userController.loginUser);
router.post('/login-admin', userController.loginAdmin);

export = router;