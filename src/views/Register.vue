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
            <template>
              <div class="text-center text-muted mb-4">
                <small>Mit Benutzerdaten registrieren</small>
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
                <div class="row">
                  <div class="col">
                    <base-input
                      alternative
                      class="mb-3"
                      placeholder="Vorname"
                      addon-left-icon="ni ni-single-02"
                      v-model="firstName"
                      :required="true"
                    ></base-input>
                  </div>
                  <div class="col">
                    <base-input
                      alternative
                      class="mb-3"
                      placeholder="Nachname"
                      v-model="lastName"
                      :required="true"
                    ></base-input>
                  </div>
                </div>
                <base-input
                  alternative
                  class="mb-3"
                  placeholder="Email"
                  addon-left-icon="ni ni-email-83"
                  v-model="email"
                  :required="true"
                ></base-input>
                <base-input
                  alternative
                  type="password"
                  placeholder="Passwort"
                  addon-left-icon="ni ni-lock-circle-open"
                  v-model="password"
                  :required="true"
                ></base-input>

                <div class="text-center">
                  <base-button type="primary" class="my-4" @click="createUser"
                    >Registrieren</base-button
                  >
                </div>
              </form>
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

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      alert: {
        visible: false,
        text: "",
        type: "",
      },
      usernameValid: undefined,
      usernameError: "",
      agreePrivacyPolicy: false,
    };
  },
  computed: {
    canCreateUser() {
      return this.agreePrivacyPolicy;
    },
  },
  methods: {
    createUser() {
      const hashedPassword = sha256(this.password);
      axios.headerClasses = {
        "Content-Type": "application/json",
      };
      axios
        .post(
          "http://localhost:3000/users/register",
          {
            u_username: this.username,
            u_email: this.email,
            u_password: hashedPassword,
            u_firstname: this.firstName,
            u_lastname: this.lastName,
          },
          { withCredentials: true }
        )
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
            if (error.response.data.message === "Username already exists.") {
              this.usernameValid = false;
              this.usernameError = "Benutzername bereits vergeben.";
              this.alert.visible = false;
            } else {
              this.alert.visible = true;
              this.alert.text =
                "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.";
              this.alert.type = "danger";
              this.usernameValid = undefined;
            }
          } else {
            this.alert.visible = true;
            this.alert.text =
              "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.";
            this.alert.type = "danger";
            this.usernameValid = undefined;
          }
        });
    },
  },
};
</script>
<style></style>
