import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/sass/index.sass'
import AppTextField from '@/components/App/TextField.vue'
import AppSelect from '@/components/App/Select.vue'
import AppButton from '@components/App/Button.vue'
import ClickOutside from '@/directives/clickOutside'

const app = createApp(App)

app.component('AppTextField', AppTextField)
app.component('AppSelect', AppSelect)
app.component('AppButton', AppButton)

app.directive('click-outside', ClickOutside)

app.use(router)
app.use(store)

app.mount('#app')
