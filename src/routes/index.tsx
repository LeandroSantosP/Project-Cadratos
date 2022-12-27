import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { DashBoard, ListagemDePessoas } from "../pages";
import { useDrawerContext } from "../shared/contexts";

import { BsFillPeopleFill } from 'react-icons/bs'
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
         {
            label: 'Pessoas',
            path: '/cidades',
            icon: <BsFillPeopleFill />,
         },
      ]);
   }, []);

   return (
      <Routes>
         <Route path="/pagina-inicial" element={<DashBoard />} />
         <Route path="/cidades" element={<ListagemDePessoas />} />
         {/* <Route path="/cidades/detalhe/:id" element={<ListagemDeCidades />} /> */}

         <Route path="*" element={<Navigate to="/pagina-inicial"/>} />
      </Routes>
   );
};