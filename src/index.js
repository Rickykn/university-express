const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT

app.get("/", (req, res) => {
  res.send("University API")
})

const {
  studentRoutes,
  lecturerRoutes,
  classRoutes,
  facultyRoutes,
  clubRoutes
} = require("./routes")

app.use("/students", studentRoutes)
app.use("/lecturers", lecturerRoutes)
app.use("/classes", classRoutes)
app.use("/faculties", facultyRoutes)
app.use("/clubs", clubRoutes)

app.use((req, res) => {
  return res.status(500).json({
    message: "Server error"
  })
})

app.listen(PORT, () => {
  console.log("Listening in port", PORT)
})