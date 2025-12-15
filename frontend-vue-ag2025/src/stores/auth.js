import { defineStore } from 'pinia'
import { loginRequest, registerRequest } from '@/services/authService.js'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
  }),
  actions: {
    async login(credentials) {
      try {
        const token = await loginRequest(credentials)
        console.log('Token: ', token.token)

        //localStorage.setItem('token', token.token) para que trabaje en node

        //Para que trabaje con typescript
        localStorage.setItem('token', token.token)
        this.token = token.token
        router.push('/dashboard')
      } catch (error) {
        console.error('Error al iniciar sesión:', error)
        alert('Credenciales incorrectas')
      }
    },
    async register(payload) {
      try {
        await registerRequest(payload)
        router.push('/')
      } catch (error) {
        console.error('Error al registrarse:', error)
        alert('No se puede registrar')
      }
    },
    async logout() {
      try {
        this.token = null
        localStorage.removeItem('token')
        router.push('/')
      } catch (error) {
        console.error('Error al cerrar sesión:', error)
      }
    },
  },
})
