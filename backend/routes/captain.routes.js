const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const controller = require("../controllers/captain.controller.js");
const authMiddleware = require("../middlewares/auth.middleware.js");
router.post("/register",
    [
        body("email").isEmail().withMessage("Invalid Email"),
        body("fullname")
            .isLength({ min: 3 })
            .withMessage("First name must be at least 3 characters long"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters long"),
        body("vechile.color")
            .isLength({ min: 3 })
            .withMessage("Color must be at least 3 characters long"),
        body("vechile.plate")
            .isLength({ min: 3 })
            .withMessage("Plate must be at least 3 characters long"),
        body("vechile.vechileType")
            .isIn(['car', 'auto', 'bike'])
            .withMessage("Invalid vechile type"),
    ],
    controller.captainRegister
)
router.post("/login", [

    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
], controller.captainLogin);

router.get("/profile", authMiddleware.authCaptain, controller.captainProfile);
router.post("/logout", authMiddleware.authCaptain, controller.captainLogout);

module.exports = router;