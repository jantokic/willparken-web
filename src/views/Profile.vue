<template>
  <div class="profile-page">
    <app-header :dataToHeader="dataToHeader"></app-header>
    <!-- EDIT PROFILE -->
    <modal
      :show.sync="modals.editProfile"
      body-classes="p-0"
      modal-classes="modal-dialog-centered modal-lg"
    >
      <card
        type="secondary"
        shadow
        header-classes="bg-white pb-5"
        body-classes="px-lg-5 py-lg-5"
        class="border-0"
      >
        <template>
          <h4 v-if="!alert.visible" class="text-muted text-center mb-3">
            Profil bearbeiten
          </h4>
          <base-alert v-else :visbility="true" :type="alert.type">
            {{ alert.text }}
          </base-alert>
        </template>
        <div class="container ct-example-row">
          <form role="form">
            <div class="row">
              <div class="col">
                <!--Vorname-->
                <base-input
                  alternative
                  addon-left-icon="fa-solid fa-address-card"
                  type="text"
                  placeholder="Vorname"
                  class="mb-3"
                  v-model="newUser.u_firstname"
                />
              </div>
              <div class="col">
                <!--Nachname-->
                <base-input
                  alternative
                  addon-left-icon="fa-solid fa-address-card"
                  type="text"
                  placeholder="Nachname"
                  v-model="newUser.u_lastname"
                />
              </div>
              <div class="col">
                <!--E-Mail-->
                <base-input
                  alternative
                  type="text"
                  addon-left-icon="fa-solid fa-envelope"
                  placeholder="E-Mail"
                  v-model="newUser.u_email"
                />
              </div>
            </div>
          </form>
        </div>
        <template slot="footer">
          <base-button type="success" class="my-4" @click="updateUser()"
            >Speichern</base-button
          >
          <base-button
            type="secondary"
            class="ml-auto"
            @click="modals.editProfile = false"
            >Abbrechen</base-button
          >
        </template>
      </card>
    </modal>
    <section class="section-profile-cover section-shaped my-0">
      <div class="shape shape-style-1 shape-primary shape-skew alpha">
         <!-- photo of public/img/theme/cock.png-->
      <img
            class="rounded shadow"
            data-src="../../public/img/theme/cock3.png"
            src="../../public/img/theme/cock3.png"
            lazy="loaded"
          />
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </section>

    <section class="section section-skew">
      <div class="container">
        <card shadow class="card-profile mt--300" no-body>
          <div class="px-2">
            <div class="row justify-content-center">
              <div class="col-lg-3 order-lg-2">
                <div class="card-profile-image">
                  <img v-lazy="profileImage" class="rounded-circle" />
                </div>
              </div>
              <div
                class="col-lg-4 order-lg-3 text-lg-right align-self-lg-center"
              >
                <div class="card-profile-actions py-4 mt-lg-0">
                  <base-button
                    style="background-color:purple;"
                    size="md"
                    @click="modals.editProfile = true"
                    class="mr-4"
                    >Profil bearbeiten</base-button
                  >
                </div>
              </div>
              <div class="col-lg-4 order-lg-1">
                <div class="card-profile-stats d-flex justify-content-center">
                  <div>
                    <span class="heading">{{
                      this.activeParkingSpots.length
                    }}</span>
                    <span class="description">Parkplätze</span>
                  </div>
                  <div>
                    <span class="heading">{{
                      this.activeReservations.length
                    }}</span>
                    <span class="description">Reservierungen</span>
                  </div>
                  <div>
                    <span class="heading">{{ this.cars.length }}</span>
                    <span class="description">Autos</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-center mt-4">
              <h3>
                {{ this.firstName + " " + this.lastName }}
              </h3>
              <div class="h6 font-weight-300 mt">
                {{ this.email }}
              </div>
            </div>
          </div>
        </card>
      </div>
    </section>
  </div>
</template>
<script>
import axios from "axios";
import { api } from "../apiRequest.js";

export default {
  data() {
    return {
      profileImage: "",
      dataFromDashboard: null,
      username: null,
      firstName: null,
      lastName: null,
      email: null,
      parkingSpots: [],
      reservations: [],
      cars: [],
      activeParkingSpots: [],
      activeReservations: [],
      modals: {
        editProfile: false,
      },
      alert: {
        visible: false,
        text: "",
        type: "",
      },
      newUser: {
        u_firstname: "",
        u_lastname: "",
        u_email: "",
      },
    };
  },
  async mounted() {
    await this.getUser();
    await this.getProfilePic();
    await this.getUserParkingSpots();
    await this.getUserReservations();
    await this.getUserCars();
  },
  async created() {},
  methods: {
    async updateUser() {
      await api("http://localhost:3000/users/update", "patch", this.newUser)
        .then((response) => {
          this.alert.visible = true;
          this.alert.text = "Benutzer erfolgreich aktualisiert. Seite wird neu geladen.";
          this.alert.type = "success";

           //set a delay of 1 second before closing the modal
           setTimeout(async () => {
            // reset the alert
            this.alert.visible = false;
            this.modals.editProfile = false;
            // refresh the page
            location.reload();
          }, 1000);
        })
        .catch((error) => {
          this.alert.visible = true;
          this.alert.text = error.response.data.message;
          this.alert.type = "danger";
        });
    },
    async getProfilePic() {
      const name = this.firstName + " " + this.lastName;
      const response = await axios.get(
        `https://ui-avatars.com/api/?name=${name}&background=800080&color=fff&size=512`
      );
      this.profileImage = response.config.url;
    },
    async getUser() {
      //get username from backend and set it to username
      await api("http://localhost:3000/users/getUser")
        .then((response) => {
          this.user = response.data.content;

          this.username = this.user.u_username;
          this.firstName = this.user.u_firstname;
          this.lastName = this.user.u_lastname;
          this.email = this.user.u_email;

          this.newUser.u_firstname = this.firstName;
          this.newUser.u_lastname = this.lastName;
          this.newUser.u_email = this.email;

          this.dataToHeader = this.username;
        })
        .catch((error) => {
          console.log(error);
        });
      //set dataFromashboard to username
      this.dataFromDashboard = this.username;
    },
    async getUserParkingSpots() {
      await api("http://localhost:3000/parkingspots/getParkingspots")
        .then(async (response) => {
          this.parkingSpots = response.data.content;
          await this.getActiveParkingSpots();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getUserReservations() {
      await api("http://localhost:3000/parkingspots/getReservations")
        .then(async (response) => {
          this.reservations = response.data.content;
          await this.getActiveReservations();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getUserCars() {
      await api("http://localhost:3000/users/getCars")
        .then((response) => {
          this.cars = response.data.content;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getActiveParkingSpots() {
      this.activeParkingSpots = this.parkingSpots.filter(
        (parkingSpot) => parkingSpot.p_status === "active"
      );
    },
    async getActiveReservations() {
      this.activeReservations = this.reservations.filter(
        (reservation) => reservation.r_cancelled === false
      );
    },
  },
};
</script>
<style></style>
