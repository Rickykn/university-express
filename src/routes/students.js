const { studentControllers } = require("../controllers");

const router = require("express").Router();

router.get("/", studentControllers.getStudents)
router.post("/", studentControllers.createStudent)
router.patch("/:id", studentControllers.editStudentById)
router.delete("/:id", studentControllers.deleteStudentById)

router.post("/:studentId/class", studentControllers.addStudentToClass)
router.post("/:studentId/club", studentControllers.addStudentToClub)

router.delete("/:studentId/club/:clubId", studentControllers.removeStudentFromClub)

module.exports = router