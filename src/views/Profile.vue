<template>
  <div class="profile-page">
    <section class="section-profile-cover section-shaped my-0">
      <div class="shape shape-style-1 shape-primary shape-skew alpha">
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
          <div class="px-4">
            <div class="row justify-content-center">
              <div class="col-lg-3 order-lg-2">
                <div class="card-profile-image">
                  <a href="#">
                    <img v-lazy="profileImage" class="rounded-circle" />
                  </a>
                </div>
              </div>
              <div
                class="col-lg-4 order-lg-3 text-lg-right align-self-lg-center"
              >
                <div class="card-profile-actions py-4 mt-lg-0">
                  <base-button style="background-color:purple;" size="md" class="mr-4"
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
            <div class="text-center mt-5">
              <h3>
                {{ this.firstName + " " + this.lastName }}
              </h3>
              <div class="h6 font-weight-300">
                <i class="ni location_pin mr-2"></i>Bucharest, Romania
              </div>
              <div class="h6 mt-4">
                <i class="ni business_briefcase-24 mr-2"></i>Solution Manager -
                Creative Tim Officer
              </div>
              <div>
                <i class="ni education_hat mr-2"></i>University of Computer
                Science
              </div>
            </div>
            <div class="mt-5 py-5 border-top text-center">
              <div class="row justify-content-center">
                <div class="col-lg-9">
                  <p>
                    An artist of considerable range, Ryan — the name taken by
                    Melbourne-raised, Brooklyn-based Nick Murphy — writes,
                    performs and records all of his own music, giving it a warm,
                    intimate feel with a solid groove structure. An artist of
                    considerable range.
                  </p>
                  <a href="#">Show more</a>
                </div>
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
    async getProfilePic() {
      const name = this.firstName + " " + this.lastName;
      const response = await axios.get(
        `https://ui-avatars.com/api/?name=${name}&background=random&color=fff&size=512`
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
          console.log(this.parkingSpots);
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
          console.log(this.reservations);
          await this.getActiveReservations();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getUserCars() {
      await api("http://localhost:3000/users/getCars")
        .then((response) => {
          console.log(response.data.content);
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
