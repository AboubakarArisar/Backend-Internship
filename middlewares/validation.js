const { body, query, validationResult } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    });
  }
  next();
};

const validateBook = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 1, max: 200 })
    .withMessage("Title must be between 1 and 200 characters"),

  body("author")
    .trim()
    .notEmpty()
    .withMessage("Author is required")
    .isLength({ min: 1, max: 100 })
    .withMessage("Author must be between 1 and 100 characters"),

  body("price")
    .isNumeric()
    .withMessage("Price must be a number")
    .isFloat({ min: 0 })
    .withMessage("Price must be greater than or equal to 0"),

  body("isbn")
    .trim()
    .notEmpty()
    .withMessage("ISBN is required")
    .isLength({ min: 10, max: 17 })
    .withMessage("ISBN must be between 10 and 17 characters"),

  body("publishedDate")
    .isISO8601()
    .withMessage("Published date must be a valid date"),

  handleValidationErrors,
];

const validateBookUpdate = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage("Title must be between 1 and 200 characters"),

  body("author")
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Author must be between 1 and 100 characters"),

  body("price")
    .optional()
    .isNumeric()
    .withMessage("Price must be a number")
    .isFloat({ min: 0 })
    .withMessage("Price must be greater than or equal to 0"),

  body("isbn")
    .optional()
    .trim()
    .isLength({ min: 10, max: 17 })
    .withMessage("ISBN must be between 10 and 17 characters"),

  body("publishedDate")
    .optional()
    .isISO8601()
    .withMessage("Published date must be a valid date"),

  handleValidationErrors,
];

const validateUser = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),

  body("email")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  handleValidationErrors,
];

const validateUserLogin = [
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),

  body("password").notEmpty().withMessage("Password is required"),

  handleValidationErrors,
];

const validatePagination = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),

  query("search")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Search term must be less than 100 characters"),

  handleValidationErrors,
];

module.exports = {
  validateBook,
  validateBookUpdate,
  validateUser,
  validateUserLogin,
  validatePagination,
  handleValidationErrors,
};
