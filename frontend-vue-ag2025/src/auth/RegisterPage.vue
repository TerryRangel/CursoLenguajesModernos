

<template>
<AuthLayout>
  <v-card width="700">
    <v-card-title class="text-h6">
      Crear Nueva Cuenta
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="submit">
         <v-text-field v-model="user.nombre" required label="Nombre"/>
        <v-text-field v-model="user.apaterno" required label="Apellido Paterno"/>
        <v-text-field v-model="user.amaterno" required label="Apellido Materno"/>
        <v-text-field v-model="user.direccion" required label="Dirrecion"/>
        <v-text-field v-model="user.ciudad" required label="Ciudad"/>
        <v-text-field v-model="user.estado" required label="Estado"/>
        <v-text-field v-model="user.telefono" required label="Telefono"/>
        <v-text-field v-model="user.mail" required label="Email"/>
        <v-text-field v-model="user.usuario" required label="Usuario"/>
        <v-text-field v-model="user.password" required label="Password" type="password"/>
        <v-btn  color="secondary" class="mt-4 mb-2"  type="submit" block> Registrarse </v-btn>
  <v-card-actions> <v-btn variant="text" block to="/">Ya tengo una cuenta </v-btn></v-card-actions>



      </v-form>
    </v-card-text>

  </v-card>
</AuthLayout>
</template>

<script setup>
import AuthLayout from '@/layouts/AuthLayout.vue';
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
const authStore = useAuthStore();

const user = ref({
  nombre: '',
  apaterno: '',
  amaterno: '',
  direccion: '',
  telefono: '',
  ciudad: '',
  estado: '',
  mail: '',
  usuario: '',
  password: ''
});

const submit =() => {
  console.log('Registrando usuario:', user.value);
  authStore.register(user.value);
};





</script>

<style scoped>
/* Aquí puedes dar estilos locales */
</style>
