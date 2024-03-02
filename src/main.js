require("dotenv").config()
const express = require("express");
const connectDB = require("./configs/db.config");
const mongoose = require("mongoose");


const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false, }));
if (process.env.NODE_ENV="dev") {
    const morgan = require("morgan");
    app.use(morgan("dev"))
}

app.get("/", (req, res) => { res.json({ message: "OK" }) });

app.use("/auth", require("./routes/authRoute"));
app.use("/category", require("./routes/categoryRoute"));

app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    res.status(statusCode).json({ message: err.message })
});

connectDB();

mongoose.connection.once("open", () => {
    console.log("connected to database");
    app.listen(port, "0.0.0.0", () => console.log("server started"));
});

mongoose.connection.on("error", (error) => console.log(error));

