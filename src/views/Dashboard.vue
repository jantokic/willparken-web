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
                      Parkplätze ({{ parkingSpots.length }})
                    </h6>
                    <p class="description mt-3">
                      Hier sehen sie Ihre aktuellen Parkplätze:
                    </p>
                    <div v-if="parkingSpots.length > 0">
                      <p class="card-text">
                        <i class="fa fa-location-dot" style="margin-right: 9px;"></i>
                        {{ parkingSpots[0].pa_address.a_street }}
                        {{ parkingSpots[0].pa_address.a_houseno }},
                        {{ parkingSpots[0].pa_address.a_zip }}
                        {{ parkingSpots[0].pa_address.a_city }}
                      </p>
                      <p class="card-text">
                        <i class= "fa fa-money-bill-wave" style="margin-right:2px;"></i>
                        {{ parkingSpots[0].p_priceperhour }}€ pro Stunde
                      </p>
                      <div class="d-flex justify-content-between">
                        <div>
                          <i class="fa fa-tag" style="margin-right: 10px;"></i>
                          <span
                            v-for="(tag, index) in parkingSpots[0].p_tags"
                            :key="index"
                            class="badge badge-primary rounded-pill"
                            >{{ tag }}</span
                          >
                        </div>
                      </div>
                      <base-button tag="a" href="#" type="primary" class="mt-4">
                        Mehr Anzeigen
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
                    <icon
                      name="fa fa-car"
                      type="success"
                      rounded
                      class="mb-4"
                    >
                    </icon>
                    <h6 class="text-success text-uppercase">
                      Autos ({{ cars.length }})
                    </h6>
                    <p class="description mt-3">
                      Hier sehen sie Ihre Autos:
                    </p>
                    <div v-if="cars.length > 0">
                      <p class="card-text">
                        <i class="fa fa-car-on"  style="margin-right: 5px;"></i>
                        {{cars[0].c_brand }} {{ cars[0].c_model }}
                      </p>
                      <p class="card-text">
                        <i class="fa-solid fa-address-card"  style="margin-right: 5px;"></i>
                        {{ cars[0].c_licenceplate }}
                      </p>
                      <div class="d-flex justify-content-between">
                        <div>
                          <span
                            v-if="cars[0].c_isreserved == true"
                            class="badge badge-success rounded-pill"
                            >{{ "Wird benutzt" }}</span>
                            <span v-else class="badge badge-danger rounded-pill"
                            >{{ "Wird nicht benutzt" }}</span
                          >
                        </div>
                      </div>
                      <base-button tag="a" href="#" type="primary" class="mt-4">
                        Mehr Anzeigen
                      </base-button>
                    </div>
                    <div v-else>
                      <p>
                        Sie haben noch keine Autos hinzugefügt. Fangen Sie
                        jetzt an!
                      </p>
                      <base-button tag="a" href="#" type="primary" class="mt-4">
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
                      Reservierungen ({{ reservations.length }})
                    </h6>
                    <div v-if="reservations.length > 0">
                      <p class="description mt-3">
                        Hier sind ihre offen Reservierungen:
                      </p>
                      <p class="card-text">
                        <i class = "fa fa-car-on" style = "margin-right: 5px;"></i>
                        {{ getCar(reservations[0].r_carid).c_brand }}
                        {{ getCar(reservations[0].r_carid).c_model }}
                      </p>
                      <p class="card-text">
                        <i class = "fa-solid fa-calendar-days" style = "margin-right: 5px;"></i>
                        {{
                          formatDate(
                            reservations[0].rt_timeframe
                              .t_dayfrom
                          )
                        }}
                        -
                        {{
                          formatDate(
                            reservations[0].rt_timeframe
                              .t_dayuntil
                          )
                        }}
                      </p>
                      <p class="card-text">
                        <i class = "fa-solid fa-clock" style = "margin-right: 5px;"></i>
                        {{
                          formatTime(
                            reservations[0].rt_timeframe
                              .t_timefrom
                          )
                        }}
                        -
                        {{
                          formatTime(
                            reservations[0].rt_timeframe
                              .t_timeuntil
                          )
                        }}
                      </p>
                      <base-button tag="a" href="#" type="warning" class="mt-4">
                        Mehr Anzeigen
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
      <!-- SVG separator -->
      <!-- <div class="separator separator-bottom separator-skew">
          <svg
            x="0"
            y="0"
            viewBox="0 0 2560 100"
            preserveAspectRatio="none"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon
              class="fill-white"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div> -->
    </div>
  </div>
</template>

<script>
import { api } from "../apiRequest.js";
import moment from 'moment';

export default {
  data() {
    return {
      user: null,
      username: null,
      dataFromDashboard: null,
      parkingSpots: [],
      reservations: [],
      cars: [],
    };
  },
  created() {
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
        .then((response) => {
          this.parkingSpots = response.data.content;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getUserReservations() {
      await api("http://localhost:3000/parkingspots/getReservations")
        .then((response) => {
          this.reservations = response.data.content;
          console.log(this.reservations[0].rt_timeframe);
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
      return this.cars.find((car) => car.c_id === carId);
    },
  },
};
</script>
