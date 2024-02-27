import express from "express";
import {
  createListing,
  deleteListing,
  getAllListings,
  getListing,
  updateListing,
} from "../controllers/jobListing.controller.js";
import { verifyJWT } from "../middlewares/authentication.middleware.js";
import { authorizeCompany } from "../middlewares/authorization.middleware.js";
export const jobListingRouter = express.Router();

jobListingRouter.get("/", verifyJWT, authorizeCompany, getAllListings);
jobListingRouter.post("/create", verifyJWT, authorizeCompany, createListing);
jobListingRouter.route("/:id").get(verifyJWT, authorizeCompany, getListing);
jobListingRouter
  .route("/update/:id")
  .patch(verifyJWT, authorizeCompany, updateListing);
jobListingRouter
  .route("/delete/:id")
  .delete(verifyJWT, authorizeCompany, deleteListing);
