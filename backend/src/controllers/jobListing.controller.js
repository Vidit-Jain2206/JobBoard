import { prisma } from "../../prisma/index.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

export const getAllListings = asyncHandler(async (req, res, next) => {
  const listings = await prisma.jobListing.findMany({
    include: { company: true },
  });
  res
    .status(200)
    .json(new ApiResponse(200, "Listings fetched successfully", listings));
});
export const createListing = asyncHandler(async (req, res, next) => {
  const {
    title,
    description,
    skills_required,
    salary,
    experience,
    startDate,
    location,
  } = req.body;
  if (
    !title &&
    !description &&
    !skills_required &&
    !salary &&
    !experience &&
    !startDate &&
    !location
  ) {
    next(new ApiError(400, "All fields are required"));
  }
  const companyid = req.user?.company?.id;
  const company = await prisma.company.findFirst({
    where: {
      id: companyid,
    },
  });
  if (!company) {
    next(new ApiError(400, "Company not found"));
  }

  const listing = await prisma.jobListing.create({
    data: {
      title,
      description,
      skills_required,
      salary,
      experience,
      startDate,
      location,
      company: {
        connect: {
          id: company.id,
        },
      },
    },
    include: {
      company: true,
    },
  });
  if (!listing) {
    next(new ApiError(400, "Listing can not created"));
  }
  res.status(200).json(new ApiResponse(200, "Lisitng created", listing));
});
export const getListing = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const listingId = Number(id);
  if (!id) {
    next(new ApiError(400, "Id is required"));
  }
  const listing = await prisma.jobListing.findUnique({
    where: { id: listingId },
    include: {
      company: true,
    },
  });
  if (!listing) {
    next(new ApiError(400, "Listing not found"));
  }
  res
    .status(200)
    .json(new ApiResponse(200, "Listing fetched successfully", listing));
});
export const updateListing = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const listingId = Number(id);
  if (!id) {
    next(new ApiError(400, "Id is required "));
  }

  const {
    title,
    description,
    skills_required,
    salary,
    experience,
    startDate,
    location,
  } = req.body;
  if (
    !title &&
    !description &&
    !skills_required &&
    !salary &&
    !experience &&
    !startDate &&
    !location
  ) {
    next(new ApiError(400, "All fields are required"));
  }
  const companyid = req.user.company.id;
  const company = await prisma.company.findFirst({
    where: {
      id: companyid,
    },
  });
  if (!company) {
    next(new ApiError(400, "Company not found"));
  }

  const listing = await prisma.jobListing.findFirst({
    where: {
      id: listingId,
    },
  });
  if (listing.company_id !== companyid) {
    next(new ApiError(400, "You are not authorize to update this listing"));
  }
  const updatedListing = await prisma.jobListing.update({
    where: {
      id: listingId,
    },
    data: {
      title,
      description,
      skills_required,
      salary,
      experience,
      startDate,
      location,
    },
    include: {
      company: true,
    },
  });
  if (!updateListing) {
    next(new ApiError(400, "Listing can not be  updated"));
  }
  res.status(200).json(new ApiResponse(200, "Listing updated", updatedListing));
});
export const deleteListing = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const listingId = Number(id);
  if (!id) {
    next(new ApiError(400, "Id is required"));
  }
  const listing = await prisma.jobListing.findFirst({
    where: {
      id: listingId,
    },
    include: {
      company: true,
    },
  });
  if (!listing) {
    next(new ApiError(400, "Listing not found"));
  }
  const companyid = req.user.company.id;
  const company = await prisma.company.findFirst({
    where: {
      id: companyid,
    },
  });
  if (!company) {
    next(new ApiError(400, "Company not found"));
  }
  if (listing.company.id !== company.id) {
    next(new ApiError(400, "You are not authorize to delete this listing"));
  }
  const deleteApplications = await prisma.jobApplication.deleteMany({
    where: {
      jobListing_id: listingId,
    },
  });
  const deletedListing = await prisma.jobListing.delete({
    where: {
      id: listingId,
    },
  });

  if (!deletedListing && !deleteApplications) {
    next(new ApiError(400, "Listing cannot be deleted"));
  }
  res.status(200).json(new ApiResponse(200, "Listing deleted", deletedListing));
});
export const getAllMyJobListings = asyncHandler(async (req, res, next) => {
  const listings = await prisma.jobListing.findMany({
    where: { company_id: req.user.company.id },
    select: {
      id: true,
      title: true,
      description: true,
      skills_required: true,
      salary: true,
      experience: true,
      startDate: true,
      createdAt: true,
      location: true,
      jobApplication: {
        select: {
          jobSeeker: true,
          jobListing: true,
        },
      },
    },
  });
  if (!listings) {
    next(new ApiError(400, "Listing not found"));
  }
  const newListings = listings.map((listing) => {
    return {
      ...listing,
      applicationCount: listing.jobApplication.length,
    };
  });

  res
    .status(200)
    .json(new ApiResponse(200, "Listings fetched successfully", newListings));
});
