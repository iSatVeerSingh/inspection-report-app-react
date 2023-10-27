"use client";

import { Outlet, useLoaderData } from "react-router-dom";
import {
  InspectionContext,
  inspectionReducer,
} from "../services/client/context";
import { useReducer } from "react";

const InspectionJobLayout = () => {
  const jobResponse: any = useLoaderData();

  const [inspectionData, dispatch] = useReducer(
    inspectionReducer,
    jobResponse.data
  );

  const addNotes = (notes: any) => {
    dispatch({
      type: "ADD_NOTE",
      payload: notes,
    });
  };

  return (
    <InspectionContext.Provider value={{ inspectionData, addNotes }}>
      <Outlet />
    </InspectionContext.Provider>
  );
};

export default InspectionJobLayout;
