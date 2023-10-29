"use client";

import { Outlet, redirect, useLoaderData } from "react-router-dom";
import {
  InspectionContext,
  inspectionReducer,
} from "../services/client/context";
import { useReducer } from "react";
import { getRequest } from "../services/client";

export const inspectionLoader = async ({ params }: any) => {
  const inspection = await getRequest(
    `/client/inspections?inspectionId=${params.inspectionId}`
  );
  if (!inspection.success) {
    return redirect("/jobs");
  }

  const libIndex = await getRequest("/client/library-index");
  console.log("Loader called");

  return {
    inspection: inspection.success ? inspection.data : {},
    libIndex: libIndex.success ? libIndex.data : [],
  };
};

const InspectionJobLayout = () => {
  const { inspection: inspectionData, libIndex }: any = useLoaderData();

  const [inspection, dispatch] = useReducer(inspectionReducer, inspectionData);

  const addNotes = (notes: any) => {
    dispatch({
      type: "ADD_NOTE",
      payload: notes,
    });
  };

  const addItem = (item: any) => {
    dispatch({
      type: "ADD_ITEM",
      payload: item,
    });
  };

  const deleteItems = (items: any) => {
    dispatch({
      type: "DELETE_ITEM",
      payload: items,
    });
  };

  const updateRecom = (recom: string) => {
    dispatch({
      type: "RECOMMENDATION",
      payload: recom,
    });
  };

  return (
    <InspectionContext.Provider
      value={{
        inspection,
        libIndex,
        addNotes,
        addItem,
        deleteItems,
        updateRecom,
      }}
    >
      <Outlet />
    </InspectionContext.Provider>
  );
};

export default InspectionJobLayout;
