import toast from './toast.vue'

const obj = {}

obj.install = function (Vue) {
  const toastConstructor = Vue.extend(toast)

  const myToast = new toastConstructor()

  myToast.$mount(document.createElement('div'))

  document.body.appendChild(myToast.$el)

  Vue.prototype.$toast = myToast
}

export default obj