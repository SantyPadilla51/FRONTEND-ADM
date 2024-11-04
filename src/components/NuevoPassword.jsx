import { useState } from "react"
import { useParams } from "react-router-dom"
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NuevoPassword = () => {

    const { token } = useParams()
    const [password, setPassword] = useState("")
    const [repetirPassword, setRepetirPassword] = useState("")
    const [cargando, setCargando] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setCargando(true)
        if (password === repetirPassword) {
            try {
                setCargando(true)
                const peticion = await fetch(`https://back-end-adm-pacientes.vercel.app/olvide-password/${token}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        password: password
                    })
                })
            } catch (error) {
                toast.error("Ha ocurrido un error")
                setCargando(false)
            }
            toast.success("Contraseña cambiada con éxito")

            setTimeout(() => {
                navigate("/")
            }, 2000);

        } else {
            toast.error("Las contraseñas no coinciden")
            setCargando(false)
        }
    }

    const handleChange = (e) => {
        if (e.target.name === "password") {
            setPassword(e.target.value)
        } else {
            setRepetirPassword(e.target.value)
        }
    }

    return (
        <>
            <ToastContainer />
            <Navbar />
            <form className="drop-shadow-lg bg-slate-400 flex flex-col p-4  gap-3 lg:w-1/3 lg:mx-auto lg:mt-32" onSubmit={handleSubmit}>

                <h1 className="text-xl bg-white p-2 uppercase">Genera un nuevo password</h1>

                <div className="flex flex-col mt-6">
                    <label>Nuevo Password:</label>
                    <input className="p-1" name="password" onChange={(e) => handleChange(e)} />
                </div>

                <div className="flex flex-col ">
                    <label>Repite el Password:</label>
                    <input className="p-1" name="repetirPassword" onChange={(e) => handleChange(e)} />
                </div>

                {cargando ? (
                    <button className="bg-blue-800 text-white p-2 hover:bg-blue-600 mt-5" type="submit">
                        <ClipLoader color={'#fff'} />
                    </button>
                ) : (
                    <button className="bg-blue-800 text-white p-2 hover:bg-blue-600 mt-5" type="submit">Guardar Password</button>
                )}


            </form>
        </>
    )
}

export default NuevoPassword