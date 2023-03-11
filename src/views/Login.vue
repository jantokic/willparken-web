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
                <small>Sign in with credentials</small>
              </div>
              <form role="form">
                <base-input
                  alternative
                  class="mb-3"
                  placeholder="Username"
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
                  placeholder="Password"
                  addon-left-icon="ni ni-lock-circle-open"
                  v-model="password"
                  @keyup.enter="loginUser"
                >
                </base-input>
                <base-checkbox>
                  Remember me
                </base-checkbox>
                <div class="text-center">
                  <base-button type="primary" class="my-4" @click="loginUser"
                    >Sign In</base-button
                  >
                </div>
              </form>
              <base-alert :visbility="true" :type="alert.type">
                {{ alert.text }}
              </base-alert>
            </template>
          </card>
          <div class="row mt-3">
            <div class="col-6">
              <a href="#" class="text-light">
                <small>Forgot password?</small>
              </a>
            </div>
            <div class="col-6 text-right">
              <a href="#/register" class="text-light">
                <small>Create new account</small>
              </a>
            </div>
          </div>
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
    loginUser() {
      const hashedPassword = sha256(this.password);
      axios.headerClasses = {
        "Content-Type": "application/json",
      };
      axios
        .post("http://localhost:3000/users/login", {
          u_username: this.username,
          u_password: hashedPassword,
        })
        .then((response) => {
          // handle success
          console.log(response);

          // Redirect to dashboard page
          this.$router.push({ name: "landing" });
        })
        .catch((error) => {
          // handle error
          console.log(error);

          if (error.response.status === 400) {
            if (error.response.data.message === "Wrong username or password.") {
              this.usernameValid = false;
              this.usernameError = "Wrong username or password.";
              this.alert.visible = false;
            } else {
              console.log("An error occurred. Please try again later.");
              this.alert.visible = true;
              this.alert.text =
                "Error - An error occurred. Please try again later.";
              this.alert.type = "danger";
              this.usernameValid = undefined;
            }
          }
          else if(error.response.status === 409){
            this.usernameValid = false;
            this.usernameError = "User already logged in.";
          }
          else{
            this.alert.visible = true;
            this.alert.text =
              "Error - An error occurred. Please try again later.";
            this.alert.type = "danger";
            this.usernameValid = undefined;
          }
        });
    },
  },
};
</script>
<style></style>
