import express from "express";
import {
  getCurrentJobSeeker,
  loginJobSeeker,
  logoutJobSeeker,
  registerJobSeeker,
  updateJobSeekerAccountDetails,
} from "../controllers/jobSeeker.controller.js";
import { verifyJWT } from "../middlewares/authentication.middleware.js";
import { authorizeJobSeeker } from "../middlewares/authorization.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
export const jobSeekerRouter = express.Router();

jobSeekerRouter.post("/login", loginJobSeeker);
jobSeekerRouter.post("/register", upload.single("resume"), registerJobSeeker);
jobSeekerRouter.post("/logout", verifyJWT, authorizeJobSeeker, logoutJobSeeker);
jobSeekerRouter.get(
  "/current_job_seeker",
  verifyJWT,
  authorizeJobSeeker,
  getCurrentJobSeeker
);
jobSeekerRouter.patch(
  "/update_job_seeker_details",
  verifyJWT,
  authorizeJobSeeker,
  upload.single("resume"),
  updateJobSeekerAccountDetails
);
