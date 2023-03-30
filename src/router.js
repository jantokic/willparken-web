import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";
import Dashboard from "./views/Dashboard.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Profile from "./views/Profile.vue";
import ViewReservations from "./views/ViewReservations.vue";
import ViewParkingspots from "./views/ViewParkingspots.vue";

Vue.use(Router);

export default new Router({
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "login",
      components: {
        header: AppHeader,
        default: Login,
        footer: AppFooter
      }
    },
    {
      path: "/dashboard",
      name: "dashboard",
      components: {
        // header: AppHeader,
        default: Dashboard,
        footer: AppFooter
      },
      props: {
        header: true // enable passing props to header component
      }
    },
    {
      path: "/login",
      name: "login",
      components: {
        header: AppHeader,
        default: Login,
        footer: AppFooter
      }
    },
    {
      path: "/register",
      name: "register",
      components: {
        header: AppHeader,
        default: Register,
        footer: AppFooter
      }
    },
    {
      path: "/profile",
      name: "profile",
      components: {
        //header: AppHeader,
        default: Profile,
        footer: AppFooter
      },
      props: {
        header: true // enable passing props to header component
      }
    },
    {
      path: "/viewReservations",
      name: "ViewReservations",
      components: {
        //header: AppHeader,
        default: ViewReservations,
        footer: AppFooter
      },
      props: {
        header: true // enable passing props to header component
      }
    }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
