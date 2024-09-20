import { useState, useEffect, createContext } from "react"
import clienteAxios from "../config/axios"

const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [cargando, setCargando] = useState(true)
    const [auth, setAuth] = useState({})

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem("token")
            
            if (!token) {
                setCargando(false)
                return
            }

            try {
                const url = "/perfil"
                
                const result = await clienteAxios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                const resultado = await result.json()

                setAuth(resultado)

            } catch (error) {
                setAuth({})
            }

            setCargando(false)

        }
        autenticarUsuario()
    }, [])

    return (
        <AuthContext.Provider
            value={
                {
                    auth,
                    setAuth,
                    cargando
                }
            }
        >
            {children}
        </AuthContext.Provider>
    )

}

export {
    AuthProvider
}

export default AuthContext