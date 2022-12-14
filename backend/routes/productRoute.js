const express = require("express");
const {getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview, getAdminProducts } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route('/products').get(getAllProducts);

router.route('/admin/products').get(isAuthenticatedUser, authorizeRoles("Owner","Admin"), getAdminProducts);

router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRoles("Owner","Admin"), createProduct);

router.route("/admin/product/:id").put(isAuthenticatedUser, authorizeRoles("Owner","Admin"), updateProduct).delete(isAuthenticatedUser, authorizeRoles("Owner","Admin"), deleteProduct);

router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser, createProductReview);

router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser, deleteReview);

module.exports = router;