//import './assets/main.css'
import './styles/main.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//Agregammos las importaciones


import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

const  vuetify = createVuetify({
  components,
  directives,
  icons:{
    iconfont: 'mdi',
    defaultSet: 'mdi',
  }
})



const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount('#app')
