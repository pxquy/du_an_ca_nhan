import React from "react";
import type { TGlobalProps } from "../../Types/storeType";
import { Navigate } from "react-router";
import { message } from "antd";

const Authorization = ({
  children,
  allowRole,
  role,
}: TGlobalProps<{ role: string; allowRole: string[] }>) => {
  if (!allowRole.includes(role)) {
    message.error("Bạn ko có quyền vào trang quản trị!");
    return <Navigate to={"/login"} replace />;
  }

  return children;
};

export default Authorization;
