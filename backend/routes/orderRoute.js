const express = require("express");
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder, cancelOrder, getAllTodaysOrders } = require("../controllers/orderController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder).delete(isAuthenticatedUser, cancelOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);
router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("Owner","Admin"),getAllOrders);
router.route("/admin/orders/today").get(isAuthenticatedUser, authorizeRoles("Owner","Admin"),getAllTodaysOrders);
router.route("/admin/order/:id").put(isAuthenticatedUser, authorizeRoles("Owner","Admin"), updateOrder).delete(isAuthenticatedUser, authorizeRoles("Owner","Admin"), deleteOrder);

module.exports = router;