import { use, useEffect, useState } from "react";
import { empleadosService } from "../../services/empleados.service";

import EmpleadoForm from "./EmpleadoForm";
import type { Empleado } from "../../types/empleado";


export default function EmpleadosList() {
    const [data, setData] = useState<Empleado[]>([])
    const [loading, setLoading] = useState(true)
    const [modalOpen, SetModalOpen] = useState(false)
    const [editing, setEditing] = useState<Empleado | null>(null)
    const [error, setError] = useState<string | undefined>()

    const fetchData = async () => {
        setLoading(true)
        setError(undefined)

        try {
            const list = await empleadosService.getAll()
            setData(list)
        } catch (error: any) {
            setError(error?.message || 'No se pudieron cargar los datos')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const onCreate = () => {
        setEditing(null)
        SetModalOpen(true)
    }

    const onEdit = () => {
        setEditing(emp)
        SetModalOpen(true)
    }

    const onDelete = async (id: string) => {
        if (!confirm('¿Estas seguro de eliminar el empleado?')) {
            return
        }
        await empleadosService.delete(id)
        fetchData()
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">Empleados</h1>
                <button onClick={onCreate}>Nuevo</button>
            </div>

            {error && <div className="alert alert-error">(error)</div>}

            <div className="bg-base-100 rounded-xl shadow">
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Usuario</th>
                                <th>Teléfono</th>
                                <th>Rol</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={5}>
                                        <span className="loading loading-dots loading -lg"></span>
                                    </td>
                                </tr>
                            ) : (
                                data.map((e) => (
                                    <tr key={e.id}>
                                        <td>
                                            {e.nombre} {e.apaterno} {e.amaterno}
                                        </td>

                                        <td>
                                            {e.usuario}
                                        </td>

                                        <td>
                                            {e.telefono}
                                        </td>

                                        <td>
                                            <span className="badge badge-ghost">
                                                {e.rol}
                                            </span>
                                        </td>

                                        <td className="text-right space-x-2">
                                            <button className="btn btn-sm" onClick={() => onEdit(e)}>Editar</button>
                                            <button className="btn btn-sm btn-error" onClick={() => onDelete(e.id)}>Eliminar</button>
                                        </td>

                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

         
<dialog className={`modal ${modalOpen ? 'modal-open' : ''}`}>
    <div className="modal-box">
        <EmpleadoForm
            model={editing || undefined}
            onClose={() => SetModalOpen(false)}
            onSaved={() => {
                SetModalOpen(false);
                fetchData();
            }}
        />
    </div>

    <form method="dialog" className="modal-backdrop" onClick={() => SetModalOpen(false)}>
        <button>Close</button>
    </form>
</dialog>

        </div>
    )
}