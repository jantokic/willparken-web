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
                <small>Sign up with credentials</small>
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
                <div class="row">
                  <div class="col">
                    <base-input
                      alternative
                      class="mb-3"
                      placeholder="First Name"
                      addon-left-icon="ni ni-single-02"
                      v-model="firstName"
                      :required="true"
                    ></base-input>
                  </div>
                  <div class="col">
                    <base-input
                      alternative
                      class="mb-3"
                      placeholder="Last Name"
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
                  placeholder="Password"
                  addon-left-icon="ni ni-lock-circle-open"
                  v-model="password"
                  :required="true"
                ></base-input>
                <div class="text-muted font-italic">
                  <small>
                    password strength:
                    <span class="text-success font-weight-700">strong</span>
                  </small>
                </div>
                <base-checkbox v-model="agreePrivacyPolicy">
                  <span> I agree with the <a href="#">Privacy Policy</a> </span>
                </base-checkbox>
                <div class="text-center">
                  <base-button
                    type="primary"
                    class="my-4"
                    @click="createUser"
                    :disabled="!agreePrivacyPolicy"
                    >Create account</base-button
                  >
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
        .post("http://localhost:3000/users/register", {
          u_username: this.username,
          u_email: this.email,
          u_password: hashedPassword,
          u_firstname: this.firstName,
          u_lastname: this.lastName,
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
            if (error.response.data.message === "Username already exists.") {
              this.usernameValid = false;
              this.usernameError = "Username already exists.";
              this.alert.visible = false;
            } else {
              this.alert.visible = true;
              this.alert.text =
                "Error - An error occurred. Please try again later.";
              this.alert.type = "danger";
              this.usernameValid = undefined;
            }
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
