import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from "react-spinners/ClipLoader";
import Navbar from "./Navbar";
import clienteAxios from "../config/axios";


const RegistrarUser = () => {

    const [cargando, setCargando] = useState(false)
    const navigate = useNavigate()
    const [usuario, setUsuario] = useState({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        dni: ""
    })

    const handleChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargando(true)
        try {
            
            const url = "crear-usuario/"
            const req = await clienteAxios.post(url, usuario)
            const data = await req.json();

            if (data.ok === true) {
                toast.success(data.msg)
                setCargando(false)
                setTimeout(() => {
                    navigate("/")
                }, 2000);
            } else {
                setCargando(false)
                toast.error(data.msg)
            }
        } catch (error) {
            setCargando(false)
            toast.error("Ha ocurrido un error");
        }
    };

    return (
        <>
            <Navbar />
            <ToastContainer />
            <form className="bg-slate-400 flex flex-col p-4 gap-3 lg:w-1/4 lg:mx-auto lg:mt-32" onSubmit={(e) => handleSubmit(e)}>
                <h3 className="text-xl font-bold">Completa todos los campos</h3>

                <div className="flex flex-col">
                    <label>Nombre:</label>
                    <input className="p-1" type="text" name="nombre" required onChange={(e) => handleChange(e)} />
                </div>

                <div className="flex flex-col">
                    <label>Apellido:</label>
                    <input className="p-1" type="text" name="apellido" required onChange={(e) => handleChange(e)} />
                </div>

                <div className="flex flex-col">
                    <label>DNI:</label>
                    <input className="p-1" type="text" minLength={8} maxLength={8} name="dni" required onChange={(e) => handleChange(e)} />
                </div>

                <div className="flex flex-col">
                    <label>Correo electrónico:</label>
                    <input className="p-1" type="email" name="email" onChange={(e) => handleChange(e)} />
                </div>

                <div className="flex flex-col">
                    <label type="text" name="password" required>Contraseña:</label>
                    <input className="p-1" type="text" name="password" onChange={(e) => handleChange(e)} />
                </div>

                {cargando ? (
                    <button className="bg-blue-800 text-white p-2 hover:bg-blue-600 mt-5" type="submit">
                        <ClipLoader color={'#fff'} />
                    </button>
                ) : (
                    <button className="bg-blue-800 text-white p-2 hover:bg-blue-600 mt-5" type="submit" onClick={e => handleSubmit(e)}>Crear Usuario</button>
                )}
            </form>
        </>
    )
}

export default RegistrarUser