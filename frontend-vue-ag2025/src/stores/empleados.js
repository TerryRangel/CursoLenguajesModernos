import {defineStore} from 'pinia';
import {getEmpleados,updateEmpleado,createEmpleado,deleteEmpleado} from '@/services/empleadoService.js';

export const useEmpleadoStore = defineStore('empleados', {
state : () => ({
    empleados: [],
    loading: false,
}),

actions:{

  async fetchEmpleados(){
    this.loading = true;
    const {data} = await getEmpleados();
    console.log("consola data", data);
    //dejarsolodata
    this.empleados = data.result;
    this.loading = false;
    }
  ,



  async addEmpleado(empleado){
await createEmpleado(empleado);
await this.fetchEmpleados();
  alert('Empleado creado exitosamente! :)');
  },


  async editEmpleado(id, empleado){
    await updateEmpleado(id, empleado);
    await this.fetchEmpleados();
    alert('Empleado actualizado exitosamente! :)');
  },

  async removeEmpleado(id){
    await deleteEmpleado(id);
    await this.fetchEmpleados();
    alert('Empleado eliminado exitosamente! :)');




  }

}



})
