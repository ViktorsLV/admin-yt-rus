import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import Vuelidate from 'vuelidate'
import messagePlugin from '@/utils/message.plugin'
import firebase from 'firebase';
import Loader from '@/components/app/Loader'
import tooltipDirective from '@/directives/tooltip.directive'
import "./registerServiceWorker";
import 'materialize-css/dist/js/materialize.min'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false;

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.component('Loader', Loader)
Vue.directive('tooltip', tooltipDirective)

firebase.initializeApp({
  apiKey: "AIzaSyCzk8AWcBiLXqC_RwQZtA8SKfddmDcfbcU",
  authDomain: "vue-admin-rus.firebaseapp.com",
  projectId: "vue-admin-rus",
  storageBucket: "vue-admin-rus.appspot.com",
  messagingSenderId: "946864678375",
  appId: "1:946864678375:web:a377b4b684296bb603c942",
  measurementId: "G-7BXR50NJ6F"
});

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
})