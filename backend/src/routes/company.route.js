import express from "express";
export const companyRouter = express.Router();

companyRouter.post("/login", loginCompany);
companyRouter.post("/register", registerCompany);
companyRouter.post("/logout", logoutCompany);
companyRouter.get("/current_company", getCurrentCompany);
