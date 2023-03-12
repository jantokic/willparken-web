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
import Vuetify from './plugins/vuetify'
import VueCookie from 'vue-cookie'
import AppHeader from './layout/AppHeader.vue'

Vue.component('app-header', AppHeader)
Vue.use(Vuetify)
Vue.use(VueCookie)


export default {
    name: 'App',
    components: {
        FadeTransition
    }
}

</script>
