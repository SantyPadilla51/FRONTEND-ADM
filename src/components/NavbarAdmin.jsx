import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const NavbarAdmin = () => {

    const navigate = useNavigate()
    const cerrarSesion = (e) => {
        e.preventDefault()
        const borrarToken = localStorage.removeItem('token')

        if (borrarToken === undefined) {
            toast.loading('Cerrando Sesion', {
                position: "top-center"
            });
            setTimeout(() => {
                navigate("/")
            }, 1500);
        } else {
            toast.error('Hubo un error al cerrar sesión')
        }
    }

    const handleInicio = (e) => {
        e.preventDefault()
        navigate("/admin/pacientes")
    }


    return (
        <>
            <ToastContainer />
            <nav className="bg-black p-4 uppercase text-white flex justify-evenly items-center">
                <h1>Administrador de Pacientes</h1>

                <section className="flex gap-5">
                    <div className="flex gap-4">
                        <button className="bg-yellow-700 p-2 uppercase hover:bg-yellow-500" onClick={e => handleInicio(e)} >Inicio</button>
                    </div>
                    <div className="flex gap-4">
                        <button className="bg-red-800 p-2 uppercase hover:bg-red-500" onClick={e => cerrarSesion(e)} >Cerrar Sesion</button>
                    </div>
                </section>
            </nav>
        </>
    )
}

export default NavbarAdmin