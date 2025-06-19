require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const submissionRoutes = require("./routes/submission")

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:",err))

  
app.get("/", (req, res) => {
  res.send("Compiler backend is running!");
});

app.use("/api/submission", submissionRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
