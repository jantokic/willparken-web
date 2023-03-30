<!-- ReservationCard.vue -->
<template>
  <div class="reservation-card">
    <card class="border-0" hover shadow body-classes="py-5">
      <div>
        <p class="card-text">
          <i class="fa fa-car-on" style="margin-right: 10px;color:orangered;"></i>
          {{ getCarBrand(reservation.rc_car) }}
          {{ getCarModel(reservation.rc_car) }}
        </p>
        <p class="card-text">
          <i class="fa-solid fa-calendar-days" style="margin-right: 10px;color:orangered;"></i>
          {{ formatDate(reservation.rt_timeframe.t_dayfrom) }}
          -
          {{ formatDate(reservation.rt_timeframe.t_dayuntil) }}
        </p>
        <p class="card-text">
          <i class="fa-solid fa-clock" style="margin-right: 10px;color:orangered;"></i>
          {{ formatTime(reservation.rt_timeframe.t_timefrom) }}
          -
          {{ formatTime(reservation.rt_timeframe.t_timeuntil) }}
        </p>
        <p class="card-text">
          <i class="fa fa-money-bill-wave" style="margin-right:10px;color:orangered;"></i>
          <span class="badge badge-success badge-pill">
            Bezahlt
          </span>
        </p>
        <p>&NonBreakingSpace;</p>
        <div class="container ct-example-row">
          <div class="col">
            <base-button block type="warning" icon="fa-solid fa-trash"></base-button>
          </div>
        </div>
      </div>
    </card>
  </div>
</template>


<script>
import moment from "moment";

export default {
  props: {
    reservation: {
      type: Object,
      required: true,
    },
    cars: {
      type: Array,
      required: true,
    },
  },
  methods: {
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
    formatTime(time) {
      return moment()
        .startOf("day")
        .add(time, "minutes")
        .format("HH:mm");
    },
    formatDate(date) {
      return moment(date.toString(), "YYYYMMDD").format("DD.MM.YYYY");
    },
  },
};
</script>

<style scoped>
.reservation-card {
  margin-bottom: 24px;
}

.card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
}
</style>
