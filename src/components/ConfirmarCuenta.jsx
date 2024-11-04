import { useState } from "react";
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from "react-spinners/ClipLoader";
import clienteAxios from "../config/axios";

const ConfirmarCuenta = () => {

    const [cargando, setCargando] = useState(false)
    const params = useParams()
    const navigate = useNavigate()
    const { token } = params

    const handleSubmit = (e) => {
        e.preventDefault()
        confirmarCuenta(token)
    }

    const confirmarCuenta = async (t) => {
        // Realizar la petición a la API para confirmar la cuenta
        try {
            setCargando(true)
            const url = '/confirmar-cuenta/'
            const peticion = await clienteAxios.post(`${url}${token}`)

            const resultado = await peticion.json();

            if (resultado.ok != true) {
                toast.error(resultado.msg)
            } else {
                toast.success(resultado.msg)
                setTimeout(() => {
                    navigate("/")
                }, 2000);
            }
            setCargando(false)

        } catch (error) {
            toast.error("Hubo un error al confirmar la cuenta. Por favor, inténtelo más tarde.")
            return
        }
    }

    return (
        <>
            <div className="text-center mt-10 text-white">
                <ToastContainer />
                <h1 className="text-xl">Confirma tu cuenta dando click en el boton</h1>
                {cargando ? (
                    <button className="text-white p-3 font-semibold hover:bg-green-500 mt-5" >
                        <ClipLoader color={'#fff'} />
                    </button>
                ) : (
                    <button className="bg-green-600 font-semibold text-white p-3 hover:bg-green-500 mt-5" onClick={(e) => handleSubmit(e)}>Confirmar Cuenta</button>
                )}
            </div>

        </>
    )
}

export default ConfirmarCuenta