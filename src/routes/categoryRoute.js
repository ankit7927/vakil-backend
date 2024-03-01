const categoryController = require("../controllers/category");

const router = require("express").Router();

router.route("/category")
    .get(categoryController.allCategory)
    .post(categoryController.createCategory)
    .put(categoryController.updateCategory)

router.route("/subcategory")
    .post(categoryController.addSubCategory)
    .delete(categoryController.deleteSubCategory)

module.exports = router;