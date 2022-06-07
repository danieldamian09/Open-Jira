import axios from "axios";

// Creo una instancia
const entriesApi = axios.create({
  // Creo la base URL:
  baseURL: '/api'
})

export default entriesApi;
