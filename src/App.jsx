import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthProvider"
import InicioSesion from "./components/InicioSesion"
import EditarPaciente from "./components/EditarPaciente"
import RegistrarUser from "./components/RegistrarUser"
import RegistrarPaciente from "./components/RegistrarPaciente"
import ConfirmarCuenta from "./components/ConfirmarCuenta"
import RestablecerPassword from "./components/RestablecerPassword"
import NuevoPassword from "./components/NuevoPassword"
import RutasProtegidas from "./components/RutasProgetidas"
import ContenedorPacientes from './components/ContenedorPacientes'
import ActualizarSintomas from './components/ActualizarSintomas'
import MiPerfil from './components/MiPerfil'


function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<InicioSesion />} />
            <Route path="crear-cuenta" element={<RegistrarUser />} />
            <Route path="confirmar-cuenta/:token" element={<ConfirmarCuenta />} />
            <Route path="olvide-password/" element={<RestablecerPassword />} />
            <Route path="olvide-password/:token" element={<NuevoPassword />} />

            {/* Rutas protegidas */}
            <Route path='/admin' element={<RutasProtegidas />}>
              <Route path='pacientes' element={<ContenedorPacientes/>} />
              <Route path="pacientes/crear-paciente" element={<RegistrarPaciente />} />
              <Route path="pacientes/editar/:id" element={<EditarPaciente />} />
              <Route path="pacientes/actualizar-sintomas/:id" element={<ActualizarSintomas />} />
              <Route path='pacientes/perfil' element={<MiPerfil/>}/>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App
