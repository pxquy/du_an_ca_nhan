import React from "react";
import type { TGlobalProps } from "../../Types/React";
import { Navigate } from "react-router";

const Authorization = ({
  children,
  allowRole,
  role,
}: TGlobalProps<{ role: string; allowRole: string[] }>) => {
  if (!allowRole.includes(role)) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
};

export default Authorization;
