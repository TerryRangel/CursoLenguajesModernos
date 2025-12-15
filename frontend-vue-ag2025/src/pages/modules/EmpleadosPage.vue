<template>
  <DefualtLayout>
    <h1>CRUD Empleados</h1>
    <v-card class="mt-2">

      <v-card-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" class="mt-4 mb-2"  @click="openAddModal" > Nuevo Empleado </v-btn>


      </v-card-title>

      <v-card-text>
        <v-data-table
        :headers="headers"
        :items="empleados"
        :loading="loading"
        loading-text="Cargando Empleados..."

        >


        <template #item.actions="{item }">

          <v-btn color="green" icon  @click="edit (item)" > <v-icon>mdi-pencil</v-icon></v-btn>
          <v-btn color="red" icon  @click="removed(item.id)" > <v-icon>mdi-delete</v-icon></v-btn>


        </template>


        </v-data-table>
      </v-card-text>

    </v-card>
    <EmpleadoForm v-model="showForm" :empleado="selected"  @saved="onSaved"/>
  </DefualtLayout>
</template>

<script setup>
import DefualtLayout from '@/layouts/DefualtLayout.vue';
import {onMounted ,ref} from 'vue';
import { useEmpleadoStore } from '@/stores/empleados.js';
import { storeToRefs } from 'pinia';
import EmpleadoForm from '@/components/EmpleadoForm.vue';

const empleadoStore = useEmpleadoStore();
const { empleados, loading } = storeToRefs(empleadoStore);
const headers = [

  { text: 'Nombre', value: 'nombre' },
  { text: 'Apellido Paterno', value: 'apaterno' },
  { text: 'Apellido Materno', value: 'amaterno' },
  { text: 'Email', value: 'mail' },
  { text: 'Usuario', value: 'usuario' },
  { text: 'Acciones', value: 'actions', sortable: false }
];


const showForm = ref(false);
const selected = ref(null);
onMounted(() => {
  empleadoStore.fetchEmpleados();
});

const edit = (item) => {
console.log('Editar empleado:', item);
selected.value = item;
showForm.value = true;
};
const removed = (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este empleado?")) {
    empleadoStore.removeEmpleado(id);}
};
const openAddModal = () => {
  console.log('Abrir modal para agregar nuevo empleado');
  selected.value = null;
  showForm.value = true;
};

const onSaved = () => {
  showForm.value = false;

};




</script>
