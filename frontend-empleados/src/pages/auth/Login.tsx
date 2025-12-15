import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import FormError from "../../components/ui/FormError";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [ usuario, setUsuario ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState<string | undefined>()

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(undefined)

        try {
            await login(usuario, password)
            navigate('/dashboard')
            
        } 
        catch (error) {
            console.log('Error de autenticación', error)
            setError('Error de autenticación')
        } 
        finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-2">Iniciar Sesión</h1>

            <form onSubmit={onSubmit} className="space-y-3">
                <Input
                    label="Usuario"
                    value={usuario}
                    required onChange={(e) => setUsuario(e.target.value)}
                />

                <Input
                    label="Contraseña"
                    value={password}
                    required onChange={(e) => setPassword(e.target.value)}
                    type="password"
                />

              
                    {error && <FormError message={error} />}


                <Button type="submit" loading={loading} className="w-full">
                    Iniciar Sesión
                </Button>

                <div className="text-sm mt-3">
                    ¿No tienes una cuenta?
                    <Link to="/register" className="link link-primary">
                        Regístrate
                    </Link>
                </div>
            </form>
        </div>
    )
}