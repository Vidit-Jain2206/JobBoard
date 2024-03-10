import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { prisma } from "../../prisma/index.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const loginJobSeeker = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && !password) {
    throw new ApiError(400, "All fields are required");
  }
  const isUserExists = await prisma.user.findUnique({
    where: { email },
  });
  if (!isUserExists) {
    next(new ApiError(400, "Invalid email"));
  }
  const isPasswordMatch = await bcryptjs.compare(
    password,
    isUserExists.password
  );
  if (!isPasswordMatch) {
    next(new ApiError(400, "Incorrect password"));
  }

  const payload = {
    id: isUserExists.id,
  };

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET_ACCESS_TOKEN, {
    expiresIn: process.env.JWT_SECRET_ACCESS_TOKEN_EXPIRY,
  });

  const user = await prisma.user.findFirst({
    where: { email },
    include: { jobSeeker: true },
  });
  const options = {
    httpOnly: true,
    secure: true,
  };
  res
    .cookie("accessToken", accessToken, options)
    .status(200)
    .json(
      new ApiResponse(200, "User loggedin successfully", {
        user: {
          ...payload,
          username: user.username,
          email: user.email,
          jobSeeker: {
            resume: user.jobSeeker.resume,
            experience: user.jobSeeker.experience,
            education: user.jobSeeker.education,
            skills: user.jobSeeker.skills,
          },
        },
        accessToken,
      })
    );
});
export const registerJobSeeker = asyncHandler(async (req, res) => {
  const { username, email, password, education, experience, skills } = req.body;
  if (
    !username &&
    !email &&
    !password &&
    !education &&
    !experience &&
    !skills
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const resumeLocalPath = req.file?.path;
  let resumeCloudinaryUrl;
  if (resumeLocalPath) {
    resumeCloudinaryUrl = await uploadOnCloudinary(resumeLocalPath);
    if (!resumeCloudinaryUrl) {
      throw new ApiError(500, "could not upload it on cloudinary");
    }
  } else {
    throw new ApiError(400, "Please upload resume");
  }

  const resume = resumeCloudinaryUrl.url;
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });

  if (existingUser) {
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
          id: 1,
        },
      },
    },
  });
  // create jobseeker
  console.log(skills);
  const newskill = skills.split(",");
  console.log(newskill);
  const jobseeker = await prisma.jobSeeker.create({
    data: {
      education,
      experience,
      skills: newskill,
      resume,
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });
  if (!jobseeker) {
    throw new ApiError(400, "Job seeker cannot be created");
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
      new ApiResponse(200, "user registered successfully", {
        user: {
          ...payload,
          username: user.username,
          email: user.email,
          jobSeeker: {
            resume: jobseeker.resume,
            experience: jobseeker.experience,
            education: jobseeker.education,
            skills: jobseeker.skills,
          },
        },
        accessToken,
      })
    );
});

export const logoutJobSeeker = asyncHandler(async (req, res) => {
  const options = {
    httpOnly: true,
    secure: true,
  };
  res
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, "Logout sucessfully", {}));
});

export const getCurrentJobSeeker = asyncHandler((req, res) => {
  res.status(200).json(new ApiResponse(200, "Current User", req.user));
});

export const updateJobSeekerAccountDetails = asyncHandler(async (req, res) => {
  const { education, experience, skills } = req.body;

  if (!education && !experience && !skills) {
    throw new ApiError(400, "All fields are required");
  }
  const resumeLocalPath = req.file?.path;
  let resumeCloudinaryUrl;
  if (resumeLocalPath) {
    resumeCloudinaryUrl = await uploadOnCloudinary(resumeLocalPath);
    if (!resumeCloudinaryUrl) {
      throw new ApiError(500, "could not upload it on cloudinary");
    }
  } else {
    throw new ApiError(400, "Please upload resume");
  }

  const resume = resumeCloudinaryUrl.url;
  const user = await prisma.user.findFirst({
    where: {
      id: req.user.id,
    },
  });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const updatedUser = await prisma.user.update({
    where: {
      id: req.user.id,
    },
    data: {
      resume,
      education,
      experience,
      skills,
    },
    include: { jobSeeker: true },
  });
  res
    .status(200)
    .json(new ApiResponse(200, "User updated successfully", updatedUser));
});
