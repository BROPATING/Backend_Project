// require('dotenv').config({path: './env'}); // It reduces the overall consistency of the code.
import dotenv from 'dotenv';
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
});

connectDB()  // It returns the promise
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at PORT ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO DB Connection Failed !!! "+err);
    process.exit(1);
});


/*
import express from "express";

const app = express();

// Using efi ()() declare function and execute it currently
// ; is used to clean the code like if in earlier line no ; 
// is declare thus create a problem in the code exection 


;(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);

        app.on("error", (error) => {
            console.log("ERRR: ", error);
        });

        app.listen(process.env.PORT, ()=> {
            console.log(`APP is listening in port: ${process.env.PORT}`);
        });

    } catch (e) {
        console.log("Error: "+e);
        throw e;
    }
})()
*/



