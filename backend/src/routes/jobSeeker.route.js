import express from "express";
import {
  getCurrentJobSeeker,
  loginJobSeeker,
  logoutJobSeeker,
  registerJobSeeker,
} from "../controllers/jobSeeker.controller.js";
export const jobSeekerRouter = express.Router();

jobSeekerRouter.post("/login", loginJobSeeker);
jobSeekerRouter.route("/register").post(registerJobSeeker);
jobSeekerRouter.post("/logout", logoutJobSeeker);
jobSeekerRouter.get("/current_job_seeker", getCurrentJobSeeker);
