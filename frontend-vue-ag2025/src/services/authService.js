import axios from 'axios';

const api= axios.create({
  baseURL:'http://localhost:3000/empleados',

});


export const loginRequest = async (data) => {
const res= await api.post('/login', data);
return res.data;
}



export const registerRequest = async (data) => {
const res= await api.post('/create', data);
return res.data;
}



