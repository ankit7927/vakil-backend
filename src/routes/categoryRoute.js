const categoryController = require("../controllers/category");

const router = require("express").Router();

router.route("/category")
    .get(categoryController.allCategory)
    .post(categoryController.createCategory)
    .put(categoryController.updateCategory)

module.exports = router;