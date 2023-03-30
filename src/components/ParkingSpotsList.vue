<template>
  <div class="parking-spots-list">
    <div class="row">
      <div class="col">
        <h2 class="mb-4 display-3 center text-primary">Ihre Parkplätze</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-4 col-md-6 mb-4" v-for="(parkingSpot, index) in activeParkingSpots" :key="index">
        <parking-spot :parking-spot="parkingSpot" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <base-pagination :page-count="10" align="center" size="lg"></base-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import ParkingSpot from './ParkingSpot.vue';

export default {
  components: {
    ParkingSpot,
  },
  props: {
    activeParkingSpots: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.parking-spots-list {
  background-color: #ffffff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
}
</style>
