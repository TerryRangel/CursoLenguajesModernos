<template>
  <v-app>
    <v-app-bar  app density="comfortable">
      <v-toolbar-title>
        Dashboard
      </v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer app>
      <v-list density="comfortable" nav>
        <v-list-item title="Empleados" to="/empleados"></v-list-item>
        <v-spacer></v-spacer>

        <v-list-item class="mt-auto" @click="logout" title="Cerrar Sesion" to="/login">
          <v-icon left>mdi-logout</v-icon>
          Cerrar Sesion

        </v-list-item>

      </v-list>

    </v-navigation-drawer>

    <v-main>
      <v-container>
        <slot></slot>
      </v-container>
    </v-main>
  </v-app>
</template>


<script setup>
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();

const logout = () => {
  authStore.logout();
};

</script>
