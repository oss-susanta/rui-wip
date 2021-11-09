import { useQuery } from "react-query";
import { login } from "../api/auth";

export default function useLogin() {
  return useQuery("login", login);
}
