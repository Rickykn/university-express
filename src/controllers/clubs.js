const { query } = require("../database")

const clubControllers = {
  getClubs: async (req, res, next) => {
    try {
      const sql = `SELECT * FROM clubs;`

      const dbResult = await query(sql);

      return res.status(200).json({
        message: "Find clubs",
        result: dbResult
      })
    } catch (err) {
      next()
    }
  },
  createClub: async (req, res, next) => {
    try {
      const { club_name, leader_id } = req.body

      const sql = `INSERT INTO clubs VALUES (0, ?, ?)`

      const replacements = [club_name, leader_id];

      await query(sql, replacements);

      return res.status(201).json({
        message: "Created club"
      })
    } catch (err) {
      next()
    }
  },
  editClubById: async (req, res, next) => { },
  deleteClubById: async (req, res, next) => {
    try {
      const { id } = req.params

      const sql = `DELETE FROM clubs WHERE id = ?`

      await query(sql, [id])

      return res.status(200).json({
        message: "Deleted club"
      })
    } catch (err) {
      next()
    }
  },
}

module.exports = clubControllers