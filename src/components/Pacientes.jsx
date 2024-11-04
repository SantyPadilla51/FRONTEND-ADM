import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import clienteAxios from "../config/axios";
import NavbarAdmin from "./NavbarAdmin"
import 'react-toastify/dist/ReactToastify.css';


const Pacientes = () => {

    const navigate = useNavigate()
    const [buscador, setBuscador] = useState('')
    const [pacientes, setPacientes] = useState([])
    const [pacienteParticular, setPacienteParticular] = useState(null)
    const [eliminandoId, setEliminandoId] = useState(null)

    const buscarPaciente = async (e) => {
        e.preventDefault()
        const dni = Number(buscador)
        try {
            const token = localStorage.getItem('token')
            const url = `/pacientes/${dni}`
            const { data } = await clienteAxios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setPacienteParticular(data.paciente[0]);
        } catch (error) {
            toast.error("No se encontro al paciente")
        }
    }

    const obtenerPacientes = async () => {
        try {
            const token = localStorage.getItem('token')
            const url = "/pacientes"
            const { data } = await clienteAxios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setPacientes(data)

        } catch (error) {
            console.log('Hubo un error');
        }
    }

    const eliminarPaciente = async (e, id) => {
        const cardBody = e.target.parentElement.parentElement
        setEliminandoId(id)
        try {
            const token = localStorage.getItem('token')
            const url = `/eliminar-paciente/${id}`
            const { data } = await clienteAxios.delete(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (data.ok === true) {
                cardBody.classList.add('scale-out-horizontal')
                setTimeout(() => {
                    obtenerPacientes()
                }, 1000);
            } else {
                toast.error(data.msg)
            }

        } catch (error) {
            setCargando(false)
            toast.error('Ocurrió un error')
        } finally {
            setEliminandoId(null)
        }
    }

    const verPacientes = () => {
        setPacienteParticular(null)
        setBuscador('')
    }

    useEffect(() => {
        obtenerPacientes()
    }, []);

    return (
        <>
            <NavbarAdmin />
            <ToastContainer />
            <div className="mx-3 lg:grid grid-cols-7 items-center">
                <form className="mx-auto mt-5 col-start-2 col-end-5 w-full" onSubmit={buscarPaciente}>
                    <div className="flex">
                        <input
                            type="text"
                            placeholder="Buscar Paciente por DNI..."
                            className="p-3 w-full"
                            value={buscador}
                            onChange={(e) => setBuscador(e.target.value)}
                            minLength={8}
                            maxLength={8}
                        />
                        <button type="submit" className="bg-black text-white px-8 hover:bg-slate-600">
                            Buscar
                        </button>
                    </div>
                </form>

                <div className="lg:ms-8 flex col-start-5 col-end-8 gap-3">
                    <div className="">
                        <button
                            className="bg-blue-600 text-white px-5 hover:bg-blue-500 p-3 mt-5 text-center"
                            onClick={() => navigate('crear-paciente')}
                        >
                            Agregar Paciente
                        </button>
                    </div>
                    <div className="">
                        <button
                            className="bg-green-600 text-white hover:bg-green-500 p-3 mt-5 text-center"
                            onClick={verPacientes}
                        >
                            Ver todos los Pacientes
                        </button>
                    </div>
                    <div className="">
                        <button
                            className="bg-amber-500 text-white px-5 hover:bg-amber-400 p-3 mt-5 text-center"
                            onClick={() => navigate('perfil')}
                        >
                            Mi Perfil
                        </button>
                    </div>
                </div>

            </div>

            <div className=" md:grid md:grid-cols-3 lg:grid lg:grid-cols-6 gap-4 m-8">
                {pacienteParticular ? (
                    <div className="bg-white flex flex-col gap-10 p-2" key={pacienteParticular.id}>
                        <div className="flex flex-col gap-2">
                            <p className="font-semibold">Nombre: <span className="text-black font-normal">{pacienteParticular.nombre}</span></p>
                            <p className="font-semibold">Apellido: <span className="font-normal">{pacienteParticular.apellido}</span></p>
                            <p className="font-semibold">Edad: <span className="text-black font-normal">{pacienteParticular.edad}</span></p>
                            <p className="font-semibold">Sexo: <span className="text-black font-normal">{pacienteParticular.sexo}</span></p>
                            <p className="font-semibold">Telefono: <span className="text-black font-normal">{pacienteParticular.telefono}</span></p>
                            <p className="font-semibold">DNI: <span className="text-black font-normal">{pacienteParticular.dni}</span></p>
                            <p className="font-semibold">Sintomas: <span className="text-black font-normal">{pacienteParticular.sintomas.length > 100
                                ? `${pacienteParticular.sintomas.slice(0, 100)}...`
                                : pacienteParticular.sintomas}</span></p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
                                onClick={() => navigate(`editar/${pacienteParticular.id}`)}
                            >
                                Editar Paciente
                            </button>
                            <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4" onClick={() => navigate(`actualizar-sintomas/${pacienteParticular.id}`)}>
                                Actualizar Sintomas
                            </button>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4"
                                onClick={() => eliminarPaciente(pacienteParticular.id)}
                            >
                                Eliminar Paciente
                            </button>
                        </div>
                    </div>
                ) : pacientes.length === 0 ? (
                    <p className="text-center text-white bg-black p-2 col-start-2 col-end-5">No hay pacientes registrados</p>
                ) : (
                    pacientes.map(paciente => (
                        <div className="mt-4 bg-white shadow-2xl border-solid border-2 border-black flex flex-col lg:gap-10 p-2 justify-between" key={paciente.id}>
                            <div className="flex flex-col gap-2">
                                <p className="font-semibold">Nombre: <span className="text-black font-normal">{paciente.nombre}</span></p>
                                <p className="font-semibold">Apellido: <span className="font-normal">{paciente.apellido}</span></p>
                                <p className="font-semibold">Edad: <span className="text-black font-normal">{paciente.edad}</span></p>
                                <p className="font-semibold">Sexo: <span className="text-black font-normal">{paciente.sexo}</span></p>
                                <p className="font-semibold">Telefono: <span className="text-black font-normal">{paciente.telefono}</span></p>
                                <p className="font-semibold">DNI: <span className="text-black font-normal">{paciente.dni}</span></p>
                                <p className="font-semibold">Sintomas: <span className="text-black font-normal">{paciente.sintomas.length > 100
                                    ? `${paciente.sintomas.slice(0, 100)}...`
                                    : paciente.sintomas}</span></p>
                            </div>

                            <div className="bottom-0 flex flex-col gap-2">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
                                    onClick={() => navigate(`editar/${paciente.id}`)}
                                >
                                    Editar Paciente
                                </button>
                                <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4" onClick={() => navigate(`actualizar-sintomas/${paciente.id}`)}>
                                    Actualizar Sintomas
                                </button>
                                <button
                                    className={`bg-red-700 font-bold w-full text-white p-2 ${eliminandoId === paciente.id ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'}`}
                                    onClick={(e) => eliminarPaciente(e, paciente.id)}
                                    disabled={eliminandoId === paciente.id}
                                >
                                    {eliminandoId === paciente.id ? 'Eliminando...' : 'Eliminar Paciente'}
                                </button>

                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}

export default Pacientes