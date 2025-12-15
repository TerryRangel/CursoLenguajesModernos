import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import FormError from "../../components/ui/FormError";
import { useState } from "react";
import { empleadosService } from "../../services/empleados.service";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
    nombre: z.string().min(1),
    apaterno: z.string().min(1),
    amaterno: z.string().min(1),
    direccion: z.string().min(1),
    telefono: z.string().min(1),
    ciudad: z.string().min(1),
    estado: z.string().min(1),
    usuario: z.string().min(1),
    password: z.string().min(1),
    rol: z.string().min(1)
})

type FormState = z.infer<typeof schema>

export default function Register() {
    const navigate = useNavigate()
    
    const [ form, setForm ] = useState<FormState>({
        nombre: '',
        apaterno: '',
        amaterno: '',
        direccion: '',
        telefono: '',
        ciudad: '',
        estado: '',
        usuario: '',
        password: '',
        rol: 'ADMIN'
    })

    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState<string | undefined>()
    const onChange = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((s) => ({ ...s, [k]: e.target.value }));
    
    const onSubmit = async (e: React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault()
        setError(undefined)
        const parse = schema.safeParse(form)

        if (!parse.success) {
            setError('Verifica los datos del formulario')
            return
        }

        try {
            await empleadosService.create(parse.data)
            navigate('/login')
        } 
        catch (error: unknown) {
            console.log('Error al registrar el empleado', error)
            setError('Error al registrar el empleado')
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-2">Crear cuenta</h1>
            
            <form onSubmit={onSubmit} className="grid grid-cols-1 gap-3">
                
            <div className="grid grid-col-1 md:grid-cols-3 gap-3">
                <Input
                    label="Nombre"
                    value={form.nombre}
                    required onChange={onChange('nombre')}
                />
                <Input
                    label="Apellido Paterno"
                    value={form.apaterno}
                    required onChange={onChange('apaterno')}
                />
                <Input
                    label="Apellido Materno"
                    value={form.amaterno}
                    required onChange={onChange('amaterno')}
                />
                
            </div>
            <div className="grid grid-cols-1">
               <Input
                    label="Dirección"
                    value={form.direccion}
                    required onChange={onChange('direccion')}
                />  
                </div> 

                <div className="grid grid-cols-1 md:grid-cols-3 gap">
<Input
                    label="Teléfono"
                    value={form.telefono}
                    required onChange={onChange('telefono')}
                />
                <Input
                    label="Ciudad"
                    value={form.ciudad}
                    required onChange={onChange('ciudad')}
                />
                <Input
                    label="Estado"
                    value={form.estado}
                    required onChange={onChange('estado')}
                />


                </div>
               
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input
                    label="Usuario"
                    value={form.usuario}
                    required onChange={onChange('usuario')}
                />
                <Input
                    label="Contraseña"
                    type="password"
                    value={form.password}
                    required onChange={onChange('password')}
                />
                <Input
                    label="Rol"
                    value={form.rol}
                    required onChange={onChange('rol')}
                />
                    
                </div>
                
                {error && <FormError message={error} />}
                <Button type="submit" loading={loading}>
                    Crear cuenta
                </Button>

                <div className="mt-3 text_sm">
                    Ya tienes cuenta? <Link to='/login' rel="stylesheet"  className="link link-primary"> Inicia Sesion</Link>
                </div>
                
            </form>
        </div>
    )
}