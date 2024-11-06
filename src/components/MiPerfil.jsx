import { useEffect, useState } from "react"
import clienteAxios from "../config/axios"
import NavbarAdmin from "./NavbarAdmin"
import EliminarPerfilToast from "./EliminarPerfilToast"

const MiPerfil = () => {

    const [datos, setDatos] = useState({
        nombre: "",
        apellido: "",
        email: "",
        dni: ""
    })
    const [eliminarActivado, setEliminarActivado] = useState(false)

    const obtenerPerfil = async () => {
        try {
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.get('/perfil', config)

            setDatos({
                nombre: data.doctor.nombre,
                apellido: data.doctor.apellido,
                email: data.doctor.email,
                dni: data.doctor.dni,
            })

        } catch (error) {
            console.log('Hubo un error');
        }
    }

    // const eliminarPerfil = async (e) => {
    //     setEliminarActivado(true)
    //     e.preventDefault()
    // try {
    //     const token = localStorage.getItem('token')
    //     const resultado = await fetch('http://localhost:6543/eliminar-perfil',
    //         {
    //             method: "DELETE",
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization: `Bearer ${token}`
    //             }
    //         }
    //     )
    //     const respuesta = await resultado.json()

    //     if (respuesta.ok === true) {
    //         localStorage.removeItem('token')
    //         toast.loading('Eliminando Cuenta...')
    //     }
    // }
    // catch (error) {
    //     console.log('Hubo un error');
    // }
    // }

    const eliminarPerfil = (e) => {
        e.preventDefault()
        console.log("eliminando..");

        setEliminarActivado(true) // Activa el modal de confirmación
    }

    const cancelarEliminacion = (e) => {
        e.preventDefault()
        setEliminarActivado(false) // Desactiva el modal al cancelar
    }

    useEffect(() => {
        obtenerPerfil()
    }, [])

    return (
        <>
            <NavbarAdmin />
            <div className="mx-4 lg:w-1/2 lg:mx-auto bg-white  mt-10 p-4">
                <h1 className="bg-black text-white p-2 mb-5 font-bold">Mi Perfil</h1>
                <ul>
                    <li className="font-semibold">Nombre: <span className="font-light">{datos.nombre}</span></li>
                    <li className="font-semibold">Apellido: <span className="font-light">{datos.apellido}</span></li>
                    <li className="font-semibold">DNI: <span className="font-light">{datos.dni}</span></li>
                    <li className="font-semibold">Correo electrónico: <span className="font-light">{datos.email}</span></li>
                </ul>
                <div className="flex mt-4 justify-between">
                    {eliminarActivado ? (
                        <EliminarPerfilToast cancelarEliminacion={cancelarEliminacion} />
                    ) : (
                        <button
                            className="bg-red-600 hover:bg-red-500 text-white p-2"
                            onClick={eliminarPerfil}
                        >
                            Eliminar Cuenta
                        </button>
                    )}

                    <button className="bg-blue-600 hover:bg-blue-500 text-white p-2">Editar Perfil</button>
                </div>
            </div>

        </>
    )
}

export default MiPerfil