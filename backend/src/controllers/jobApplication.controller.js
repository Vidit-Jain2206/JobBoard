import { prisma } from "../../prisma/index.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

export const createJobApplication = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const listingId = Number(id);
  if (!id) {
    throw new ApiError(400, "id is required");
  }
  const listing = await prisma.jobListing.findFirst({
    where: { id: listingId },
  });
  if (!listing) {
    throw new ApiError(404, "Listing not found");
  }
  const isApplicationExist = await prisma.jobApplication.findFirst({
    where: {
      AND: {
        user: {
          id: req.user.jobSeeker.id,
        },
        jobListing: {
          id: listingId,
        },
      },
    },
  });
  console.log(isApplicationExist);
  if (isApplicationExist) {
    throw new ApiError(400, "Application already exists");
  }
  const user = await prisma.user.findFirst({ where: { id: req.user.id } });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const application = await prisma.jobApplication.create({
    data: {
      user: {
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
    include: {
      user: {
        select: {
          username: true,
          email: true,
        },
      },
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
    throw new ApiError(400, "Application cannot be created");
  }
  res
    .status(200)
    .json(
      new ApiResponse(200, "Application created successfully", application)
    );
});

export const getJobApplication = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const applicationId = Number(id);
  if (!id) {
    throw new ApiError(400, "id is required");
  }
  const application = await prisma.jobApplication.findFirst({
    where: { id: applicationId },
    include: {
      user: {
        select: {
          username: true,
          email: true,
        },
      },
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
export const getAllMyJobApplications = asyncHandler(async (req, res) => {
  console.log("Hello", req.user);
  const applications = await prisma.jobApplication.findMany({
    where: { user_id: { id: req.user.id } },
    include: {
      user: {
        select: {
          username: true,
          email: true,
        },
      },
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
  if (!applications) {
    throw new ApiError(404, "Applications not found");
  }
  res
    .status(200)
    .json(
      new ApiResponse(200, "Applications fetched successfully", applications)
    );
});
