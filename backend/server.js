const app = require("./app");
const cloudinary = require('cloudinary').v2;

// Handling Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
})



if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({
        path: "backend/config/config.env"
    });
}

// Connecting to database
const connectDatabase = require("./config/database");

connectDatabase();

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    const status = err.status || 500;
    res.status(status);
    res.render('error');
  });

const port = process.env.PORT;

const server = app.listen(process.env.PORT||4000, ()=>{
    console.log(`Server is working on http://localhost:${port}`);
})

// Unhandled Promise Rejection
process.on("unhandledRejection", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(()=>{
        process.exit(1);
    });
})
