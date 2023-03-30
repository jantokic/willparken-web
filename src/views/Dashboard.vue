<template>
  <div>
    <app-header :dataToHeader="dataToHeader"></app-header>
    <!-- Filter Parkingspot -->
    <modal
      :show.sync="modals.filterParkingSpot"
      body-classes="p-0"
      modal-classes="modal-dialog-centered modal-lg"
    >
      <card
        type="secondary"
        shadow
        header-classes="bg-white"
        body-classes="px-lg-5 py-lg-5"
        class="border-0"
      >
        <template slot="header">
          <h4 v-if="!alert.visible" class="text-muted text-center mb-3">
            Parkplätze filtern
          </h4>
          <base-alert v-else :visbility="true" :type="alert.type">
            {{ alert.text }}
          </base-alert>
        </template>
        <div class="container ct-example-row">
          <form role="form">
            <div class="row">
              <div class="col-3">
                <!--Preis-->
                <base-input
                  alternative
                  type="text"
                  placeholder="Max. Preis"
                  addon-left-icon="fa fa-euro-sign"
                  required
                  v-model="newParkingSpot.p_priceperhour"
                />
              </div>
              <div class="col">
                <base-checkbox v-model="tags.ladestation">
                  Ladestation
                </base-checkbox>
                <base-checkbox v-model="tags.tor">
                  Tor
                </base-checkbox>
              </div>
              <div class="col">
                <base-checkbox v-model="tags.kamera">
                  Kamera
                </base-checkbox>
                <base-checkbox v-model="tags.garage">
                  Garage
                </base-checkbox>
              </div>
              <div class="col">
                <base-checkbox v-model="tags.dach">
                  Dach
                </base-checkbox>
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-9 flatpickr">
                <base-input
                  class="flatpickr"
                  addon-left-icon="ni ni-calendar-grid-58"
                >
                  <flatpickr
                    slot-scope="{ focus, blur }"
                    @on-open="focus"
                    @on-close="blur"
                    :config="{
                      allowInput: false,
                      mode: 'range',
                      dateFormat: 'd.m.Y',
                      minDate: 'today',
                      defaultDate: ['today', new Date().fp_incr(1)],
                    }"
                    class="form-control datepicker"
                    v-model="daterange"
                  >
                  </flatpickr>
                </base-input>
              </div>
            </div>

            <div class="row mb-3">
              <div class="col flatpickr">
                <base-input class="flatpickr" addon-left-icon="fa fa-clock">
                  <flatpickr
                    slot-scope="{ focus, blur }"
                    @on-open="focus"
                    @on-close="blur"
                    :config="{
                      enableTime: true,
                      noCalendar: true,
                      dateFormat: ' H:i',
                      time_24hr: true,
                      defaultHour: '12',
                      defaultMinute: '0',
                    }"
                    placeholder=" Uhrzeit - von"
                    class="form-control datepicker"
                    v-model="newParkingSpot.pt_availability.t_timefrom"
                    value="12:00"
                  >
                  </flatpickr>
                </base-input>
              </div>
              <div class="col flatpickr">
                <base-input class="flatpickr" addon-left-icon="fa fa-clock">
                  <flatpickr
                    slot-scope="{ focus, blur }"
                    @on-open="focus"
                    @on-close="blur"
                    :config="{
                      enableTime: true,
                      noCalendar: true,
                      dateFormat: ' H:i',
                      time_24hr: true,
                      defaultHour: '12',
                      defaultMinute: '0',
                    }"
                    placeholder=" Uhrzeit - bis"
                    class="form-control datepicker"
                    v-model="newParkingSpot.pt_availability.t_timeuntil"
                    value="12:00"
                  >
                  </flatpickr>
                </base-input>
              </div>
              <div class="col-1">
                <base-checkbox v-model="weekdays.monday">
                  Mo
                </base-checkbox>
                <base-checkbox v-model="weekdays.tuesday">
                  Di
                </base-checkbox>
              </div>
              <div class="col-1">
                <base-checkbox v-model="weekdays.wednesday">
                  Mi
                </base-checkbox>
                <base-checkbox v-model="weekdays.thursday">
                  Do
                </base-checkbox>
              </div>
              <div class="col-1">
                <base-checkbox v-model="weekdays.friday">
                  Fr
                </base-checkbox>
                <base-checkbox v-model="weekdays.saturday">
                  Sa
                </base-checkbox>
              </div>
              <div class="col-1">
                <base-checkbox v-model="weekdays.sunday">
                  So
                </base-checkbox>
              </div>
            </div>
          </form>
        </div>
        <template slot="footer">
          <div class="row">
            <base-button type="success" class="my-2" block
              >Filter anwenden</base-button
            >
          </div>
        </template>
      </card>
    </modal>

    <!-- Search Parkingspot -->
    <modal
      :show.sync="modals.searchParkingSpot"
      body-classes="p-0"
      modal-classes="modal-dialog-centered modal-lg"
    >
      <card
        type="secondary"
        shadow
        header-classes="bg-white"
        body-classes="px-lg-5 py-lg-5"
        class="border-0"
      >
        <template slot="header">
          <h4 v-if="!alert.visible" class="text-muted text-center mb-3">
            Parkplatz suchen
          </h4>
          <base-alert v-else :visbility="true" :type="alert.type">
            {{ alert.text }}
          </base-alert>
        </template>
        <div class="container ct-example-row">
          <form role="form">
            <div class="row">
              <div class="col">
                <!--Straße-->
                <base-input
                  alternative
                  addon-left-icon="fa fa-road"
                  type="text"
                  placeholder="Straße"
                  class="mb-3"
                  v-model="newParkingSpot.pa_address.a_street"
                />
              </div>
              <div class="col col-lg-2">
                <!--Hausnummer-->
                <base-input
                  alternative
                  type="text"
                  placeholder="Nr"
                  addon-left-icon="fa fa-house"
                  v-model="newParkingSpot.pa_address.a_houseno"
                  required
                />
              </div>
              <div class="col col-lg-2">
                <base-dropdown position="left">
                  <base-button
                    slot="title"
                    type="secondary"
                    class="dropdown-toggle"
                  >
                    <img :src="flagpath" />
                  </base-button>
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      @click="setCountry('Austria')"
                    >
                      <img
                        src="https://demos.creative-tim.com/argon-design-system/assets/img/icons/flags/AT.png"
                      />
                      &nbsp; Österreich
                    </a>
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      @click="setCountry('Germany')"
                    >
                      <img
                        src="https://demos.creative-tim.com/argon-design-system/assets/img/icons/flags/DE.png"
                      />
                      &nbsp; Deutschland
                    </a>
                  </li>
                </base-dropdown>
              </div>
            </div>

            <div class="row mb-3">
              <div class="col">
                <!--Postleitzahl-->
                <base-input
                  alternative
                  type="text"
                  placeholder="PLZ"
                  addon-left-icon="ni ni-pin-3"
                  v-model="newParkingSpot.pa_address.a_zip"
                  required
                />
              </div>
              <div class="col">
                <!--Stadt-->
                <base-input
                  alternative
                  type="text"
                  placeholder="Stadt"
                  addon-left-icon="fa fa-city"
                  v-model="newParkingSpot.pa_address.a_city"
                  required
                />
              </div>
            </div>

            <div class="row">
              <div class="col-10">
                <base-button type="primary" block class="my-2"
                  >Suchen</base-button
                >
              </div>
              <div class="col-2">
                <base-button
                  type="secondary"
                  class="my-2"
                  icon="fa-solid fa-gear"
                  @click="
                    modals.filterParkingSpot = true;
                    modals.searchParkingSpot = false;
                  "
                ></base-button>
              </div>
            </div>
            <google-map></google-map>
          </form>
        </div>
      </card>
    </modal>

    <!-- ADD PARKINGSPOT -->
    <modal
      :show.sync="modals.addParkingSpot"
      body-classes="p-0"
      modal-classes="modal-dialog-centered modal-lg"
    >
      <card
        type="secondary"
        shadow
        header-classes="bg-white"
        body-classes="px-lg-5 py-lg-5"
        class="border-0"
      >
        <template slot="header">
          <h4 v-if="!alert.visible" class="text-muted text-center mb-3">
            Parkplatz erstellen
          </h4>
          <base-alert v-else :visbility="true" :type="alert.type">
            {{ alert.text }}
          </base-alert>
        </template>
        <div class="container ct-example-row">
          <form role="form">
            <div class="row">
              <div class="col">
                <!--Straße-->
                <base-input
                  alternative
                  addon-left-icon="fa fa-road"
                  type="text"
                  placeholder="Straße"
                  class="mb-3"
                  v-model="newParkingSpot.pa_address.a_street"
                />
              </div>
              <div class="col col-lg-2">
                <!--Hausnummer-->
                <base-input
                  alternative
                  type="text"
                  placeholder="Nr"
                  addon-left-icon="fa fa-house"
                  v-model="newParkingSpot.pa_address.a_houseno"
                  required
                />
              </div>
              <div class="col col-lg-2">
                <base-dropdown position="left">
                  <base-button
                    slot="title"
                    type="secondary"
                    class="dropdown-toggle"
                  >
                    <img :src="flagpath" />
                  </base-button>
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      @click="setCountry('Austria')"
                    >
                      <img
                        src="https://demos.creative-tim.com/argon-design-system/assets/img/icons/flags/AT.png"
                      />
                      &nbsp; Österreich
                    </a>
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      @click="setCountry('Germany')"
                    >
                      <img
                        src="https://demos.creative-tim.com/argon-design-system/assets/img/icons/flags/DE.png"
                      />
                      &nbsp; Deutschland
                    </a>
                  </li>
                </base-dropdown>
              </div>
            </div>

            <div class="row mb-3">
              <div class="col">
                <!--Postleitzahl-->
                <base-input
                  alternative
                  type="text"
                  placeholder="PLZ"
                  addon-left-icon="ni ni-pin-3"
                  v-model="newParkingSpot.pa_address.a_zip"
                  required
                />
              </div>
              <div class="col">
                <!--Stadt-->
                <base-input
                  alternative
                  type="text"
                  placeholder="Stadt"
                  addon-left-icon="fa fa-city"
                  v-model="newParkingSpot.pa_address.a_city"
                  required
                />
              </div>
              <div class="col-1">
                <base-checkbox v-model="weekdays.monday">
                  Mo
                </base-checkbox>
                <base-checkbox v-model="weekdays.tuesday">
                  Di
                </base-checkbox>
              </div>
              <div class="col-1">
                <base-checkbox v-model="weekdays.wednesday">
                  Mi
                </base-checkbox>
                <base-checkbox v-model="weekdays.thursday">
                  Do
                </base-checkbox>
              </div>
              <div class="col-1">
                <base-checkbox v-model="weekdays.friday">
                  Fr
                </base-checkbox>
                <base-checkbox v-model="weekdays.saturday">
                  Sa
                </base-checkbox>
              </div>
              <div class="col-1">
                <base-checkbox v-model="weekdays.sunday">
                  So
                </base-checkbox>
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-6 flatpickr">
                <base-input
                  class="flatpickr"
                  addon-left-icon="ni ni-calendar-grid-58"
                >
                  <flatpickr
                    slot-scope="{ focus, blur }"
                    @on-open="focus"
                    @on-close="blur"
                    :config="{
                      allowInput: false,
                      mode: 'range',
                      dateFormat: 'd.m.Y',
                      minDate: 'today',
                      defaultDate: ['today', new Date().fp_incr(1)],
                    }"
                    class="form-control datepicker"
                    v-model="daterange"
                  >
                  </flatpickr>
                </base-input>
              </div>
              <div class="col flatpickr">
                <base-input class="flatpickr" addon-left-icon="fa fa-clock">
                  <flatpickr
                    slot-scope="{ focus, blur }"
                    @on-open="focus"
                    @on-close="blur"
                    :config="{
                      enableTime: true,
                      noCalendar: true,
                      dateFormat: ' H:i',
                      time_24hr: true,
                      defaultHour: '12',
                      defaultMinute: '0',
                    }"
                    placeholder=" Uhrzeit - von"
                    class="form-control datepicker"
                    v-model="newParkingSpot.pt_availability.t_timefrom"
                    value="12:00"
                  >
                  </flatpickr>
                </base-input>
              </div>
              <div class="col flatpickr">
                <base-input class="flatpickr" addon-left-icon="fa fa-clock">
                  <flatpickr
                    slot-scope="{ focus, blur }"
                    @on-open="focus"
                    @on-close="blur"
                    :config="{
                      enableTime: true,
                      noCalendar: true,
                      dateFormat: ' H:i',
                      time_24hr: true,
                      defaultHour: '12',
                      defaultMinute: '0',
                    }"
                    placeholder=" Uhrzeit - bis"
                    class="form-control datepicker"
                    v-model="newParkingSpot.pt_availability.t_timeuntil"
                    value="12:00"
                  >
                  </flatpickr>
                </base-input>
              </div>
            </div>
            <div class="row">
              <div class="col-3">
                <!--Preis-->
                <base-input
                  alternative
                  type="text"
                  placeholder="Preis / Stunde"
                  addon-left-icon="fa fa-euro-sign"
                  required
                  v-model="newParkingSpot.p_priceperhour"
                />
              </div>
              <div class="col-3">
                <!--Parkplatznummer-->
                <base-input
                  alternative
                  type="text"
                  placeholder="Nr (otpional)"
                  addon-left-icon="fa fa-parking"
                  v-model="newParkingSpot.p_number"
                />
              </div>
              <div class="col">
                <base-checkbox v-model="tags.ladestation">
                  Ladestation
                </base-checkbox>
                <base-checkbox v-model="tags.tor">
                  Tor
                </base-checkbox>
              </div>
              <div class="col">
                <base-checkbox v-model="tags.kamera">
                  Kamera
                </base-checkbox>
                <base-checkbox v-model="tags.garage">
                  Garage
                </base-checkbox>
              </div>
              <div class="col">
                <base-checkbox v-model="tags.dach">
                  Dach
                </base-checkbox>
              </div>
            </div>
            <google-map></google-map>
          </form>
        </div>
        <template slot="footer">
          <div class="row">
            <base-button
              type="success"
              class="my-2"
              @click="addNewParkingSpot()"
              >Speichern</base-button
            >
            <base-button
              type="secondary"
              class="my-2"
              @click="modals.addParkingSpot = false"
              >Abbrechen</base-button
            >

            <base-button type="danger" class="ml-auto my-2"
              >Inaktiv Setzen</base-button
            >
          </div>
        </template>
      </card>
    </modal>

    <!-- ADD RESERVATION-->
    <modal
      :show.sync="modals.addReservation"
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
            Reservierung aufgeben
          </h4>
          <base-alert v-else :visbility="true" :type="alert.type">
            {{ alert.text }}
          </base-alert>
        </template>
        <div class="container ct-example-row">
          <form role="form">
            <div class="row">
              <div class="col">
                <!--Auto Auswahl-->
                <base-input
                  alternative
                  type="text"
                  placeholder="Auto"
                  addon-left-icon="fa fa-car"
                  required
                />
              </div>
              <div class="col-1">
                <base-checkbox v-model="weekdays.monday">
                  Mo
                </base-checkbox>
                <base-checkbox v-model="weekdays.tuesday">
                  Di
                </base-checkbox>
              </div>
              <div class="col-1">
                <base-checkbox v-model="weekdays.wednesday">
                  Mi
                </base-checkbox>
                <base-checkbox v-model="weekdays.thursday">
                  Do
                </base-checkbox>
              </div>
              <div class="col-1">
                <base-checkbox v-model="weekdays.friday">
                  Fr
                </base-checkbox>
                <base-checkbox v-model="weekdays.saturday">
                  Sa
                </base-checkbox>
              </div>
              <div class="col-1">
                <base-checkbox v-model="weekdays.sunday">
                  So
                </base-checkbox>
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-6 flatpickr">
                <base-input
                  class="flatpickr"
                  addon-left-icon="ni ni-calendar-grid-58"
                >
                  <flatpickr
                    slot-scope="{ focus, blur }"
                    @on-open="focus"
                    @on-close="blur"
                    :config="{
                      allowInput: false,
                      mode: 'range',
                      dateFormat: 'd.m.Y',
                      minDate: 'today',
                      defaultDate: ['today', new Date().fp_incr(1)],
                    }"
                    class="form-control datepicker"
                    v-model="daterange"
                  >
                  </flatpickr>
                </base-input>
              </div>
              <div class="col flatpickr">
                <base-input class="flatpickr" addon-left-icon="fa fa-clock">
                  <flatpickr
                    slot-scope="{ focus, blur }"
                    @on-open="focus"
                    @on-close="blur"
                    :config="{
                      enableTime: true,
                      noCalendar: true,
                      dateFormat: ' H:i',
                      time_24hr: true,
                      defaultHour: '12',
                      defaultMinute: '0',
                    }"
                    placeholder=" Uhrzeit - von"
                    class="form-control datepicker"
                    v-model="newParkingSpot.pt_availability.t_timefrom"
                    value="12:00"
                  >
                  </flatpickr>
                </base-input>
              </div>
              <div class="col flatpickr">
                <base-input class="flatpickr" addon-left-icon="fa fa-clock">
                  <flatpickr
                    slot-scope="{ focus, blur }"
                    @on-open="focus"
                    @on-close="blur"
                    :config="{
                      enableTime: true,
                      noCalendar: true,
                      dateFormat: ' H:i',
                      time_24hr: true,
                      defaultHour: '12',
                      defaultMinute: '0',
                    }"
                    placeholder=" Uhrzeit - bis"
                    class="form-control datepicker"
                    v-model="newParkingSpot.pt_availability.t_timeuntil"
                    value="12:00"
                  >
                  </flatpickr>
                </base-input>
              </div>
            </div>
          </form>
        </div>
        <template slot="footer">
          <base-button type="success" class="my-4" @click="addNewCar()"
            >Reservieren</base-button
          >
          <base-button
            type="secondary"
            class="ml-auto"
            @click="modals.addCar = false"
            >Abbrechen</base-button
          >
        </template>
      </card>
    </modal>

    <!-- ADD CAR-->
    <modal
      :show.sync="modals.addCar"
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
            Auto hinzufügen
          </h4>
          <base-alert v-else :visbility="true" :type="alert.type">
            {{ alert.text }}
          </base-alert>
        </template>
        <div class="container ct-example-row">
          <form role="form">
            <div class="row">
              <div class="col">
                <!--Automarke-->
                <base-input
                  alternative
                  addon-left-icon="fa fa-car"
                  type="text"
                  placeholder="Marke"
                  class="mb-3"
                  v-model="newCar.c_car.c_brand"
                />
              </div>
              <div class="col">
                <!--Modell-->
                <base-input
                  alternative
                  type="text"
                  addon-left-icon="fa fa-car-rear"
                  placeholder="Modell"
                  v-model="newCar.c_car.c_model"
                  required
                />
              </div>
              <div class="col">
                <!--Kennzeichen-->
                <base-input
                  alternative
                  type="text"
                  addon-left-icon="fa fa-address-card"
                  placeholder="Kennzeichen"
                  v-model="newCar.c_car.c_licenceplate"
                  required
                />
              </div>
            </div>
          </form>
        </div>
        <template slot="footer">
          <base-button type="success" class="my-4" @click="addNewCar()"
            >Speichern</base-button
          >
          <base-button
            type="secondary"
            class="ml-auto"
            @click="modals.addCar = false"
            >Abbrechen</base-button
          >
        </template>
      </card>
    </modal>

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
                <div class="col-lg-4">
                  <card class="border-0" hover shadow body-classes="py-5">
                    <div class="container ct-example-row">
                      <div class="row">
                        <div class="col-">
                          <icon
                            name="fa fa-parking"
                            type="primary"
                            rounded
                            class="mb-4"
                          >
                          </icon>
                        </div>
                        <div class="col-sm"></div>
                        <div class="col-">
                          <base-button
                            type="primary"
                            icon="fa fa-plus"
                            @click="modals.addParkingSpot = true"
                          ></base-button>
                        </div>
                      </div>
                    </div>
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
                          <p class="card-text">
                            <i
                              class="fa fa-tag"
                              style="margin-right: 10px;color:#007bff;"
                            ></i>
                            <span
                              v-for="(tag, index) in activeParkingSpots[0]
                                .p_tags"
                              :key="index"
                              class="badge badge-primary rounded-pill"
                              >{{ tag }}</span
                            >
                          </p>
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
                      <base-button
                        tag="a"
                        href="#/viewParkingSpots"
                        type="primary"
                        class="mt-4"
                      >
                        Alle Anzeigen
                      </base-button>
                    </div>
                    <div v-else>
                      <p>
                        Sie haben noch keine Parkplätze erstellt. Fangen Sie
                        jetzt an!
                      </p>
                      <base-button
                        @click="modals.addParkingSpot = true"
                        type="primary"
                        class="mt-4"
                      >
                        Parkplatz erstellen
                      </base-button>
                    </div>
                  </card>
                </div>
                <div class="col-lg-4">
                  <card class="border-0" hover shadow body-classes="py-5">
                    <div class="container ct-example-row">
                      <div class="row">
                        <div class="col-">
                          <icon
                            name="fa fa-bell"
                            type="warning"
                            rounded
                            class="mb-4"
                          >
                          </icon>
                        </div>
                        <div class="col-sm"></div>
                        <div class="col-">
                          <base-button
                            type="warning"
                            icon="fa fa-plus"
                            @click="modals.searchParkingSpot = true"
                          ></base-button>
                        </div>
                      </div>
                    </div>
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
                        {{ getCarBrand(activeReservations[0].rc_car) }}
                        {{ getCarModel(activeReservations[0].rc_car) }}
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
                      <p class="card-text">
                        <i
                          class="fa fa-money-bill-wave"
                          style="margin-right:10px;color:orangered;"
                        ></i>
                        <span class="badge badge-success badge-pill">
                          Bezahlt
                        </span>
                      </p>
                      <base-button
                        tag="a"
                        href="#/viewReservations"
                        type="warning"
                        class="mt-4"
                      >
                        Alle Anzeigen
                      </base-button>
                    </div>
                    <div v-else>
                      <p>
                        Sie haben zurzeit keinen Parpklatz reserviert. Fangen
                        Sie jetzt an!
                      </p>
                      <base-button
                        @click="modals.addReservation = true"
                        type="warning"
                        class="mt-4"
                      >
                        Parkplatz reservieren
                      </base-button>
                    </div>
                  </card>
                </div>
                <div class="col-lg-4 ">
                  <card class="border-0" hover shadow body-classes="py-5">
                    <div class="container ct-example-row">
                      <div class="row">
                        <div class="col-">
                          <icon
                            name="fa fa-car"
                            type="success"
                            rounded
                            class="mb-4"
                          >
                          </icon>
                        </div>
                        <div class="col-sm"></div>
                        <div class="col-">
                          <base-button
                            type="success"
                            icon="fa fa-plus"
                            @click="modals.addCar = true"
                          ></base-button>
                        </div>
                      </div>
                    </div>
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
                              >Für
                              {{
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
                      <p class="card-text">&nbsp;</p>
                      <base-button tag="a" href="#" type="success" class="mt-4">
                        Alle Anzeigen
                      </base-button>
                    </div>
                    <div v-else>
                      <p>
                        Sie haben noch keine Autos hinzugefügt. Fangen Sie jetzt
                        an!
                      </p>
                      <base-button
                        @click="modals.addCar = true"
                        type="success"
                        class="mt-4"
                      >
                        Auto hinzufügen
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

<script id="dashboard">
import { api } from "../apiRequest.js";
import moment from "moment";
import flatpickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import { onMounted, ref } from "vue";
import ParkingSpotsList from "../components/ParkingSpotsList.vue";
import ReservationList from "../components/ReservationList.vue";

export default {
  components: { flatpickr, ParkingSpotsList, ReservationList },
/*   setup() {
    const streetRef = ref();
    onMounted(() => {
      const autocomplete = new google.maps.places.Autocomplete(
        streetRef.value,
        {
          types: ["address"],
          fields: ["address_components"],
        }
      );
    });
    return { streetRef };
  }, */
  data() {
    return {
      user: null,
      username: null,
      firstname: null,
      lastname: null,
      dataToHeader: null,
      parkingSpots: [],
      activeParkingSpots: [],
      reservations: [],
      activeReservations: [],
      cars: [],
      modals: {
        addParkingSpot: false,
        addCar: false,
        addReservation: false,
        searchParkingSpot: false,
        filterParkingSpot: false,
      },
      // Parkingspot model
      newParkingSpot: {
        p_number: null,
        p_priceperhour: null,
        p_tags: [],
        pt_availability: {
          t_weekday: [],
          t_dayfrom: null,
          t_dayuntil: null,
          t_timefrom: null,
          t_timeuntil: null,
        },
        pr_reservations: [],
        pa_address: {
          a_street: "Fischergasse",
          a_houseno: 30,
          a_zip: 4600,
          a_city: "Wels",
          a_country: "Austria",
        },
      },
      newReservation: {
        rc_car: null,
        rt_timeframe: {
          t_weekday: [],
          t_dayfrom: null,
          t_dayuntil: null,
          t_timefrom: null,
          t_timeuntil: null,
        },
      },
      // Car model
      newCar: {
        c_car: {
          c_brand: null,
          c_model: null,
          c_licenceplate: null,
        },
      },
      flagpath:
        "https://demos.creative-tim.com/argon-design-system/assets/img/icons/flags/AT.png",
      tags: {
        ladestation: true,
        dach: false,
        tor: false,
        garage: false,
        kamera: false,
      },
      weekdays: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      },
      daterange: null,
      alert: {
        visible: false,
        text: "",
        type: "",
      },
    };
  },
  mounted() {
    this.getUser();
    this.getUserParkingSpots();
    this.getUserReservations();
    this.getUserCars();
  },
  computed: {
    selectedTags() {
      const tags = [];
      if (this.tags.ladestation) tags.push("Ladestation");
      if (this.tags.dach) tags.push("Dach");
      if (this.tags.tor) tags.push("Tor");
      if (this.tags.garage) tags.push("Garage");
      if (this.tags.kamera) tags.push("Kamera");

      return tags;
    },
    selectedWeekdays() {
      const availability = [];
      if (this.weekdays.monday) availability.push(1);
      if (this.weekdays.tuesday) availability.push(2);
      if (this.weekdays.wednesday) availability.push(3);
      if (this.weekdays.thursday) availability.push(4);
      if (this.weekdays.friday) availability.push(5);
      if (this.weekdays.saturday) availability.push(6);
      if (this.weekdays.sunday) availability.push(7);

      return availability;
    },
  },
  methods: {
    async addNewParkingSpot() {
      // Update the new parking spot object with the selected tags
      this.newParkingSpot.p_tags = this.selectedTags;

      // Update the new parking spot object with the selected weekdays
      this.newParkingSpot.pt_availability.t_weekday = this.selectedWeekdays;

      // Update the new parking spot object with date and time values
      await this.fillDateAndTimeData();

      // Send the new parking spot object to the backend
      await api(
        "http://localhost:3000/parkingspots/add",
        "POST",
        this.newParkingSpot
      )
        .then(async (response) => {
          this.alert.visible = true;
          this.alert.text =
            "Parkplatz erfolgreich hinzugefügt. Sie werden in Kürze weitergeleitet.";
          this.alert.type = "success";

          //set a delay of 1 second before closing the modal
          setTimeout(async () => {
            // reset the alert
            this.alert.visible = false;
            this.modals.addParkingSpot = false;
            // refresh the page
            location.reload();
          }, 1000);
        })
        .catch((error) => {
          this.alert.visible = true;
          this.alert.text =
            "Parkplatz konnte nicht erstellt werden. Bitte versuchen Sie es erneut.";
          this.alert.type = "danger";
        });
    },
    async addNewCar() {
      // Send the new car object to the backend
      await api("http://localhost:3000/users/addCar", "POST", this.newCar)
        .then(async (response) => {
          this.alert.visible = true;
          this.alert.text =
            "Auto erfolgreich hinzugefügt. Sie werden in Kürze weitergeleitet.";
          this.alert.type = "success";

          //set a delay of 1 second before closing the modal
          setTimeout(async () => {
            // reset the alert
            this.alert.visible = false;
            this.modals.addCar = false;
            // refresh the page
            location.reload();
          }, 1000);
        })
        .catch((error) => {
          this.alert.visible = true;
          this.alert.text =
            "Auto konnte nicht erstellt werden. Bitte versuchen Sie es erneut.";
          this.alert.type = "danger";
        });
    },
    async getUser() {
      //get username from backend and set it to username
      await api("http://localhost:3000/users/getUser")
        .then((response) => {
          this.user = response.data.content;
          this.username = this.user.u_username;
          this.firstname = this.user.u_firstname;
          this.lastname = this.user.u_lastname;

          //set dataFromashboard to username
          this.dataToHeader = this.username;
        })
        .catch((error) => {});
    },
    async getUserParkingSpots() {
      await api("http://localhost:3000/parkingspots/getParkingspots")
        .then(async (response) => {
          this.parkingSpots = response.data.content;
          await this.getActiveParkingSpots();
        })
        .catch((error) => {});
    },
    async getUserReservations() {
      await api("http://localhost:3000/parkingspots/getReservations")
        .then(async (response) => {
          this.reservations = response.data.content;
          await this.getActiveReservations();
        })
        .catch((error) => {});
    },
    async getUserCars() {
      await api("http://localhost:3000/users/getCars")
        .then((response) => {
          this.cars = response.data.content;
        })
        .catch((error) => {});
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
    async setCountry(country) {
      this.newParkingSpot.pa_address.a_country = country;
      this.getCountry();
    },
    getCountry() {
      if (this.newParkingSpot.pa_address.a_country == "Austria") {
        this.flagpath =
          "https://demos.creative-tim.com/argon-design-system/assets/img/icons/flags/AT.png";
      } else if (this.newParkingSpot.pa_address.a_country == "Germany") {
        this.flagpath =
          "https://demos.creative-tim.com/argon-design-system/assets/img/icons/flags/DE.png";
      }
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
    created() {
      if (this.$route.query.search === "true") {
        this.showSearchModal = true;
      }
    },
  },
};
</script>
