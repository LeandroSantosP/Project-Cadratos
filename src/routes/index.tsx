import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { DashBoard } from "../pages";
import { useDrawerContext } from "../shared/contexts";
import {
   AiFillHome
} from 'react-icons/ai'

export const AppRoutes = () => {
   const { setDrawerOptions } = useDrawerContext();

   useEffect(() => {
      setDrawerOptions([
         {
            label: 'Pagina inicial',
            path: '/pagina-inicial',
            icon: <AiFillHome />,
         },
      ]);
   }, []);

   return (
      <Routes>
         <Route path="/pagina-inicial" element={<DashBoard />} />

         <Route path="*" element={<Navigate to="/pagina-inicial"/>} />
      </Routes>
   );
};