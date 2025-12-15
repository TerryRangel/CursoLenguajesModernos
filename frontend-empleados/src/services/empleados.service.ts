import { api} from "./api";
import type { CreateEmpleadoDto,Empleado,UpdateEmpleado } from "../types/empleado";


export const empleadosService = {

    async getAll(): Promise<Empleado[]> {
        const { data } = await api.get('/empleados/getall');


        if (!data.ok) {
            throw new Error(data?.message || 'Error al obtener empleados');
        }

        return data.result as Empleado[];
    },


    async create (payload: CreateEmpleadoDto){
          console.log("Payload enviado al backend:", payload)

        const {data} = await api.post('/empleados/create',payload)

        if(!data.ok){
            throw new Error(data?.message || 'Error al crear empleado');
        }
        return data.result as Empleado;

    }
    ,
    async update (id:string,payload: UpdateEmpleado){
        const {data} = await api.put(`/empleados/update/${id}`,payload)
        if(!data.ok){
            throw new Error(data?.message || 'Error al actualizar empleado');
        }
        return data.result as Empleado;
    },

    async remove (id:string){
        const {data} = await api.delete(`/empleados/delete/${id}`)
        if(!data.ok){
            throw new Error(data?.message || 'Error al eliminar empleado');
        }
        return data.result as Empleado;
    }


}