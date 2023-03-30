<template>
  <section class="section section-shaped section-lg my-0">
    <div class="shape shape-style-1 bg-gradient-default">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="container pt-lg-md">
      <div class="row justify-content-center">
        <div class="col-lg-5">
          <card
            type="secondary"
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <!-- <template>
              <div class="text-muted text-center mb-3">
                <small>Sign in with</small>
              </div>
              <div class="btn-wrapper text-center">
                <base-button type="neutral">
                  <img slot="icon" src="img/icons/common/github.svg" />
                  Github
                </base-button>

                <base-button type="neutral">
                  <img slot="icon" src="img/icons/common/google.svg" />
                  Google
                </base-button>
              </div>
            </template> -->
            <template>
              <div class="text-center text-muted mb-4">
                <small>Mit Benutzerdaten anmelden</small>
              </div>
              <form role="form">
                <base-input
                  alternative
                  class="mb-3"
                  placeholder="Benuztername"
                  addon-left-icon="ni ni-hat-3"
                  v-model="username"
                  :error="usernameError"
                  :valid="usernameValid"
                  :required="true"
                >
                </base-input>
                <base-input
                  alternative
                  type="password"
                  placeholder="Passwort"
                  addon-left-icon="ni ni-lock-circle-open"
                  v-model="password"
                  @keyup.enter="loginUser"
                >
                </base-input>
                <!-- <base-checkbox>
                  Remember me
                </base-checkbox> -->
                <div class="row">
                  <div class="text-center col">
                    <base-button type="primary" class="my-4" @click="loginUser"
                      >Anmelden</base-button
                    >
                  </div>
                  <div class="text-center col">
                    <a href="#/register">
                      <base-button type="secondary" class="my-4"
                        >Registrieren</base-button
                      >
                    </a>
                  </div>
                </div>
              </form>
              <base-alert :visbility="true" :type="alert.type">
                {{ alert.text }}
              </base-alert>
            </template>
          </card>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import axios from "axios";
import sha256 from "js-sha256";
import { api } from "../apiRequest.js";

export default {
  data() {
    return {
      username: "",
      password: "",
      alert: {
        visible: false,
        text: "",
        type: "",
      },
      usernameValid: undefined,
      usernameError: "",
    };
  },
  methods: {
    async loginUser() {
      const hashedPassword = sha256(this.password);
      await api("https://seal-app-jk939.ondigitalocean.app/users/login", "POST", {
        u_username: this.username,
        u_password: hashedPassword,
      })
        .then((response) => {
          // handle success

          // Redirect to dashboard page
          // Add delay before redirecting to dashboard
          setTimeout(() => {
            this.$router.push({ name: "dashboard" });
          }, 500); // delay for half a second
        })
        .catch((error) => {
          // handle error

          if (error.response.status === 400) {
            if (error.response.data.message === "Wrong username or password.") {
              this.usernameValid = false;
              this.usernameError = "Benutzer oder Passwort falsch.";
              this.alert.visible = false;
            } else {
              this.alert.visible = true;
              this.alert.text =
                "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.";
              this.alert.type = "danger";
              this.usernameValid = undefined;
            }
          } else if (error.response.status === 409) {
            this.usernameValid = false;
            this.usernameError = "Benutzer ist bereits angemeldet.";
          } else {
            this.alert.visible = true;
            this.alert.text =
              "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut..";
            this.alert.type = "danger";
            this.usernameValid = undefined;
          }
        });
    },
  },
};
</script>
<style></style>
