<template>
  <div>
    <app-header :dataFromDashboard="dataFromDashboard"></app-header>
    <div class="position-relative">
      <!-- shape Hero -->
      <section class="section-shaped my-0">
        <div class="shape shape-style-1 shape-default shape-skew">
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
              <div class="col-lg-6">
                <h1 class="display-3  text-white">
                  Willkommen, {{ dataFromDashboard }}!
                </h1>
                <p class="lead  text-white">
                  Ihr Privater Bereich für Parkplätze, Autos und Reservierungen.
                </p>
                <!-- <div class="btn-wrapper">
                  <base-button
                    tag="a"
                    href="https://demos.creative-tim.com/argon-design-system/docs/components/alerts.html"
                    class="mb-3 mb-sm-0"
                    type="info"
                    icon="fa fa-code"
                  >
                    Components
                  </base-button>
                  <base-button
                    tag="a"
                    href="https://www.creative-tim.com/product/argon-design-system"
                    class="mb-3 mb-sm-0"
                    type="white"
                    icon="ni ni-cloud-download-95"
                  >
                    Download HTML
                  </base-button> 
                </div>-->
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="section section-lg pt-lg-0 mt--200">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-12">
              <div class="row row-grid">
                <div class="col-lg-4 ">
                  <card class="border-0" hover shadow body-classes="py-5">
                    <icon
                      name="fa fa-parking"
                      type="primary"
                      rounded
                      class="mb-4"
                    >
                    </icon>
                    <h6 class="text-primary text-uppercase">
                      Parkplätze ({{ activeParkingSpots.length }})
                    </h6>
                    <p class="description mt-3">
                      Ihr begehrtester Parkplatz:
                    </p>
                    <div v-if="activeParkingSpots.length > 0">
                      <p class="card-text">
                        <i
                          class="fa fa-location-dot"
                          style="margin-right: 10px; color:#007bff;"
                        ></i>
                        {{ activeParkingSpots[0].pa_address.a_street }}
                        {{ activeParkingSpots[0].pa_address.a_houseno }},
                        {{ activeParkingSpots[0].pa_address.a_city }}
                        <span v-if="activeParkingSpots[0].p_number"
                          ><strong style="color:#007bff;"
                            >({{ activeParkingSpots[0].p_number }})</strong
                          ></span
                        >
                      </p>
                      <p class="card-text">
                        <i
                          class="fa fa-money-bill-wave"
                          style="margin-right:3px;color:#007bff;"
                        ></i>
                        {{ activeParkingSpots[0].p_priceperhour }}€ pro Stunde
                      </p>
                      <div
                        v-if="activeParkingSpots[0].p_tags.length > 0"
                        class="d-flex justify-content-between"
                      >
                        <div>
                          <i
                            class="fa fa-tag"
                            style="margin-right: 10px;color:#007bff;"
                          ></i>
                          <span
                            v-for="(tag, index) in activeParkingSpots[0].p_tags"
                            :key="index"
                            class="badge badge-primary rounded-pill"
                            >{{ tag }}</span
                          >
                        </div>
                      </div>
                      <p></p>
                      <p class="card-text">
                        <i
                          class="fa fa-bell"
                          style="margin-right: 10px;color:#007bff;"
                        ></i>
                        <span
                          v-if="
                            activeParkingSpots[0].pr_reservations.length > 0 &&
                              activeParkingSpots[0].pr_reservations.some(
                                (res) => !res.r_cancelled
                              )
                          "
                          class="badge badge-info badge-pill"
                        >
                          {{
                            activeParkingSpots[0].pr_reservations.filter(
                              (res) => !res.r_cancelled
                            ).length
                          }}
                          Offene Reservierungen
                        </span>
                        <span v-else class="badge badge-danger badge-pill">
                          Keine offenen Reservierungen
                        </span>
                      </p>
                      <base-button tag="a" href="#" type="primary" class="mt-4">
                        Alle Anzeigen
                      </base-button>
                    </div>
                    <div v-else>
                      <p>
                        Sie haben noch keine Parkplätze erstellt. Fangen Sie
                        jetzt an!
                      </p>
                      <base-button tag="a" href="#" type="primary" class="mt-4">
                        Parkplatz erstellen
                      </base-button>
                    </div>
                  </card>
                </div>
                <div class="col-lg-4 ">
                  <card class="border-0" hover shadow body-classes="py-5">
                    <icon name="fa fa-car" type="success" rounded class="mb-4">
                    </icon>
                    <h6 class="text-success text-uppercase">
                      Autos ({{ cars.length }})
                    </h6>
                    <p class="description mt-3">
                      Ihr Lieblingsauto:
                    </p>
                    <div v-if="cars.length > 0">
                      <p class="card-text">
                        <i
                          class="fa fa-car-on"
                          style="margin-right: 10px; color:#28a745;"
                        ></i>
                        {{ cars[0].c_brand }} {{ cars[0].c_model }}
                      </p>
                      <p class="card-text">
                        <i
                          class="fa-solid fa-address-card"
                          style="margin-right: 10px; color:#28a745;"
                        ></i>
                        {{ cars[0].c_licenceplate }}
                      </p>
                      <div class="d-flex justify-content-between">
                        <div>
                          <p class="card-text">
                            <i
                              class="fa fa-bell"
                              style="margin-right: 10px;color:#28a745;"
                            ></i>
                            <span
                              v-if="cars[0].c_isreserved"
                              class="badge badge-success badge-pill"
                              >Für {{
                                activeReservations.filter(
                                  (res) => res.rc_car === cars[0]._id
                                ).length
                              }}
                              Reservierungen benutzt
                            </span>
                            <span
                              v-else
                              class="badge badge-warning badge-pill"
                              >{{ "Wird nicht benutzt" }}</span
                            >
                          </p>
                        </div>
                      </div>
                      <base-button tag="a" href="#" type="success" class="mt-4">
                        Alle Anzeigen
                      </base-button>
                    </div>
                    <div v-else>
                      <p>
                        Sie haben noch keine Autos hinzugefügt. Fangen Sie jetzt
                        an!
                      </p>
                      <base-button tag="a" href="#" type="success" class="mt-4">
                        Auto hinzufügen
                      </base-button>
                    </div>
                  </card>
                </div>
                <div class="col-lg-4">
                  <card class="border-0" hover shadow body-classes="py-5">
                    <icon name="fa fa-bell" type="warning" rounded class="mb-4">
                    </icon>
                    <h6 class="text-warning text-uppercase">
                      Reservierungen ({{ activeReservations.length }})
                    </h6>
                    <p class="description mt-3">
                      Ihre nächste Reservierung:
                    </p>
                    <div v-if="activeReservations.length > 0">
                      <p class="card-text">
                        <i
                          class="fa fa-car-on"
                          style="margin-right: 10px;color:orangered;"
                        ></i>
                        {{ getCar(activeReservations[0].rc_car).c_brand }}
                        {{ getCar(activeReservations[0].rc_car).c_model }}
                      </p>
                      <p class="card-text">
                        <i
                          class="fa-solid fa-calendar-days"
                          style="margin-right: 10px;color:orangered;"
                        ></i>
                        {{
                          formatDate(
                            activeReservations[0].rt_timeframe.t_dayfrom
                          )
                        }}
                        -
                        {{
                          formatDate(
                            activeReservations[0].rt_timeframe.t_dayuntil
                          )
                        }}
                      </p>
                      <p class="card-text">
                        <i
                          class="fa-solid fa-clock"
                          style="margin-right: 10px;color:orangered;"
                        ></i>
                        {{
                          formatTime(
                            activeReservations[0].rt_timeframe.t_timefrom
                          )
                        }}
                        -
                        {{
                          formatTime(
                            activeReservations[0].rt_timeframe.t_timeuntil
                          )
                        }}
                      </p>
                      <p></p>
                      <p class="card-text">
                        <i
                          class="fa fa-money-bill-wave"
                          style="margin-right:10px;color:orangered;"
                        ></i>
                        <span class="badge badge-success badge-pill">
                          Bezahlt
                        </span>
                      </p>
                      <base-button tag="a" href="#" type="warning" class="mt-4">
                        Alle Anzeigen
                      </base-button>
                    </div>
                    <div v-else>
                      <p>
                        Sie haben zurzeit keinen Parpklatz reserviert. Fangen
                        Sie jetzt an!
                      </p>
                      <base-button tag="a" href="#" type="warning" class="mt-4">
                        Parkplatz reservieren
                      </base-button>
                    </div>
                  </card>
                </div>
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

export default {
  data() {
    return {
      user: null,
      username: null,
      dataFromDashboard: null,
      parkingSpots: [],
      activeParkingSpots: [],
      reservations: [],
      activeReservations: [],
      cars: [],
    };
  },
  mounted() {
    this.getUser();
    this.getUserParkingSpots();
    this.getUserReservations();
    this.getUserCars();
  },
  methods: {
    async getUser() {
      //get username from backend and set it to username
      await api("http://localhost:3000/users/getUser")
        .then((response) => {
          this.user = response.data.content;
          this.username = this.user.u_username;
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
    formatTime(time) {
      return moment()
        .startOf("day")
        .add(time, "minutes")
        .format("HH:mm");
    },
    formatDate(date) {
      return moment(date.toString(), "YYYYMMDD").format("DD.MM.YYYY");
    },
    getCar(carId) {
      let car = this.cars.find((c) => c._id === carId);
      return car;
    },
  },
};
</script>
