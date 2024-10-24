import { Router } from "express";
const router = Router();
import { getCoListUsers } from "../controller/company/coUsersController.js";

router.route(`/users`).get(getCoListUsers);

export default router;
