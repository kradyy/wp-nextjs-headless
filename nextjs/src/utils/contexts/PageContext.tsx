import { createContext, useContext, ReactNode } from "react";

const PageContext = createContext<string>("");

interface PageProviderProps {
  children: ReactNode;
  value: string;
}

export function PageProvider({ children, value }: PageProviderProps) {
  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
}

export function usePage() {
  return useContext(PageContext);
}
