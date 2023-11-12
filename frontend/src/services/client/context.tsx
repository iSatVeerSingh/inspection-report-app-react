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
    case "ADD_ITEM": {
      return {
        ...state,
        inspectionItems: [...state.inspectionItems, action.payload],
      };
    }
    case "DELETE_ITEM": {
      return {
        ...state,
        inspectionItems: state.inspectionItems.filter(
          (item: any) => !action.payload.includes(item.id)
        ),
      };
    }
    case "RECOMMENDATION": {
      return {
        ...state,
        recommendation: action.payload,
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
