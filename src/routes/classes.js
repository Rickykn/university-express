const { classControllers } = require("../controllers");

const router = require("express").Router();

router.get("/", classControllers.getClasses);
router.post("/", classControllers.createClass);
router.patch("/:id", classControllers.editClassById);
router.delete("/:id", classControllers.deleteClassById);
router.get("/:classId/students", classControllers.getStudentByClassId);

module.exports = router;
