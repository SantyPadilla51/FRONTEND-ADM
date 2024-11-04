import axios from "axios"

const clienteAxios = axios.create({
    baseURL: "https://backend-adm.onrender.com"
})

export default clienteAxios
