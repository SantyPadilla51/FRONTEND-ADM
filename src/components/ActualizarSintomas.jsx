import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import clienteAxios from "../config/axios";
import NavbarAdmin from "./NavbarAdmin";
import 'react-toastify/dist/ReactToastify.css';

const ActualizarSintomas = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const [cargando, setCargando] = useState(false)
    const [paciente, setPaciente] = useState({
        nombre: "",
        apellido: "",
        edad: "",
        dni: "",
        sexo: "",
        email: "",
        telefono: "",
        sintomas: ""
    })

    const obtenerPaciente = async () => {
        try {
            const token = localStorage.getItem('token')
            const url = `/pacienteId/${id}`
            const { data } = await clienteAxios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setPaciente({
                nombre: data.paciente[0].nombre || "",
                apellido: data.paciente[0].apellido || "",
                edad: data.paciente[0].edad || "",
                dni: data.paciente[0].dni || "",
                sexo: data.paciente[0].sexo || "",
                email: data.paciente[0].email || "",
                telefono: data.paciente[0].telefono || "",
                sintomas: data.paciente[0].sintomas || ""
            });
        } catch (error) {
            toast.error("Error al obtener el paciente");
        }
    }

    const handleChange = (e) => {
        setPaciente({ ...paciente, [e.target.name]: e.target.value });
    }

    const actualizarPaciente = async (e) => {
        e.preventDefault();
        try {
            setCargando(true)
            toast.loading("Actualizando Sintomas...", {
                position: "top-center"
            })
            const token = localStorage.getItem('token')
            const url = `/actualizar-paciente/${id}`
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put(url, JSON.stringify(paciente), config);

            if (data.ok === true) {
                setTimeout(() => {
                    navigate("/admin/pacientes");
                }, 1000);
            } else {
                toast.error(data.msg);
            }
        } catch (error) {
            setCargando(false)
            toast.error("Ha acorrido un error")
        }
    }

    useEffect(() => {
        obtenerPaciente()
    }, [])


    return (
        <>
            <NavbarAdmin />
            <ToastContainer />
            <div>
                <h1 className="text-2xl text-center mt-8">Actualizar Sintomas del Paciente</h1>
                <div className="mx-5 mt-8 mb-8 sm:w-1/2 sm:mx-auto md:w-1/2 lg:w-1/2 bg-slate-300 p-4 lg:mx-auto">
                    <h2 className="font-semibold">Nombre: <span className="font-light">{paciente.nombre} {paciente.apellido}</span> </h2>
                    <h2 className="font-semibold">DNI: <span className="font-light">{paciente.dni}</span></h2>
                    <h2 className="font-semibold">Edad: <span className="font-light">{paciente.edad} años</span></h2>
                    <h2 className="font-semibold">Sexo: <span className="font-light">{paciente.sexo}</span></h2>
                    <h2 className="font-semibold">Email: <span className="font-light">{paciente.email}</span></h2>
                    <h2 className="font-semibold">Telefono: <span className="font-light">{paciente.telefono}</span></h2>

                    <form className="mt-5 flex flex-col" onSubmit={actualizarPaciente}>
                        <h2>Sintomas:</h2>
                        <textarea className="p-1" name="sintomas" id="" rows={8} value={paciente.sintomas} onChange={e => handleChange(e)} ></textarea>
                    </form>
                    <button
                        className={`bg-blue-800 w-full text-white p-2 mt-5 ${cargando ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                        type="submit"
                        onClick={e => actualizarPaciente(e)}
                        disabled={cargando}
                    >
                        {cargando ? 'Guardando...' : 'Guardar Cambios'}
                    </button>
                </div>
            </div>




        </>
    )
}

export default ActualizarSintomas