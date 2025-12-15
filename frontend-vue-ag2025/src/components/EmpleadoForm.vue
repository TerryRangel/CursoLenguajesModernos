<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title class="text-h6">
        {{ empleado?.id ? 'Editar Empleado' : 'Nuevo Empleado' }}
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="save">
          <v-text-field v-model="user.nombre" required label="Nombre" />
          <v-text-field v-model="user.apaterno" required label="A. Paterno" />
          <v-text-field v-model="user.amaterno" required label="A. Materno" />
          <v-text-field v-model="user.direccion" required label="Dirección" />
          <v-text-field v-model="user.telefono" required label="Teléfono" />
          <v-text-field v-model="user.ciudad" required label="Ciudad" />
          <v-text-field v-model="user.estado" required label="Estado" />
          <v-text-field v-model="user.mail" required label="Email" />
          <v-text-field v-model="user.usuario" required label="Usuario" />
          <v-text-field v-model="user.password" required label="Password" type="password" />
          <v-btn color="secondary" class="mt-4" type="submit" block> Guardar </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch} from 'vue';
import { useEmpleadoStore } from '@/stores/empleados.js';

const props = defineProps({
 modelValue:Boolean,
  empleado: Object
});
const emit = defineEmits(['update:modelValue', 'saved']);
const empleadoStore = useEmpleadoStore();
const dialog = ref(false);

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


watch(() => props.modelValue, (newVal) => {
  dialog.value = newVal;
  if (newVal && props.empleado) {
    user.value={... props.empleado};
  } else {
  user.value = {
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
  }
  }
});

const save = async() => {
  if (props.empleado?.id) {
  await empleadoStore.editEmpleado(props.empleado.id, user.value)
  } else {

   await empleadoStore.addEmpleado( user.value);
  }
  emit('update:modelValue', false);
  emit('saved');

};



</script>

<style scoped></style>
