import axios from "redaxios";

export async function login() {
  return axios
    .get(`${window.env.serverUrl}/identity`)
    .then((response) => response.data);
}

export function logout() {
  return axios.get(`${window.env.serverUrl}/logout`);
}
