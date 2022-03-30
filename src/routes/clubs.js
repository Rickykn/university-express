const { clubControllers } = require("../controllers");

const router = require("express").Router();

router.get("/", clubControllers.getClubs)
router.post("/", clubControllers.createClub)
router.patch("/:id", clubControllers.editClubById)
router.delete("/:id", clubControllers.deleteClubById)

module.exports = router