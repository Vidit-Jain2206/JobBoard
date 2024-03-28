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
    next(new ApiError(400, "All fields are required"));
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
            id: user.jobSeeker.id,
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
export const registerJobSeeker = asyncHandler(async (req, res, next) => {
  const { username, email, password, education, experience, skills } = req.body;
  if (
    !username &&
    !email &&
    !password &&
    !education &&
    !experience &&
    !skills
  ) {
    next(new ApiError(400, "All fields are required"));
  }
  const resumeLocalPath = req.file?.path;
  let resumeCloudinaryUrl;
  if (resumeLocalPath) {
    resumeCloudinaryUrl = await uploadOnCloudinary(resumeLocalPath);
    if (!resumeCloudinaryUrl) {
      next(new ApiError(400, "Could not upload it on cloudinary"));
    }
  } else {
    next(new ApiError(400, "Please upload resume"));
  }

  const resume = resumeCloudinaryUrl.url;
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });

  if (existingUser) {
    next(new ApiError(400, "User already exists"));
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
  const newskill = skills.split(",");
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
    next(new ApiError(400, "JobSeeker cannot be created"));
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
            id: jobseeker.id,
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

export const logoutJobSeeker = asyncHandler(async (req, res, next) => {
  const options = {
    httpOnly: true,
    secure: true,
  };
  res
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, "Logout sucessfully", {}));
});

export const getCurrentJobSeeker = asyncHandler((req, res, next) => {
  res.status(200).json(new ApiResponse(200, "Current User", req.user));
});

export const updateJobSeekerAccountDetails = asyncHandler(
  async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
      next(new ApiError(400, "Id is required"));
    }
    const jobseekerexists = await prisma.jobSeeker.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!jobseekerexists) {
      next(new ApiError(400, "Id is invalid. No JobSeeker found"));
    }
    if (jobseekerexists.id !== req.user.jobSeeker.id) {
      next(new ApiError(400, "You are not authorized to perform this action"));
    }
    const { education, experience, skills } = req.body;

    if (!education && !experience && !skills) {
      next(new ApiError(400, "All fields are required"));
    }
    const resumeLocalPath = req.file?.path;
    let resumeCloudinaryUrl;
    if (resumeLocalPath) {
      resumeCloudinaryUrl = await uploadOnCloudinary(resumeLocalPath);
      if (!resumeCloudinaryUrl) {
        next(new ApiError(400, "Could not upload it on cloudinary"));
      }
    } else {
      next(new ApiError(400, "Please upload resume"));
    }
    const resume = resumeCloudinaryUrl.url;
    const newskill = skills.split(",");
    const updatedUser = await prisma.jobSeeker.update({
      where: {
        id: req.user.jobSeeker.id,
      },
      data: {
        resume,
        education,
        experience,
        skills: newskill,
      },
    });

    res.status(200).json(
      new ApiResponse(200, "User updated successfully", {
        user: {
          id: req.user.id,
          username: req.user.username,
          email: req.user.email,
          jobSeeker: {
            id: updatedUser.id,
            resume: updatedUser.resume,
            experience: updatedUser.experience,
            education: updatedUser.education,
            skills: updatedUser.skills,
          },
        },
      })
    );
  }
);
