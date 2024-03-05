import { useToast } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedCompanyRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const toast = useToast();

  if (user.company) {
    return <Outlet />;
  } else {
    toast({
      title:
        "You are not authorized to access this page. Please login as company",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  }
};

export default ProtectedCompanyRoute;
