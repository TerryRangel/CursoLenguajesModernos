import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/auth/LoginPage.vue'
import RegisterPage from '@/auth/RegisterPage.vue'
import DashboardPage from '@/pages/dashboard/DashboardPage.vue'
import EmpleadosPage from '@/pages/modules/EmpleadosPage.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LoginPage',
      component: LoginPage,
    },

     {
      path: '/register',
      name: 'RegisterPage',
      component: RegisterPage,

    },
     {
      path: '/dashboard',
      name: 'DashboardPage',
      component: DashboardPage,
      meta:{requieresAuth: true},
    },

    {
      path: '/empleados',
      name: 'EmpleadosPage',
      component: EmpleadosPage,
      meta:{requieresAuth: true},
    }

  ],

})



//FUNCION DEL MIDLLE WARE//////////////////////////////////////////////

router.beforeEach((to, _from,next) => {
  const token = localStorage.getItem('token')
  if(to.meta.requieresAuth && !token){
    next('/')

  }else{
    next()
  }
})

export default router
