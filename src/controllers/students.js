const { query } = require("../database")

const studentControllers = {
  getStudents: async (req, res, next) => {
    try {
      const sql = `SELECT * FROM students;`

      const dbResult = await query(sql);

      return res.status(200).json({
        message: "Find students",
        result: dbResult
      })
    } catch (err) {
      next()
    }
  },
  createStudent: async (req, res, next) => {
    try {
      const { student_name, faculty_id } = req.body

      const sql = `INSERT INTO students VALUES (0, ?, ?)`

      const replacements = [student_name, faculty_id];

      await query(sql, replacements);

      return res.status(201).json({
        message: "Created student"
      })
    } catch (err) {
      next()
    }
  },
  editStudentById: async (req, res, next) => { },
  deleteStudentById: async (req, res, next) => {
    try {
      const { id } = req.params

      const sql = `DELETE FROM students WHERE id = ?`

      await query(sql, [id])

      return res.status(200).json({
        message: "Deleted student"
      })
    } catch (err) {
      next()
    }
  },
  addStudentToClass: async (req, res, next) => {
    try {
      const { studentId } = req.params;
      const { class_id } = req.body;

      const findStudentSQL = `
        SELECT * FROM class_student WHERE student_id = ? AND class_id = ?
      `
      const replacements = [studentId, class_id]

      const findStudents = await query(findStudentSQL, replacements)

      if (findStudents.length) {
        return res.status(400).json({
          message: "Student has already joined the class"
        })
      }

      const sql = `INSERT INTO class_student VALUES (0, ?, ?)`

      await query(sql, replacements)

      return res.status(201).json({
        message: `Added student to class`
      })

    } catch (err) {
      next();
    }
  },
  addStudentToClub: async (req, res, next) => {
    try {
      const { studentId } = req.params;
      const { club_id } = req.body;

      const findStudentSQL = `
        SELECT * FROM club_student WHERE student_id = ? AND club_id = ?
        `
      const replacements = [studentId, club_id]

      const findStudents = await query(findStudentSQL, replacements)

      if (findStudents.length) {
        return res.status(400).json({
          message: "Student has already joined the club"
        })
      }

      const sql = `INSERT INTO club_student VALUES (0, ?, ?)`

      await query(sql, replacements)

      return res.status(201).json({
        message: `Added student to club`
      })

    } catch (err) {
      next()
    }
  },
  removeStudentFromClub: async (req, res, next) => {
    try {
      const { studentId, clubId } = req.params;

      // Check if student is the club leader
      const isClubLeaderSQL = `SELECT * FROM clubs WHERE leader_id = ? AND id = ?`

      const isClubLeaderResult = await query(isClubLeaderSQL, [studentId, clubId])

      // If student is the club leader, remove them from the leader position
      if (isClubLeaderResult.length) {
        await query(
          "UPDATE clubs SET leader_id = null WHERE id = ?",
          [clubId]
        )
      }

      // ================= Safe Mode OFF ==========================
      // Delete student by club_id and student_id (safe_mode OFF)
      // const deleteStudentFromClubSQL = `
      //   DELETE FROM club_student 
      //   WHERE club_id = ? AND student_id = ?;
      // `
      // await query(deleteStudentFromClubSQL, [clubId, studentId])
      // ================= Safe Mode OFF ==========================



      // ================= Safe Mode ON ==========================
      // Find the relationship record of student and club
      // We do this to get the id of the record
      const findStudentClub = `
        SELECT * FROM club_student WHERE club_id = ? AND student_id = ?
      `
      const findStudentClubResult = await query(findStudentClub, [clubId, studentId])

      await query(
        `DELETE FROM club_student WHERE id = ?`,
        [findStudentClubResult[0].id]
      )
      // ================= Safe Mode ON ==========================

      return res.status(200).json({
        message: "Removed student from club"
      })

    } catch (err) {
      console.log(err)
      next()
    }
  }
}

module.exports = studentControllers