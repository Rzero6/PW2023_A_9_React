import axios from "axios";
export const BASE_URL = "https://pw2023-a-9-rentalmobil.up.railway.app";
export const getImageMobil = (thumbnail) => {
  return `${BASE_URL}/storage/mobil/${thumbnail}`;
};
export const getProfilPic = (thumbnail) => {
  return `${BASE_URL}/storage/user/${thumbnail}`;
};
const useAxios = axios.create({
  baseURL: `${BASE_URL}/api`,
});
export default useAxios;
