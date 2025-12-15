import axios from "axios";


const api= axios.create({
    baseURL: 'http://localhost:3000/empleados'
});


api.interceptors.request.use((config) => {
   const token = localStorage.getItem('token');
   console.log("token desde empleadoService", token);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export const getEmpleados = async () => {
   return  await api.get('/getAll');
}

export const createEmpleado = async (data) => {
   return  await api.post('/create', data);
}

export const updateEmpleado = async (id, data) => {
    return  await api.put(`/update/${id}`, data);
  }
 export const deleteEmpleado = async (id) => {
    return  await api.delete(`/delete/${id}`);
  }

