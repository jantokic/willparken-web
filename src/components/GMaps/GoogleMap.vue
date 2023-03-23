<template>
  <div>
    <div>
      <!-- <label>
        <vue-google-autocomplete
          id="map"
          classname="form-control"
          placeholder="Start typing"
        >
        </vue-google-autocomplete>
        <button @click="usePlace">Add</button>
      </label> -->
      <br />
    </div>
    <br />

    <gmap-map
      style="width: 100%; height: 300px;"
      :zoom="18"
      :center="{ lat: center.lat, lng: center.lng }"
    >
      <gmap-marker
        v-for="(marker, index) in markers"
        :key="index"
        :position="marker.position"
      ></gmap-marker>
      <gmap-marker
        v-if="this.place"
        label="&#x2605;"
        :position="{
          lat: this.place.geometry.location.lat(),
          lng: this.place.geometry.location.lng(),
        }"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
import { VueGoogleAutocomplete } from "vue-google-autocomplete";

export default {
  name: "GoogleMap",
  data() {
    return {
      center: { lat: 48.157, lng: 14.03 },
      markers: [],
      places: [],
      place: null,
    };
  },

  mounted() {
    //this.locateGeoLocation();
  },

  methods: {
    setDescription(description) {
      this.description = description;
    },
    setPlace(place) {
      this.place = place;
    },
    usePlace(place) {
      if (this.place) {
        this.markers.push({
          position: {
            lat: this.place.geometry.location.lat(),
            lng: this.place.geometry.location.lng(),
          },
        });
        this.place = null;
      }
    },
    /* initMarker(loc) {
      this.existingPlace = loc;
    },
    addLocationMarker() {
      if (this.existingPlace) {
        const marker = {
          lat: this.existingPlace.geometry.location.lat(),
          lng: this.existingPlace.geometry.location.lng(),
        };
        this.locationMarkers.push({ position: marker });
        this.locPlaces.push(this.existingPlace);
        this.center = marker;
        this.existingPlace = null;
      }
    },
    locateGeoLocation: function() {
      navigator.geolocation.getCurrentPosition((res) => {
        this.center = {
          lat: res.coords.latitude,
          lng: res.coords.longitude,
        };
      });
    }, */
  },
};
</script>
