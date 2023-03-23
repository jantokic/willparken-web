<template>
    <div id="app">
        <router-view name="header"></router-view>
        <main>
            <fade-transition origin="center" mode="out-in" :duration="250">
                <router-view/>
            </fade-transition>
        </main>
        <router-view name="footer"></router-view>
    </div>
</template>
<script>
import { FadeTransition } from "vue2-transitions";
import Vue from 'vue'

import VueCookie from 'vue-cookie'
import AppHeader from './layout/AppHeader.vue'
import Modal from './components/Modal.vue'
import BaseDropdown from './components/BaseDropdown.vue'
import GoogleMap from './components/GMaps/GoogleMap.vue'
import VueGoogleAutocomplete from "vue-google-autocomplete";

Vue.component('app-header', AppHeader)
Vue.component('modal', Modal) 
Vue.component('base-dropdown', BaseDropdown)
Vue.component('google-map', GoogleMap)
Vue.component('vue-google-autocomplete', VueGoogleAutocomplete)

Vue.use(VueCookie)


export default {
    name: 'App',
    components: {
        FadeTransition
    }
}

</script>
