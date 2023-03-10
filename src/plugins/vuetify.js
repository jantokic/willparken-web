// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

const opts = {
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
  }
  

export default new Vuetify(opts)