const express = require("express");
const { processStripePayment, sendStripeApiKey } = require("../controllers/paymentController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/stripe/payment/process").post(isAuthenticatedUser, processStripePayment);
router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);

module.exports = router;