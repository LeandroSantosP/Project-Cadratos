import React, { createContext, useCallback, useContext, useState } from "react";

export const useDrawerContext = () => {
   return useContext(DrawerContext);
};

const DrawerContext = createContext({} as IDrawerContextProps);

interface AppDrawerProviderProps {
   children: React.ReactNode
};


interface IDrawerOptions {
   icon: React.ReactNode;
   label: string;
   path: string;
}


interface IDrawerContextProps {
   isDrawerOpen: boolean
   toggleDrawerOpen: () => void;
   DrawerOptions: IDrawerOptions[];
   setDrawerOptions: (newDrawerOptions: IDrawerOptions[]) => void;
};


export const AppDrawerProvider: React.FC<AppDrawerProviderProps> = ({ children }) => {
   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
   const [DrawerOptions, setDrawerOptions] = useState<IDrawerOptions[]>([]);

   const toggleDrawerOpen = useCallback(() => {
      setIsDrawerOpen(DarwerOpen => !DarwerOpen);
   }, []);
   

   const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOptions[]) => {
      setDrawerOptions(newDrawerOptions);
   }, []);

   return (
      <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawerOpen, DrawerOptions, setDrawerOptions: handleSetDrawerOptions }}>
               {children}
      </DrawerContext.Provider>
   );
}
