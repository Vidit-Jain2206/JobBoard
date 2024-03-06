import { prisma } from "../../prisma/index.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

export const getAllListings = asyncHandler(async (req, res) => {
  const listings = await prisma.jobListing.findMany({
    include: { company: true },
  });
  res
    .status(200)
    .json(new ApiResponse(200, "Listings fetched successfully", listings));
});
export const createListing = asyncHandler(async (req, res) => {
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
    throw new ApiError(400, "All fields are required");
  }
  const companyid = req.user?.company?.id;
  const company = await prisma.company.findFirst({
    where: {
      id: companyid,
    },
  });
  if (!company) {
    throw new ApiError(400, "company not found");
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
    throw new ApiError(400, "Listing not created");
  }
  res.status(200).json(new ApiResponse(200, "Lisitng created", listing));
});
export const getListing = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const listingId = Number(id);
  if (!id) {
    throw new ApiError(400, "id is required");
  }
  const listing = await prisma.jobListing.findUnique({
    where: { id: listingId },
    include: {
      company: true,
    },
  });
  if (!listing) {
    throw new ApiError(404, "Listing not found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, "Listing fetched successfully", listing));
});
export const updateListing = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const listingId = Number(id);
  if (!id) {
    throw new ApiError(400, "id is required");
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
    throw new ApiError(400, "All fields are required");
  }
  const companyid = req.user.company.id;
  const company = await prisma.company.findFirst({
    where: {
      id: companyid,
    },
  });
  if (!company) {
    throw new ApiError(400, "company not found");
  }

  const listing = await prisma.jobListing.findFirst({
    where: {
      id: listingId,
    },
  });
  if (listing.company_id !== companyid) {
    throw new ApiError(400, "You are not authorized to update this listing");
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
    throw new ApiError(400, "Listing not updated");
  }
  res.status(200).json(new ApiResponse(200, "Listing updated", updatedListing));
});
export const deleteListing = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const listingId = Number(id);
  if (!id) {
    throw new ApiError(400, "id is required");
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
    throw new ApiError(404, "Listing not found");
  }
  const companyid = req.user.company.id;
  const company = await prisma.company.findFirst({
    where: {
      id: companyid,
    },
  });
  if (!company) {
    throw new ApiError(400, "company not found");
  }
  if (listing.company.id !== company.id) {
    throw new ApiError(400, "You are not authorized to delete this listing");
  }

  const deletedListing = await prisma.jobListing.delete({
    where: {
      id: listingId,
    },
  });

  if (!deletedListing) {
    throw new ApiError(400, "Listing not deleted");
  }
  res.status(200).json(new ApiResponse(200, "Listing deleted", deletedListing));
});

export const getAllMyJobListings = asyncHandler(async (req, res) => {
  console.log("hello");
  const listings = await prisma.jobListing.findMany({
    where: { company: { id: req.user.company.id } },
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
          user: {
            select: {
              username: true,
              email: true,
            },
          },
          jobListing: true,
        },
      },
    },
  });

  const newListings = listings.map((listing) => {
    return {
      ...listing,
      applicationCount: listing.jobApplication.length,
    };
  });
  if (!listings) {
    throw new ApiError(404, "Listings not found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, "Listings fetched successfully", newListings));
});
