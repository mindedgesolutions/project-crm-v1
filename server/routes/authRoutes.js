import { Router } from "express";
const router = Router();
import {
  signIn,
  currentUser,
  logout,
  loginStatus,
  cSignIn,
} from "../controller/authController.js";
import { validateAdSignin } from "../middleware/authMiddleware.js";

router.post(`/sign-in`, validateAdSignin, signIn);
router.get(`/current-user`, currentUser);
router.post(`/logout`, logout);
router.get(`/check-login`, loginStatus);

router.post(`/company/sign-in`, validateAdSignin, cSignIn);

export default router;
