import { createContext, useContext } from "react";

export const InspectionContext = createContext(null);

export const useInspectionData = () => {
  return useContext(InspectionContext);
};
