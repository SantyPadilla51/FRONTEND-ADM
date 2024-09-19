import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
    // Obtener el contexto del AuthProvider y sus valores
    //De esta forma accedemos al AuthContext
    return useContext(AuthContext)
}

export default useAuth;