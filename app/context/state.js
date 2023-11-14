"use client"
import { createContext } from "react";
import { useReducer } from "react";

export const GlobalContext = createContext();
 // Initial state for dataKey
  const initialDataKey = {
    category: "",
    type: "",
    difficulty: "",
    number: "",
  };

  // Reducer function to handle state updates
  const dataKeyReducer = (state, action) => {
    switch (action.type) {
      case "updateCategory":
        return { ...state, category: action.payload };
      case "updateType":
        return { ...state, type: action.payload };
      case "updateDifficulty":
        return { ...state, difficulty: action.payload };
      case "updateNumber":

        return { ...state, number: action.payload };
      default:
        return state;

    }

  };


export default function GlobalState({children}){
   const [dataKey, dispatch] = useReducer(dataKeyReducer, initialDataKey);
   const contextValue = { dataKey, dispatch };
return (
  <GlobalContext.Provider value={contextValue}>
    {children}
  </GlobalContext.Provider>
);
}