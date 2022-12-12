const mongoose = require("mongoose");


if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({
        path: "backend/config/config.env"
    });
}

const password = process.env.DATABASE_PASSWORD;

const atlasUri = `mongodb+srv://vishal26up:${password}@cluster0.tokvlep.mongodb.net/Cartogram?retryWrites=true&w=majority`

// const mongodbUri = "mongodb://localhost:27017/Cartogram?readPreference=primary&appname=MongoDB%20Compass&ssl=false"


const connectDatabase = () =>{
    mongoose.connect(atlasUri, {
        useNewUrlParser:true, useUnifiedTopology:true}).then((data)=>{
        console.log(`Database connected with server: ${data.connection.host}`);
    })
}

module.exports = connectDatabase;