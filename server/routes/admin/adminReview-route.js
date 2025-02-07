const express = require("express");

const {
getProductsReviewsAdmin
} = require("../../controllers/admin/review-controller");

const router = express.Router();


router.get("/get",getProductsReviewsAdmin);

module.exports = router;