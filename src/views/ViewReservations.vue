<template>
    <div>
      <app-header :dataToHeader="dataToHeader"></app-header>
      <div class="position-relative">
        <!-- shape Hero -->
        <section class="section-shaped my-0">
          <div class="shape shape-style-1 shape-primary shape-skew">
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
            <span></span>
            <span></span>
          </div>
          <div class="container shape-container d-flex">
            <div class="col px-0">
              <div class="row">
                <div class="col-lg">
                  <h1 class="display-3 text-white">
                    Willkommen, {{ this.firstname + " " + this.lastname }}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="section section-lg pt-sm-0 mt--200">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-12">
                <div class="row row-grid">
                  <reservation-list :cars="cars" :active-reservations="activeReservations"/>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </template>

<script>
import { api } from "../apiRequest.js";
import moment from "moment";
import flatpickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import ReservationList from "../components/ReservationList.vue";

export default {
  components: { flatpickr, ReservationList },
  data() {
    return {
      user: null,
      username: null,
      firstname: null,
      lastname: null,
      dataToHeader: null,
      reservations: [],
      activeReservations: [],
      cars: [],
      modals: {
        deleteReservation: false,
      },
    };
  },
  mounted() {
    this.getUser();
    this.getUserReservations();
    this.getUserCars();
  },
  methods: {
    async getUser() {
      //get username from backend and set it to username
      await api("https://seal-app-jk939.ondigitalocean.app/users/getUser")
        .then((response) => {
          this.user = response.data.content;
          this.username = this.user.u_username;
          this.firstname = this.user.u_firstname;
          this.lastname = this.user.u_lastname;

          //set dataFromashboard to username
          this.dataToHeader = this.username;
        })
        .catch((error) => {
          
        });
    },
    async getUserReservations() {
      await api("https://seal-app-jk939.ondigitalocean.app/parkingspots/getReservations")
        .then(async (response) => {
          this.reservations = response.data.content;
          await this.getActiveReservations();
        })
        .catch((error) => {
          
        });
    },
    async getUserCars() {
      await api("https://seal-app-jk939.ondigitalocean.app/users/getCars")
        .then((response) => {
          this.cars = response.data.content;
        })
        .catch((error) => {
          
        });
    },
    async getActiveReservations() {
      this.activeReservations = this.reservations.filter(
        (reservation) => reservation.r_cancelled === false
      );
    },
    formatTime(time) {
      return moment()
        .startOf("day")
        .add(time, "minutes")
        .format("HH:mm");
    },
    formatDate(date) {
      return moment(date.toString(), "YYYYMMDD").format("DD.MM.YYYY");
    },
    async reverseDate(date) {
      return moment(date, "DD.MM.YYYY").format("YYYYMMDD");
    },
    async reverseTime(time) {
      var timeArray = time.split(":");
      var hours = parseInt(timeArray[0]);
      var minutes = parseInt(timeArray[1]);
      return hours * 60 + minutes;
    },
    getCarBrand(carId) {
      let car = this.cars.find((c) => c._id === carId);
      if (!car) return "";
      return car.c_brand;
    },
    getCarModel(carId) {
      let car = this.cars.find((c) => c._id === carId);
      if (!car) return "";
      return car.c_model;
    },
    async fillDateAndTimeData() {
      // fill the date and time data with the current date and time
      //check if this.daterange includes "to"
      if (this.daterange.includes("to")) {
        // split date range into from and until
        var dateRange = this.daterange.split(" to ");
        this.newParkingSpot.pt_availability.t_dayfrom = dateRange[0];
        this.newParkingSpot.pt_availability.t_dayuntil = dateRange[1];
      } else {
        this.newParkingSpot.pt_availability.t_dayfrom = this.daterange;
        this.newParkingSpot.pt_availability.t_dayuntil = this.daterange;
      }

      // DATE
      this.newParkingSpot.pt_availability.t_dayfrom = await this.reverseDate(
        this.newParkingSpot.pt_availability.t_dayfrom
      );
      this.newParkingSpot.pt_availability.t_dayuntil = await this.reverseDate(
        this.newParkingSpot.pt_availability.t_dayuntil
      );

      // TIME
      this.newParkingSpot.pt_availability.t_timefrom = await this.reverseTime(
        this.newParkingSpot.pt_availability.t_timefrom
      );
      this.newParkingSpot.pt_availability.t_timeuntil = await this.reverseTime(
        this.newParkingSpot.pt_availability.t_timeuntil
      );
    },
  },
};
</script>
