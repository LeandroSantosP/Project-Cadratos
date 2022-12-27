import axios from "axios";
import { useCallback, useState } from "react";
import { Api } from "../../services/api/axios-config";


interface useAxiosProps {
   data: ''
}

interface requestProps {
   path: string;
   options?: {

   }
}

export const useAxios = () => {
   const [data, setData] = useState<[] | null>([]);

   const request = useCallback(async (endpoint: string) => {
      let response;
      let json;
      try {
         response = Api.get(endpoint)
      } catch (err) {
         console.log(err)
      }
   }, []);

   return {
      data,
      request
   };
}