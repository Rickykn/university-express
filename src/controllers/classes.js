const { query } = require("../database");

const classControllers = {
  getClasses: async (req, res, next) => {
    try {
      const sql = `SELECT * FROM classes;`;

      const dbResult = await query(sql);

      return res.status(200).json({
        message: "Find classes",
        result: dbResult,
      });
    } catch (err) {
      next();
    }
  },
  getStudentByClassId: async (req, res) => {
    try {
      const { classId } = req.params;

      let sqlQuery = `SELECT * FROM students as s
      JOIN class_student as cs on cs.student_id = s.id
      WHERE cs.class_id = ${classId};`;

      const dbResult = await query(sqlQuery);

      return res.status(200).json({
        message: "Find student",
        result: dbResult,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "server error",
      });
    }
  },
  createClass: async (req, res, next) => {
    try {
      const { class_name, lecturer_id } = req.body;

      const sql = `INSERT INTO classes VALUES (0, ?, ?)`;

      const replacements = [class_name, lecturer_id];

      await query(sql, replacements);

      return res.status(201).json({
        message: "Created class",
      });
    } catch (err) {
      next();
    }
  },
  editClassById: async (req, res, next) => {},
  deleteClassById: async (req, res, next) => {
    try {
      const { id } = req.params;

      const sql = `DELETE FROM classes WHERE id = ?`;

      await query(sql, [id]);

      return res.status(200).json({
        message: "Deleted class",
      });
    } catch (err) {
      next();
    }
  },
};

module.exports = classControllers;
