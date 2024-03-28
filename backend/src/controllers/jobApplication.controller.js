import { prisma } from "../../prisma/index.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

export const getAllMyJobApplications = asyncHandler(async (req, res, next) => {
  const applications = await prisma.jobApplication.findMany({
    where: { jobSeeker_id: req.user.jobSeeker.id },
    include: {
      jobSeeker: true,
      jobListing: {
        select: {
          id: true,
          title: true,
          description: true,
          description: true,
          skills_required: true,
          salary: true,
          experience: true,
          startDate: true,
          createdAt: true,
          location: true,
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
      },
    },
  });
  if (!applications) {
    next(new ApiError(404, "Applications not found"));
  }
  res
    .status(200)
    .json(
      new ApiResponse(200, "Applications fetched successfully", applications)
    );
});

export const createJobApplication = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const listingId = Number(id);
  if (!id) {
    next(new ApiError(400, "Id is required"));
  }
  const listing = await prisma.jobListing.findFirst({
    where: { id: listingId },
  });
  if (!listing) {
    next(new ApiError(400, "Listing not found"));
  }

  const user = await prisma.user.findFirst({ where: { id: req.user.id } });
  if (!user) {
    next(new ApiError(400, "User not found"));
  }
  const isApplicationExist = await prisma.jobApplication.findFirst({
    where: {
      AND: {
        jobSeeker: {
          id: req.user.jobSeeker.id,
        },
        jobListing: {
          id: listingId,
        },
      },
    },
  });

  if (isApplicationExist) {
    next(new ApiError(400, "Application already exists"));
  }

  const application = await prisma.jobApplication.create({
    data: {
      jobSeeker: {
        connect: {
          id: req.user.jobSeeker.id,
        },
      },
      jobListing: {
        connect: {
          id: listingId,
        },
      },
    },
  });
  if (!application) {
    next(new ApiError(400, "Application can not be created"));
  }
  res
    .status(200)
    .json(
      new ApiResponse(200, "Application created successfully", application)
    );
});

export const getJobApplication = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const applicationId = Number(id);
  if (!id) {
    throw new ApiError(400, "id is required");
  }
  const application = await prisma.jobApplication.findFirst({
    where: { id: applicationId },
    include: {
      jobSeeker: true,
      jobListing: {
        select: {
          id: true,
          title: true,
          description: true,
          description: true,
          skills_required: true,
          salary: true,
          experience: true,
          startDate: true,
          applyBy: true,
          location: true,
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
      },
    },
  });
  if (!application) {
    throw new ApiError(404, "Application not found");
  }
  res
    .status(200)
    .json(
      new ApiResponse(200, "Application fetched successfully", application)
    );
});
