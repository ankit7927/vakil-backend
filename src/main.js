require("dotenv").config()
const express = require("express");
const connectDB = require("./configs/db.config");
const mongoose = require("mongoose");


const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false, }));

app.get("/", (req, res) => { res.json({ message: "OK" }) });

app.use("/auth", require("./routes/authRoute"));
app.use("/category", require("./routes/categoryRoute"));

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 5000;
    console.log(err.message, err.stack);
    res.status(statusCode).json({ message: err.message })
});

connectDB();

mongoose.connection.once("open", () => {
    console.log("connected to database");
    app.listen(port, "0.0.0.0", () => console.log("server started"));
});

mongoose.connection.on("error", (error) => console.log(error));

