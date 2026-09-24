"use client";
import { createContext, useContext } from "react";

// True on the print route: animations jump to their end state.
export const FinalContext = createContext(false);
export const useFinal = () => useContext(FinalContext);
