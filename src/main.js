import { createApp } from 'vue'

// vue-axios
import http, { setUnauthorizedHandler, errorMessage } from '@/services/http'
import image from '@/directives/image'
import VueAxios from 'vue-axios'

// Vee Validate
// eslint-disable-next-line object-curly-newline
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
import AllRules from '@vee-validate/rules'
import { ErrorMessage, Field, Form, configure, defineRule } from 'vee-validate'

// vue-sweetalert2
import 'sweetalert2/dist/sweetalert2.min.css'
import VueSweetalert2 from 'vue-sweetalert2'

// 自訂
import { currency, date, now } from './methods/filters'
import { successLoadImg } from './methods/successLoadImg'

// 原生
import App from './App.vue'
import router from './router'
import store from './store'

// Vee Validate
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]) // 載入規則
})
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true // 當輸入任何內容直接進行驗證
})
// 設定預設語系
setLocale('zh_TW')

const app = createApp(App)

app.config.globalProperties.$filters = {
  date,
  currency,
  now
}

app.config.globalProperties.successLoadImg = successLoadImg

setUnauthorizedHandler(() => {
  if (!['sign_in', 'sign_up'].includes(router.currentRoute.value.name)) router.replace({ name: 'sign_in' })
})
app.config.globalProperties.$errorMessage = errorMessage
app.directive('image', image)
app.use(store)
app.use(router)
app.use(VueAxios, http)
app.use(VueSweetalert2)
app.component('ErrorMessage', ErrorMessage)
app.component('VField', Field)
app.component('VForm', Form)
app.mount('#app')

