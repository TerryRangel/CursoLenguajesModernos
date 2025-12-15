<template>
  <AuthLayout>
    <v-card width="500">
      <v-card-title class="text-h6">
        Iniciar sesión
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="submit">
          <v-text-field
            v-model="user.usuario"
            required
            label="Usuario"
          />
          <v-text-field
            v-model="user.password"
            required
            label="Password"
            type="password"
          />
           <v-btn  class="mt-4 mb-2"  type="submit" block>
          Entrar
        </v-btn>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn variant="text" block to="/register">
          Registrarse
        </v-btn>


      </v-card-actions>
    </v-card>
  </AuthLayout>
</template>


<script setup>

import AuthLayout from '@/layouts/AuthLayout.vue';
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth.js';
const user= ref({usuario: '', password: ''});

//store
const authStore = useAuthStore();
const submit = () => {

  authStore.login(user.value)


}

</script>
