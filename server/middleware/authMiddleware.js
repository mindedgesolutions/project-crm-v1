import { body } from "express-validator";
import { withValidationErrors } from "./withErrorsMiddleware.js";

export const validateAdSignin = withValidationErrors([
  body("username")
    .notEmpty()
    .withMessage(`Username is required`)
    .bail()
    .isEmail()
    .withMessage(`Username must be a valid email`),
  body("password").notEmpty().withMessage(`Password is required`),
]);
