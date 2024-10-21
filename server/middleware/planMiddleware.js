import { body } from "express-validator";
import { withValidationErrors } from "./withErrorsMiddleware.js";
import slug from "slug";
import { BadRequestError } from "../errors/customErrors.js";
import pool from "../../db.js";

export const validatePlanAttribute = withValidationErrors([
  body("attribute")
    .notEmpty()
    .withMessage("Attribute is required")
    .bail()
    .isLength({ min: 3, max: 255 })
    .withMessage("Attribute must be between 3 to 255 characters")
    .bail()
    .custom(async (value, { req }) => {
      const { id } = req.params;
      const attrSlug = slug(value);
      const query = id ? `slug=$1 and id!=$2` : `slug=$1`;
      const values = id ? [attrSlug, id] : [attrSlug];
      const data = await pool.query(
        `select count(id) from plan_attributes where ${query}`,
        values
      );
      if (data.rows[0].count > 0) {
        throw new BadRequestError(`Attribute exists`);
      }
      return true;
    }),
  body("type").notEmpty().withMessage("Select attribute type"),
]);
