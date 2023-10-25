'use client';

import { Outlet } from "react-router-dom";

const InspectionJobLayout = () => {
  console.log("hello")

  return (
    <>
      <Outlet />
    </>
  )
};

export default InspectionJobLayout;