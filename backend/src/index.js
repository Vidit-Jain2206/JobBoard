import "dotenv/config";

import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

import { companyRouter } from "./routes/company.route.js";
import { jobSeekerRouter } from "./routes/jobSeeker.route.js";
export const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

app.use("/api/v1/job_seeker", jobSeekerRouter);
app.use("/api/v1/company", companyRouter);

app.get("/", (req, res) => {
  res.send("hi iam fd");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT:- ${PORT}`);
});
