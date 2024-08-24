import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import {connectDb} from './db/connectDb.js';
import cors from "cors";
import path from "path";


const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(cors({ origin: "*" }));

app.use(express.json()); // allows us to parse incoming requests:req.body
app.use(cookieParser()); // allows us to parse incoming cookies

import authRoute from './routes/auth.route.js'
app.use('/api/v1/auth', authRoute)

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "frontend", "dist", "server.html"));
});

app.listen(PORT, () => {
	connectDb();
	console.log("Server is running on port: ", PORT);
});