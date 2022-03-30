const { query } = require("../database")

const lecturerControllers = {
  getLecturers: async (req, res, next) => {
    try {
      const sql = `SELECT * FROM lecturers;`

      const dbResult = await query(sql);

      return res.status(200).json({
        message: "Find lecturers",
        result: dbResult
      })
    } catch (err) {
      next()
    }
  },
  createLecturer: async (req, res, next) => {
    try {
      const { lecturer_name } = req.body

      const sql = `INSERT INTO lecturers VALUES (0, ?)`

      const replacements = [lecturer_name];

      await query(sql, replacements);

      return res.status(201).json({
        message: "Created lecturer"
      })
    } catch (err) {
      next()
    }
  },
  editLecturerById: async (req, res, next) => { },
  deleteLecturerById: async (req, res, next) => {
    try {
      const { id } = req.params

      const sql = `DELETE FROM lecturers WHERE id = ?`

      await query(sql, [id])

      return res.status(200).json({
        message: "Deleted lecturer"
      })
    } catch (err) {
      next()
    }
  },
}

module.exports = lecturerControllers