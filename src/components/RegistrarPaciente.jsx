import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../config/axios';
import NavbarAdmin from './NavbarAdmin';
import 'react-toastify/dist/ReactToastify.css';

const RegistrarPaciente = () => {

    const [cargando, setCargando] = useState(false)
    const navigate = useNavigate()

    const [paciente, setPaciente] = useState({
        email: "",
        edad: "",
        nombre: "",
        apellido: "",
        dni: "",
        sexo: "",
        telefono: "",
        sintomas: ""
    });

    const handleChange = (e) => {
        setPaciente({ ...paciente, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargando(true)
        toast.loading("Guardando Paciente")
        try {
            const token = localStorage.getItem('token')
            const url = "/crear-paciente"
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post(url, paciente, config)

            if (data.ok === true) {
                setCargando(false)
                setTimeout(() => {
                    navigate('/admin/pacientes')
                }, 1500);
            } else {
                toast.error(data.msg)
            }

        } catch (error) {
            toast.error('Hubo un error')
            return;
        }
    }

    return (
        <>
            <NavbarAdmin />
            <ToastContainer />
            <form className="drop-shadow-lg bg-slate-400 flex flex-col p-4  gap-3 md:w-1/2 md:mt-32 md:mx-auto lg:w-1/2 lg:mx-auto lg:mt-32" onSubmit={handleSubmit}>
                <h3 className="text-xl font-bold">Crea un Nuevo Paciente</h3>

                <div className="flex flex-col">
                    <label>Nombre:</label>
                    <input className="p-1" type="text" name="nombre" required value={paciente.nombre} onChange={(e) => handleChange(e)} />
                </div>

                <div className="flex flex-col">
                    <label>Apellido:</label>
                    <input className="p-1" type="text" name="apellido" required value={paciente.apellido} onChange={(e) => handleChange(e)} />
                </div>

                <div className="flex flex-col">
                    <label>Edad:</label>
                    <input className="p-1" type="text" name="edad" required value={paciente.edad} onChange={(e) => handleChange(e)} minLength={1} maxLength={2} />
                </div>

                <div className="flex flex-col">
                    <label>DNI:</label>
                    <input className="p-1" type="text" maxLength={8} name="dni" required value={paciente.dni} onChange={(e) => handleChange(e)} />
                </div>

                <div className="flex flex-col">
                    <label>Sexo:</label>
                    <select name="sexo" id="sexo" className='p-1' required value={paciente.sexo} onChange={(e) => handleChange(e)} >
                        <option value='' disabled>Seleccione--</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label>Telefono:</label>
                    <input className="p-1" type="text" maxLength={10} name="telefono" required value={paciente.telefono} onChange={(e) => handleChange(e)} />
                </div>

                <div className="flex flex-col">
                    <label>Email:</label>
                    <input className="p-1" type="email" name="email" value={paciente.email} onChange={(e) => handleChange(e)} />
                </div>

                <div className="flex flex-col">
                    <label>Sintomas:</label>
                    <textarea className="p-1" type="text" rows={8} name="sintomas" value={paciente.sintomas} onChange={(e) => handleChange(e)} />
                </div>

                <button
                    className={`bg-blue-700 font-bold w-full text-white p-2 ${cargando ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                    onClick={(e) => handleSubmit(e)}
                    disabled={cargando}
                >
                    {cargando ? 'Guardando...' : 'Guardar Paciente'}
                </button>
            </form>
        </>
    )
}

export default RegistrarPaciente