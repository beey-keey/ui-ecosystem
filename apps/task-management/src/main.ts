import { createApp } from 'vue'
import '@ui-ecosystem/design-system'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.mount('#app')
