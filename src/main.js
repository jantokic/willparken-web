/*!

=========================================================
* Vue Argon Design System - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system/blob/master/LICENSE.md)

* Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Vue from "vue";
import Vuetify from "vuetify";

import App from "./App.vue";
import router from "./router";
import Argon from "./plugins/argon-kit";
import './registerServiceWorker'
import * as VueGoogleMaps from "vue2-google-maps" // Import package

Vue.config.productionTip = false;
Vue.use(Argon);
Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#5e72e4', // $primary in _variables.scss
        secondary: '#f7fafc', // $gray-100 in _variables.scss
        accent: '#f5365c', // $danger in _variables.scss
        error: '#f5365c', // $danger in _variables.scss
        warning: '#fb6340', // $warning in _variables.scss
        success: '#2dce89', // $success in _variables.scss
        info: '#11cdef', // $info in _variables.scss
      },
    },
  },
});

Vue.config.productionTip = false
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCNeCMc-90mHr1T1fB3y2_uiQB3ldsuaMk",
    libraries: "places"
  }
});

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount("#app");
