const { facultyControllers } = require("../controllers");

const router = require("express").Router();

router.get("/", facultyControllers.getFaculties)
router.post("/", facultyControllers.createFaculty)
router.patch("/:id", facultyControllers.editFacultyById)
router.delete("/:id", facultyControllers.deleteFacultyById)

module.exports = router