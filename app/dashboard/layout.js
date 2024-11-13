import React from "react";
import DashboardBody from "./dashComps/DashboardBody";

const DashboardLayout = ({ children }) => {
  return <DashboardBody>{children}</DashboardBody>;
};

export default DashboardLayout;
