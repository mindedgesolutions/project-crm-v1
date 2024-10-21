import { Router } from "express";
const router = Router();
import { adListUsers } from "../controller/admin/adUserController.js";
import {
  activatePlanAttribute,
  addNewPlan,
  addPlanAttribute,
  deleteListPlanAttribute,
  editPlanAttribute,
  getAllPlanAttributes,
  getListPlanAttributes,
  getListPlans,
} from "../controller/admin/adPlanController.js";
import {
  validateAddPlan,
  validatePlanAttribute,
} from "../middleware/planMiddleware.js";

router.get(`/users`, adListUsers);
// Plan attribute related starts ------
router
  .route(`/plan-attributes`)
  .post(validatePlanAttribute, addPlanAttribute)
  .get(getListPlanAttributes);
router
  .route(`/plan-attributes/:id`)
  .put(validatePlanAttribute, editPlanAttribute)
  .delete(deleteListPlanAttribute);
router.put(`/plan-attributes/activate/:id`, activatePlanAttribute);
router.get(`/plan-attributes/all`, getAllPlanAttributes);
// Plan attribute related ends ------

// Plan related starts ------
router.route(`/plans`).post(validateAddPlan, addNewPlan).get(getListPlans);
// Plan related ends ------

export default router;
