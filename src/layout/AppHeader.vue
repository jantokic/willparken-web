<template>
  <header class="header-global">
    <base-nav class="navbar-main" transparent type="" effect="light" expand>
      <router-link
        v-if="dataToHeader != 'Anmelden'"
        slot="brand"
        class="navbar-brand mr-lg-5"
        to="/dashboard"
      >
        <!-- <img src="img/brand/white.png" alt="logo"> -->
        <h1 class="display-4 text-white">WillParken</h1>
        <div class="text-muted-white">Bleib stabil</div>
      </router-link>
      <router-link v-else slot="brand" class="navbar-brand mr-lg-5" to="/">
        <!-- <img src="img/brand/white.png" alt="logo"> -->
        <h1 class="display-4 text-white">WillParken</h1>
        <div class="text-muted-white">Bleib stabil</div>
      </router-link>

      <ul class="navbar-nav align-items-lg-center ml-lg-auto">
        <li class="nav-item">
          <a
            v-if="dataToHeader != 'Anmelden'"
            class="nav-link nav-link-icon"
            href="#/dashboard"
          >
            Mein Bereich
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link nav-link-icon" href="#">
            Parkplatz finden
          </a>
        </li>

        <li class="nav-item">
          <span class="nav-link-inner--text d-lg-none"></span>
        </li>
        <li class="nav-item">
          <span class="nav-link-inner--text d-lg-none"></span>
        </li>
        <li class="nav-item">
          <span class="nav-link-inner--text d-lg-none"></span>
        </li>
        <li class="nav-item">
          <span class="nav-link-inner--text d-lg-none"></span>
        </li>
        <li class="nav-item d-none d-lg-block ml-lg-4">
          <a
            v-if="dataToHeader != 'Anmelden'"
            href="#/profile"
            class="btn btn-neutral btn-icon"
          >
            <span class="btn-inner--icon">
              <i class="fa fa-user-circle-o mr-2"></i>
            </span>
            <span class="nav-link-inner--text">{{ dataToHeader }}</span>
          </a>
          <a v-else href="#/login" class="btn btn-neutral btn-icon">
            <span class="btn-inner--icon">
              <i class="fa fa-user-circle-o mr-2"></i>
            </span>
            <span class="nav-link-inner--text">{{ dataToHeader }}</span>
          </a>
        </li>
      </ul>
    </base-nav>
  </header>
</template>
<script>
import BaseNav from "@/components/BaseNav";
import BaseDropdown from "@/components/BaseDropdown";
import CloseButton from "@/components/CloseButton";

export default {
  name: "AppHeader",
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown,
  },
  props: {
    dataToHeader: {
      type: String,
      default: "Anmelden",
    },
  },
};
</script>
<style></style>
