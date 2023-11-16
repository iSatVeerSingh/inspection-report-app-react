"use client";

import { createContext, useState } from "react";
import { Inspection } from "../types";
import { Outlet } from "react-router-dom";

type ContextType = {
  inspection: Inspection | null;
  setInspection: any;
};

export const InspectionItemContext = createContext<Partial<ContextType>>({});

const InspectionItemLayout = () => {
  const [inspection, setInspection] = useState<Inspection | null>(null);

  return (
    <InspectionItemContext.Provider value={{ inspection, setInspection }}>
      <Outlet />
    </InspectionItemContext.Provider>
  );
};

export default InspectionItemLayout;
