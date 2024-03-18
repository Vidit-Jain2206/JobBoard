import express from "express";
import {
  createJobApplication,
  getAllMyJobApplications,
  getJobApplication,
} from "../controllers/jobApplication.controller.js";
import { verifyJWT } from "../middlewares/authentication.middleware.js";
import { authorizeJobSeeker } from "../middlewares/authorization.middleware.js";

export const jobApplicationRouter = express.Router();

jobApplicationRouter.post(
  "/create/:id",
  verifyJWT,
  authorizeJobSeeker,
  createJobApplication
);
// jobApplicationRouter.route("/:id").get(getJobApplication);

jobApplicationRouter.get(
  "/my_applications",
  verifyJWT,
  authorizeJobSeeker,
  getAllMyJobApplications
);
