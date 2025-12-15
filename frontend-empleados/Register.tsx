import Input from "./src/components/ui/Input";
import Button from "./src/components/ui/Button";
import FormError from "./src/components/ui/FormError";
import { useState } from "react";
import { empleadosService } from "./src/services/empleados.service";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
    nombre: z.string().min(2),
    apaterno: z.string().min(3),
    amaterno: z.string().min(3),
    direccion: z.string().min(5),
    telefono: z.string().min(10),
    ciudad: z.string().min(4),
    estado: z.string().min(4),
    usuario: z.string().min(5),
    password: z.string().min(6),
    rol: z.string().min(2)
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

    const onChange=(k: keyof FormState, v:string) => {(e:React.ChangeEvent<HTMLInputElement>)=>{
        setForm((s)=>({...s, [k]: e.target.value}))
    }

    const onSubmit =async (e: React.ChangeEvent) => {
        e.preventDefault();
        setError(undefined);
        const parse=schema.safeParse(form);
        if(!parse.success){
            setError('Por favor revisa los datos del formulario');
            return;
        }
        setLoading (true);
        try{
            await empleadosService.create(parse.data)
            navigate('/login');


        }catch (error){
            console.log('@@@ error',error);
            setError('Error al registrar el empleado. Intenta de nuevo.');
        }finally{
            setLoading(false);
        }

    }


    return (
        <div>
            
            <div/>
    )
}
}