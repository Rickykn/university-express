const { query } = require("../database")

const facultyControllers = {
  getFaculties: async (req, res, next) => {
    try {
      const sql = `SELECT * FROM faculties;`

      const dbResult = await query(sql);

      return res.status(200).json({
        message: "Find faculties",
        result: dbResult
      })
    } catch (err) {
      next()
    }
  },
  createFaculty: async (req, res, next) => {
    try {
      const { faculty_name, dean_id } = req.body

      const sql = `INSERT INTO faculties VALUES (0, ?, ?)`

      const replacements = [faculty_name, dean_id];

      await query(sql, replacements);

      return res.status(201).json({
        message: "Created faculty"
      })
    } catch (err) {
      next()
    }
  },
  editFacultyById: async (req, res, next) => { },
  deleteFacultyById: async (req, res, next) => {
    try {
      const { id } = req.params

      const sql = `DELETE FROM faculties WHERE id = ?`

      await query(sql, [id])

      return res.status(200).json({
        message: "Deleted faculty"
      })
    } catch (err) {
      next()
    }
  },
}

module.exports = facultyControllers