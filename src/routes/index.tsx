import { useEffect } from "react";
import { DashBoard, ListagemDePessoas, DetalhesDePessoas, DetalhesDeCidades, ListagemDeCidades } from "../pages";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDrawerContext } from "../shared/contexts";

import { BsFillPeopleFill } from 'react-icons/bs'
import { FaCity } from 'react-icons/fa'
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
            path: '/pessoas',
            icon: <BsFillPeopleFill />,
         },
         {
            label: 'Cidade',
            path: '/cidades',
            icon: <FaCity />,
         },
      ]);
   }, []);

   return (
      <Routes>
         <Route path="/pagina-inicial" element={<DashBoard />} />
         <Route path="/pessoas" element={<ListagemDePessoas />} />
         <Route path="/pessoas/detalhe/:id" element={<DetalhesDePessoas />} />

         <Route path="/cidades/detalhe/:id" element={<DetalhesDeCidades />} />
         <Route path="/cidades" element={<ListagemDeCidades />} />

         <Route path="*" element={<Navigate to="/pagina-inicial" />} />
      </Routes>
   );
};