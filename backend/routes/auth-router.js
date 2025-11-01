const express = require("express")
const router = express.Router()
const authcontroller = require("../controller/auth-controller")
// const signupSchema=require("../validators/auth-validator")
// const loginSchema=require("../validators/auth-validator")
const { signupSchema, loginSchema } = require("../validators/auth-validator");
const validate=require("../middlewares/validates-middleware")
const authMiddleware=require("../middlewares/auth-middleware")



router.route("/").get(authcontroller.home) // ⬅️ GET /api/auth/
router.route("/signup").post(validate(signupSchema),authcontroller.signup) // ⬅️ POST /api/auth/register
router.route("/login").post(validate(loginSchema),authcontroller.login)
router.route("/user").get(authMiddleware,authcontroller.user)

module.exports = router
