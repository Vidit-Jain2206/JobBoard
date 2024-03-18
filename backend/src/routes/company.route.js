import express from "express";
import { verifyJWT } from "../middlewares/authentication.middleware.js";
import {
  getCurrentCompany,
  loginCompany,
  logoutCompany,
  registerCompany,
  updateCompanyDetails,
} from "../controllers/company.controller.js";
import { authorizeCompany } from "../middlewares/authorization.middleware.js";
export const companyRouter = express.Router();

companyRouter.post("/login", loginCompany);
companyRouter.post("/register", registerCompany);
companyRouter.post("/logout", verifyJWT, authorizeCompany, logoutCompany);
companyRouter.get(
  "/current_company",
  verifyJWT,
  authorizeCompany,
  getCurrentCompany
);

companyRouter.patch(
  "/update_company_details/:id",
  verifyJWT,
  authorizeCompany,
  updateCompanyDetails
);
