import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button"
import { use, useState } from "react";
import { set, z } from "zod";
import type { CreateEmpleadoDto, Empleado } from "../../types/empleado";
import { empleadosService } from "../../services/empleados.service";

const createSchema = z.object({
    nombre: z.string().min(1),
    apaterno: z.string().min(1),
    amaterno: z.string().min(1),
    direccion: z.string().min(1),
    telefono: z.string().min(1),
    ciudad: z.string().min(1),
    estado: z.string().min(1),
    usuario: z.string().min(1),
    password: z.string().min(1).optional().or(z.literal('')),
    rol: z.string().min(1)
})

type Props = {
    model?: Empleado
    onClose: () => void
    onSaved: () => void
}

export default function EmpleadoForm({ model, onClose, onSaved }: Props) {
    const isEdit = Boolean(model?.id)

    const [form, setForm] = useState<CreateEmpleadoDto>({
        nombre: model?.nombre || '',
        apaterno: model?.apaterno || '',
        amaterno: model?.amaterno || '',
        direccion: model?.direccion || '',
        telefono: model?.telefono || '',
        ciudad: model?.ciudad || '',
        estado: model?.estado || '',
        usuario: model?.usuario || '',
        password: "",
        rol: model?.rol || 'ADMIN',
    })

    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | undefined>()

    const onChange = (k: keyof CreateEmpleadoDto) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((s) => ({...s, [k]: e.target.value})) 
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(undefined)
        const parsed = createSchema.safeParse(form)
        if (!parsed.success) {
            setError('Revisa los datos del formulario')
            return
        }
        setSaving(true)

        try {
            const { password, ...data } = parsed.data
            console.log(password)
            if (isEdit && model) {
                await empleadosService.update(model.id, data)
            } else {
                await empleadosService.create(parsed.data)
            }
        } 
        catch (error: any) {
            setError(error?.message || 'Error al guardar el empleado')
        }
        finally {
            setSaving(false)
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit} className='grid grid-cols-1 gap-3'>
                <h3>{isEdit ? 'Editar' : 'Crear'} empleado</h3>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                    <Input 
                        label="Nombre" 
                        value={form.nombre} 
                        onChange={onChange('nombre')} required 
                    />
                    <Input 
                        label="A. Paterno" 
                        value={form.apaterno} 
                        onChange={onChange('apaterno')} required 
                    />
                    <Input 
                        label="A. Materno" 
                        value={form.amaterno} 
                        onChange={onChange('amaterno')} required 
                    />
                    <Input 
                        label="A. Materno" 
                        value={form.amaterno} 
                        onChange={onChange('amaterno')} 
                        required 
                    />
                </div>

                <div className='grid grid-cols-1'>
                    <Input 
                        label="Dirección" 
                        value={form.direccion} 
                        onChange={onChange('direccion')} required 
                    />
                </div>
            
                <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                    <Input 
                        label="Teléfono" 
                        value={form.telefono} 
                        onChange={onChange('telefono')} required 
                    />
                    <Input 
                        label="Ciudad" 
                        value={form.ciudad} 
                        onChange={onChange('ciudad')} required 
                    />
                    <Input 
                        label="Estado" 
                        value={form.estado} 
                        onChange={onChange('estado')} required 
                    />
                </div>
                
                <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                    <Input 
                        label="Usuario" 
                        value={form.usuario} 
                        onChange={onChange('usuario')} required
                    />
                    <Input 
                        label="Contraseña" 
                        type="password" 
                        value={form.password} 
                        onChange={onChange('password')} required
                    />
                    <Input 
                        label="Rol" 
                        value={form.rol} 
                        onChange={onChange('rol')} 
                        required 
                    />
                </div>

                {error && <div className='alert alert-error'>{error}</div>}

                <div className="flex justify-end gap-2 pt-2">
                    <button className="btn" type="button" onClick={onClose}>
                        Cancelar
                    </button>
                    <Button type="submit" loading={saving} className="w-full">
                        {isEdit ? 'Actualizar' : 'Crear'}
                    </Button>
                </div>
                
                <Button type="submit" loading={loading} className='w-full'> 
                    Registrar Usuario 
                </Button>
            </form>
        </div>
    )

}