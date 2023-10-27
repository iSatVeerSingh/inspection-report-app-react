"use client";

import { Outlet, useLoaderData } from "react-router-dom";
import { InspectionContext } from "../services/client/context";

const InspectionJobLayout = () => {
  console.log("layou rendered")

  const jobResponse: any = useLoaderData();

  const inspectionData = jobResponse.success ? jobResponse.data : null;

  return (
    <InspectionContext.Provider value={inspectionData}>
      <Outlet />
    </InspectionContext.Provider>
  );
};

export default InspectionJobLayout;
