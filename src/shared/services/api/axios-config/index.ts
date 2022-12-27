
import axios from "axios";
import { errorInterceptor, reponseInterceptor } from "./interceptors";
import { Environment } from "../../../environment";

export const Api = axios.create({
   baseURL: Environment.URL_BASE
});

Api.interceptors.response.use(
   (response) => reponseInterceptor(response),
   (error) => errorInterceptor(error),
);

