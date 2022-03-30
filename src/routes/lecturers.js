const { lecturerControllers } = require("../controllers");

const router = require("express").Router();

router.get("/", lecturerControllers.getLecturers)
router.post("/", lecturerControllers.createLecturer)
router.patch("/:id", lecturerControllers.editLecturerById)
router.delete("/:id", lecturerControllers.deleteLecturerById)

module.exports = router