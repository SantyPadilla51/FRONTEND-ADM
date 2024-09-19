const EliminarPerfilToast = ({ cancelarEliminacion, eliminarConfirmado }) => {
    return (
        <>
            <div className="absolute w-1/3 text-center bg-slate-600 p-4 mx-auto text-white" >
                <h2 className="bg-black p-3 mb-5">¿Estás seguro de eliminar tu cuenta?</h2>
                <p>¡¡Esta acción no tiene vuelta atrás!!</p>
                <div className="flex justify-between mt-5">
                    <button className="bg-red-600 p-2 hover:bg-red-500" onClick={eliminarConfirmado}>Eliminar Cuenta</button>
                    <button
                        className="bg-blue-600 p-2 hover:bg-blue-500"
                        onClick={cancelarEliminacion}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </>
    )
}

export default EliminarPerfilToast;