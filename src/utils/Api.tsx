import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { IUser } from "../models/IUser";
import { IProducts, Product } from "../models/IProducts";

const baseUrl = process.env.REACT_APP_BASE_URL!;
const timeOut = 15000;

const config = axios.create({
  baseURL: baseUrl,
  timeout: timeOut,
  data: { lang: "tr" },
});



export const login = (username: string, password: string): Promise<AxiosResponse<IUser>> => {
  const sendObj = {
    username: username,
    password: password,
  };
  return config.post<IUser>("auth/login", sendObj);
};

export function allProducts(skip: number, limit : number): Promise<AxiosResponse<IProducts>> {
  const axiosconfig : AxiosRequestConfig = { params: { skip : skip, limit : limit } };
  return config.get<IProducts>("products", axiosconfig);
}

export function getProduct(id: string): Promise<AxiosResponse<Product>> {
  return config.get<Product>("product/" + id);
}

export function searchProducts(param: string, skip: number, limit : number): Promise<AxiosResponse<IProducts>> {
  const axiosconfig : AxiosRequestConfig = { params: { q : param, skip : skip, limit : limit } };
  return config.get<IProducts>("products/search", axiosconfig);
}
