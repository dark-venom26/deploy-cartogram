const cookieParser = require("cookie-parser");
const express = require("express");
const morgan = require('morgan');
const app = express();
const errorMiddleware = require("./middleware/error");
const cors = require('cors');
const fileUpload = require("express-fileupload")
const path = require("path");

if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({
        path: "backend/config/config.env"
    });
}

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(morgan("common"));
app.use(cookieParser());
app.use(cors())
app.use(express.urlencoded({limit: "50mb", extended: true}));
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true
}));

// Route Imports
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");
const paymentRoute = require("./routes/paymentRoute");

app.use("/api/v1", productRoute)
app.use("/api/v1", userRoute)
app.use("/api/v1", orderRoute)
app.use("/api/v1", paymentRoute)

app.use(express.static(path.join(__dirname,"../frontend/build")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
})

// Middleware for errors
app.use(errorMiddleware);

module.exports = app;
