const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const { logger } = require("./middlewares/logger")

require("dotenv").config({ path: "./.env" })

const app = express()
app.use(cors())
app.use(express.json())
app.use(logger)

app.use("/api/auth", require("./routes/auth.routes"))

app.use("*", (req, res) => {
    res.status(404).json({ message: "resouce not found" })
})

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message || "something went wrong" })
})
mongoose.connect(process.env.MONGO_URL)

mongoose.connection.once("open", () => {
    console.log("mongodb connected");
    app.listen(process.env.PORT, console.log("server running"))
})

