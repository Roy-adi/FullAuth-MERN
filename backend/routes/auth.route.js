import { Router } from "express";
import { forgotPassword, login, resetPassword, signup, userDetails, verifyEmail } from '../controller/authController.js';
import { authenticateToken } from "../utils/JwtVerify.js";

const router = Router()

router.route('/signup').post(signup);
router.route('/verfymail').post(verifyEmail);
router.route('/login').post(login)
router.route('/userDetails').post(authenticateToken, userDetails)
router.route('/forget-password').post(forgotPassword)
router.route("/reset-password/:token").post(resetPassword);

export default router