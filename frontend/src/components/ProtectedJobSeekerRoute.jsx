import { useToast } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedJobSeekerRoute = () => {
  const { user } = useSelector((state) => state.user);
  const toast = useToast();

  if (user.jobSeeker) {
    return <Outlet />;
  } else {
    toast({
      title:
        "You are not authorized to access this page. Please login as jobSeeker",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  }
};

export default ProtectedJobSeekerRoute;
