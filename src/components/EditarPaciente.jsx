import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import clienteAxios from "../config/axios";
import NavbarAdmin from "./NavbarAdmin";
import 'react-toastify/dist/ReactToastify.css';


const EditarPaciente = () => {

    const [cargando, setCargando] = useState(false)
    const navigate = useNavigate();
    const { id } = useParams()
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        edad: "",
        dni: "",
        sexo: "",
        email: "",
        telefono: ""
    });

    const obtenerPaciente = async () => {
        try {
            const token = localStorage.getItem('token')
            const url = `/pacienteId/${id}`
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.get(url, config)

            setFormData({
                nombre: data.paciente[0].nombre || "",
                apellido: data.paciente[0].apellido || "",
                edad: data.paciente[0].edad || "",
                dni: data.paciente[0].dni || "",
                sexo: data.paciente[0].sexo || "",
                email: data.paciente[0].email || "",
                telefono: data.paciente[0].telefono || ""
            });
        } catch (error) {
            toast.error("Ha ocurrido un error");
        }
    }

    const actualizarPaciente = async (e) => {
        e.preventDefault()
        setCargando(true)
        toast.loading('Actualizando Paciente..',{
            position: "top-center"
        })
        try {
            const token = localStorage.getItem('token')
            const url = `/actualizar-paciente/${id}`;
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.put(url, JSON.stringify(formData), config)

            if (data.ok === true) {
                setTimeout(() => {
                    navigate("/admin/pacientes")
                }, 1000);
            } else {
                setCargando(false)
                toast.error(data.msg);
            }

        } catch (error) {
            setCargando(false)
            toast.error('Ocurrio un error')
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    useEffect(() => {
        obtenerPaciente();
    }, [])

    return (
        <>
            <NavbarAdmin />
            <ToastContainer />
            <form action="" className="mx-4 mb-4 mt-8 bg-slate-400 flex flex-col lg:mx-52 lg:mt-32 p-4 gap-3 font-medium">
                <div className="flex flex-col">
                    <label>Nombre:</label>
                    <input className=" p-1" type="text" id="nombre" name="nombre" required value={formData.nombre} onChange={handleChange} />
                </div>

                <div className="flex flex-col">
                    <label >Apellido:</label>
                    <input className="p-1" type="text" id="apellido" name="apellido" required value={formData.apellido} onChange={handleChange} />
                </div>

                <div className="flex flex-col">
                    <label>Edad</label>
                    <input className="p-1" type="text" name="edad" id="edad" minLength={1} maxLength={2} value={formData.edad} onChange={handleChange} />
                </div>

                <div className="flex flex-col">
                    <label>DNI</label>
                    <input className="p-1" type="text" name="dni" id="dni" minLength={8} maxLength={8} value={formData.dni} onChange={handleChange} />
                </div>

                <div className="flex flex-col">
                    <label >Sexo:</label>
                    <select className="p-1" id="sexo" name="sexo" required onChange={handleChange} >
                        <option>{formData.sexo}</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label>Email:</label>
                    <input className="p-1" type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                </div>

                <div className="flex flex-col">
                    <label>Teléfono:</label>
                    <input className="p-1" type="number" id="telefono" name="telefono" required value={formData.telefono} onChange={handleChange} />
                </div>

                <button
                    className={`bg-blue-800 w-full text-white p-2 mt-5 ${cargando ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                    type="submit"
                    onClick={e => actualizarPaciente(e)}
                    disabled={cargando}
                >
                    {cargando ? 'Guardando...' : 'Guardar Cambios'}
                </button>


            </form>
        </>
    )
}

export default EditarPaciente