import { createContext, useContext } from "react";

export const InspectionContext = createContext({});

export const inspectionReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_NOTE": {
      return {
        ...state,
        inspectionNotes: action.payload,
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

export const useInspectionData = () => {
  return useContext(InspectionContext);
};
