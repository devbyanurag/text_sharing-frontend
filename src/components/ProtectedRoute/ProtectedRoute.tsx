import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";

const ProtectedRoute: React.FC = () => {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/auth" />;
};

export default ProtectedRoute;
