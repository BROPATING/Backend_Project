import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT|| 8000;

app.use(cors({
    origin: process.env.CORS_ORIGIN,   // ctr + space to see other options
    credentials: true
}))

app.use(express.json({ limit: "16KB" }))
app.use(express.urlencoded({extended: true, limit: "16KB"})) // Handle the url 
app.use(express.static("public")); // If having any images it store in public folder
app.use(cookieParser());

// route import
import userRouter from './routes/user.routes.js';

// routes decalration 
// app.use("/users", userRouter);
//https://localhost:8000/users/register
app.use("/api/v1/users", userRouter);

export { app }