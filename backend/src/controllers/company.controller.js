import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { prisma } from "../../prisma/index.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginCompany = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) {
    throw new ApiError(400, "All fields are required");
  }
  const isUserExists = await prisma.user.findUnique({
    where: { email },
  });
  if (!isUserExists) {
    throw new ApiError(400, "Invalid Email");
  }
  const isPasswordMatch = await bcryptjs.compare(
    password,
    isUserExists.password
  );
  if (!isPasswordMatch) {
    throw new ApiError(400, "Password is incorrect");
  }
  const payload = {
    id: isUserExists.id,
  };
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET_ACCESS_TOKEN, {
    expiresIn: process.env.JWT_SECRET_ACCESS_TOKEN_EXPIRY,
  });
  const user = await prisma.user.findFirst({
    where: { email },
    include: { company: true },
  });
  res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
    })
    .status(200)
    .json(
      new ApiResponse(200, "Company successfully loggedin", {
        user: {
          ...payload,
          username: user.username,
          email: user.email,
          company: {
            company_name: user.company.company_name,
            description: user.company.description,
            website: user.company.website,
            location: user.company.location,
          },
        },
        accessToken,
      })
    );
});

export const registerCompany = asyncHandler(async (req, res) => {
  const {
    username,
    email,
    password,
    company_name,
    description,
    website,
    location,
  } = req.body;
  if (!username && !email && !password) {
    throw new ApiError(400, "All fields are required");
  }
  const userExist = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });
  if (userExist) {
    throw new ApiError(400, "User already exists");
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      role: {
        connect: {
          id: 2,
        },
      },
    },
  });
  if (!user) {
    throw new ApiError(400, "User cannot be registered");
  }

  const company = await prisma.company.create({
    data: {
      company_name,
      description,
      website,
      location,
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });
  if (!company) {
    throw new ApiError(400, "Company cannot be created");
  }
  const payload = {
    id: user.id,
  };
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET_ACCESS_TOKEN, {
    expiresIn: process.env.JWT_SECRET_ACCESS_TOKEN_EXPIRY,
  });
  res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
    })
    .status(200)
    .json(
      new ApiResponse(200, "Company successfully registered", {
        user: {
          ...payload,
          username: user.username,
          email: user.email,
          company: {
            company_name: company.company_name,
            description: company.description,
            website: company.website,
            location: company.location,
          },
        },
        accessToken,
      })
    );
});

export const logoutCompany = asyncHandler(async (req, res) => {
  console.log("logout");
  const options = {
    httpOnly: true,
    secure: true,
  };
  res
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, "Logout sucessfully", {}));
});

export const getCurrentCompany = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, "Current User", req.user));
});

export const updateCompanyDetails = asyncHandler(async (req, res) => {
  const { company_name, description, website, location } = req.body;
  const user = await prisma.user.update({
    where: {
      id: req.user.id,
    },
  });
  if (!user) {
    throw new ApiError(400, "User cannot be updated");
  }
  const company = await prisma.company.update({
    where: { id: req.user.id },
    data: {
      company_name,
      description,
      website,
      location,
    },
  });
  res
    .status(200)
    .json(new ApiResponse(200, "User updated successfully", company));
});
