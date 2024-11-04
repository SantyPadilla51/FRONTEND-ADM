import { useState } from "react"
import clienteAxios from "../config/axios";
import { useNavigate, Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import Navbar from "./Navbar";
import useAuth from "../hooks/useAuth";
import 'react-toastify/dist/ReactToastify.css';


const InicioSesion = () => {

    const [cargando, setCargando] = useState(false)
    const navigate = useNavigate()
    const [datos, setDatos] = useState({
        email: "",
        password: ""
    })
    const { setAuth } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()


        if (datos.email === "" || datos.password === "") {
            toast.error("Todos los campos son obligatorios")
            return;
        } else {

            try {
                setCargando(true)
                toast.loading("Iniciando Sesion...",{
                    position: "top-center"
                })
                const url = "/iniciar-sesion"
                const {data} = await clienteAxios.post(url, datos)

                if (data.ok != true) {
                    toast.error(data.msg)
                    return
                } else {
                    setAuth(data)
                    localStorage.setItem('token', data.token)
                    setTimeout(() => {
                        navigate("/admin/pacientes")
                    }, 1000);
                }
                setCargando(false)

            } catch (error) {
                toast.error('Hubo un error al iniciar sesion')
                setCargando(false)
            }
        }

    }

    const hanldeChange = (e) => {
        setDatos({ ...datos, [e.target.name]: e.target.value })
    }



    return (
        <>
            <Navbar />
            <ToastContainer />
            <form className="mt-40 mx-6 drop-shadow-lg bg-slate-400 flex flex-col p-4  gap-3 lg:w-1/4 lg:mx-auto lg:mt-32" onSubmit={handleSubmit}>
                <h3 className="text-xl font-bold">Inicia Sesion con tus datos</h3>

                <div className="flex flex-col">
                    <label>Correo electrónico:</label>
                    <input className="p-1" type="email" name="email" value={datos.email} onChange={(e) => hanldeChange(e)} />
                </div>

                <div className="flex flex-col">
                    <label type="text" name="password" required>Contraseña:</label>
                    <input className="p-1" type="text" name="password" value={datos.password} onChange={(e) => hanldeChange(e)} />
                </div>

                <button
                    className={`bg-blue-800 text-white p-2 mt-5 ${cargando ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                    type="submit"
                    onClick={e => handleSubmit(e)}
                    disabled={cargando}
                >
                    {cargando ? 'Iniciando...' : 'Iniciar Sesion'}
                </button>


                <div className="flex items-center mt-4 gap-3">
                    <p className="">No tienes una cuenta?</p>
                    <Link to="/crear-cuenta" className="hover:underline">Regístrate</Link>
                </div>

                <Link to="/olvide-password">
                    <p className=" mt-4 hover:underline">Olvidé mi contraseña</p>
                </Link>

            </form>
        </>
    )
}

export default InicioSesion