import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import db from "./config/database";
import authRoutes from "./routes/auth.routes";

const app = express();

const port = process.env.PORT || 5000;
const apiVersion = "/api/v1";

db.authenticate()
	.then(() => console.log("Database connected..."))
	.catch((err: any) => console.log("Error: " + err));

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get(`${apiVersion}/`, (req, res) => {
	res.json({ message: "Welcome to Stock Savvy application." });
});

app.use(`${apiVersion}`, authRoutes);

app.use(`${apiVersion}/users`, userRoutes);

app.listen(port, () => {
	console.log(`server started, listinig on port ${port}`);
});