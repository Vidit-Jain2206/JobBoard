import { prisma } from "../../prisma/index.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

export const authorizeJobSeeker = asyncHandler(async (req, res, next) => {
  try {
    const user = req.user;
    if (user.role_id !== 1) {
      throw new ApiError(401, "Only JobSeekers can access ");
    }
    const job_seeker = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        username: true,
        email: true,
        role_id: true,
        jobSeeker: {
          select: {
            id: true,
            resume: true,
            education: true,
            experience: true,
            skills: true,
          },
        },
      },
    });
    if (!job_seeker) {
      throw new ApiError(404, "Job seeker not found");
    }
    req.user = job_seeker;
    next();
  } catch (error) {
    throw new ApiError(400, error.message || "Unauthorized");
  }
});

export const authorizeCompany = asyncHandler(async (req, res, next) => {
  try {
    const user = req.user;
    if (user.role_id !== 2) {
      throw new ApiError(401, "Only Company can access ");
    }
    const company = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        username: true,
        email: true,
        role_id: true,
        company: {
          select: {
            id: true,
            company_name: true,
            location: true,
            website: true,
            description: true,
          },
        },
      },
    });
    if (!company) {
      throw new ApiError(404, "company not found");
    }
    req.user = company;
    next();
  } catch (error) {
    throw new ApiError(400, error.message || "Unauthorized");
  }
});
