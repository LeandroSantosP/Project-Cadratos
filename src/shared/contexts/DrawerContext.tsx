import React, { createContext, useCallback, useContext, useState } from "react";

interface IDrawerContextProps {
   isDrawerOpen: boolean
   toggleDrawerOpen: () => void;
};

export const useDrawerContext = () => {
   return useContext(DrawerContext);
};

const DrawerContext = createContext({} as IDrawerContextProps);

interface AppDrawerProviderProps {
   children: React.ReactNode
};

export const AppDrawerProvider: React.FC<AppDrawerProviderProps> = ({ children }) => {
   const [isDrawerOpen, setIsDrawerOpen] = useState(false);

   const toggleDrawerOpen = useCallback(() => {
      setIsDrawerOpen(DarwerOpen => !DarwerOpen);
   }, []);

   return (
      <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawerOpen}}>
               {children}
      </DrawerContext.Provider>
   );
}
