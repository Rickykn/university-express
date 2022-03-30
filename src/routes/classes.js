const { classControllers } = require("../controllers");

const router = require("express").Router();

router.get("/", classControllers.getClasses)
router.post("/", classControllers.createClass)
router.patch("/:id", classControllers.editClassById)
router.delete("/:id", classControllers.deleteClassById)

module.exports = router