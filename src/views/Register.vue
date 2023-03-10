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
            </template>
            <template>
              <div class="text-center text-muted mb-4">
                <small>Or sign up with credentials</small>
              </div>
              <form role="form">
                <base-input
                  alternative
                  class="mb-3"
                  placeholder="Username"
                  addon-left-icon="ni ni-hat-3"
                  v-model="username"
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
                    ></base-input>
                  </div>
                  <div class="col">
                    <base-input
                      alternative
                      class="mb-3"
                      placeholder="Last Name"
                      v-model="lastName"
                    ></base-input>
                  </div>
                </div>
                <base-input
                  alternative
                  class="mb-3"
                  placeholder="Email"
                  addon-left-icon="ni ni-email-83"
                  v-model="email"
                ></base-input>
                <base-input
                  alternative
                  type="password"
                  placeholder="Password"
                  addon-left-icon="ni ni-lock-circle-open"
                  v-model="password"
                ></base-input>
                <div class="text-muted font-italic">
                  <small>
                    password strength:
                    <span class="text-success font-weight-700">strong</span>
                  </small>
                </div>
                <base-checkbox>
                  <span> I agree with the <a href="#">Privacy Policy</a> </span>
                </base-checkbox>
                <div class="text-center">
                  <base-button
                    type="primary"
                    class="my-4"
                    @click="createUser"
                    >Create account</base-button
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

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    };
  },
  methods: {
    createUser() {
      axios.headerClasses = {
        "Content-Type": "application/json",
      };
      axios
        .post("http://localhost:3000/users/register", {
          u_username: this.username,
          u_email: this.email,
          u_password: this.password,
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
        });
    },
  },
};
</script>
<style></style>
