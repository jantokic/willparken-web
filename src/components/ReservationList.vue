<!-- ReservationsList.vue -->
<template>
  <div class="reservations-list">
    <div class="row">
      <div class="col">
        <h2 class="mb-4">Aktive Reservierungen</h2>
      </div>
    </div>
    <div class="row">
      <div
        class="col-lg-4 col-md-6 mb-4"
        v-for="(reservation, index) in activeReservations"
        :key="index"
      >
        <reservation-card :reservation="reservation" :cars="cars"/>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <base-pagination
          :page-count="10"
          align="center"
          size="lg"
        ></base-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import ReservationCard from "./ReservationCard.vue";

export default {
  components: {
    ReservationCard,
  },
  props: {
    activeReservations: {
      type: Array,
      required: true,
    },
    cars: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.reservations-list {
  background-color: #ffffff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
}
</style>
