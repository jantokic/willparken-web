<template>
  <card class="border-0 parking-spot" hover shadow body-classes="py-5">
    <div>
      <p class="card-text">
        <i
          class="fa fa-location-dot"
          style="margin-right: 10px; color:#007bff;"
        ></i>
        {{ parkingSpot.pa_address.a_street }}
        {{ parkingSpot.pa_address.a_houseno }},
        {{ parkingSpot.pa_address.a_city }}
        <span v-if="parkingSpot.p_number"
          ><strong style="color:#007bff;"
            >({{ parkingSpot.p_number }})</strong
          ></span
        >
      </p>
      <p class="card-text">
        <i
          class="fa fa-money-bill-wave"
          style="margin-right:3px;color:#007bff;"
        ></i>
        {{ parkingSpot.p_priceperhour }}€ pro Stunde
      </p>
      <div
        v-if="parkingSpot.p_tags.length > 0"
        class="d-flex justify-content-between"
      >
        <div>
          <p class="card-text">
            <i class="fa fa-tag" style="margin-right: 10px;color:#007bff;"></i>
            <span
              v-for="(tag, index) in parkingSpot.p_tags"
              :key="index"
              class="badge badge-primary rounded-pill"
              >{{ tag }}</span
            >
          </p>
        </div>
      </div>
      <p></p>
      <p class="card-text">
        <i class="fa fa-bell" style="margin-right: 10px;color:#007bff;"></i>
        <span
          v-if="
            parkingSpot.pr_reservations.length > 0 &&
              parkingSpot.pr_reservations.some((res) => !res.r_cancelled)
          "
          class="badge badge-info badge-pill"
        >
          {{
            parkingSpot.pr_reservations.filter((res) => !res.r_cancelled).length
          }}
          Offene Reservierungen
        </span>
        <span v-else class="badge badge-danger badge-pill">
          Keine offenen Reservierungen
        </span>
      </p>
      <p>&NonBreakingSpace;</p>
      <div class="container ct-example-row">
        <div class="row">
            <div class="col-">
            <base-button type="primary" icon="fa-solid fa-pen"></base-button>
          </div>
          <div class="col-md"></div>
          <div class="col-">
            <base-button type="warning" icon="fa-solid fa-trash"></base-button>
          </div>
        </div>
      </div>
    </div>
  </card>
</template>

<script>
export default {
  props: {
    parkingSpot: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.parking-spot {
  margin-bottom: 24px;
}
.card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
}
</style>
