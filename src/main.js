const express = require("express");
const connectDB = require("./configs/db.config");
const mongoose = require("mongoose");


const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false, }));

app.use("/", (req, res) => { res.json({ message: "OK" }) })

connectDB()

mongoose.connection.once("open", () => {
    console.log("connected to database");
    app.listen(port, "0.0.0.0", () => {
        console.log("server started");
    })
})

mongoose.connection.on("error", (error) => {
    console.log(error);
})

