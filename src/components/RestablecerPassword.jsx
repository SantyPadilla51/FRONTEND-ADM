import { useState } from "react"
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import clienteAxios from "../config/axios";


const RestablecerPassword = () => {

  const [cargando, setCargando] = useState(false)
  const [email, setEmail] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setCargando(true)

    if (email === "") {
      toast.error("Debes ingresar un correo electrónico")
      setCargando(false)
      return
    }

    try {
      
      const url = "olvide-password"
      const {data} = await clienteAxios.post(url, { email }, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (data.ok === true) {
        toast.success("Hemos enviado un email con las instrucciones")
        setCargando(false)
        setEmail(" ")
        setTimeout(() => {
          navigate("/")
        }, 3000);


      } else {
        toast.error("Hubo un error al enviar el correo electrónico. Por favor, inténtelo más tarde.")
        setCargando(false)
        return
      }

    } catch (error) {
      toast.error("Hubo un error al enviar el correo electrónico. Por favor, inténtelo más tarde.")
      setCargando(false)
      return
    }
  }


  const handleChange = (e) => {
    setEmail(e.target.value)
  }

  return (
    <>
     <ToastContainer />

      <Navbar />
      <form className="mt-10 mx-3 drop-shadow-lg bg-slate-400 flex flex-col p-4  gap-3 lg:w-1/3 lg:mx-auto lg:mt-32" onSubmit={handleSubmit}>

        <h1 className="text-xl bg-white p-2 uppercase">Restablece tu Password</h1>

        <h2>Ingresa tu correo para poder enviar las instrucciones</h2>

        <div className="flex flex-col mt-5">
          <label>Correo electrónico:</label>
          <input className="p-1" type="email" name="email" onChange={(e) => handleChange(e)} />
        </div>

        {cargando ? (
          <button className="bg-blue-800 text-white p-2 hover:bg-blue-600 mt-5" type="submit">
            <ClipLoader color={'#fff'} />
          </button>
        ) : (
          <button className="bg-blue-800 text-white p-2 hover:bg-blue-600 mt-5" type="submit">Enviar Instrucciones</button>
        )}


      </form>
    </>
  )
}

export default RestablecerPassword