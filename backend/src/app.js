import express from "express";
import cors from 'cors';
import dbConnection from "../database/db.js";
import routerContact from "../routes/contact.js";



let app= express();
app.use(cors());
app.use(express.json());

dbConnection();

app.use("/api/contacts",routerContact);

app.listen(9000, () => console.log("Server running on port 9000"));