<template>
  <main class="d-flex" style="width: 100vw; height: 100vh">
    <l-map ref="map" v-model:zoom="zoom" :center="[47.41322, -1.219482]" :min-zoom="4">
      <l-tile-layer
          :url="url"
          layer-type="base"
          name="OpenStreetMap"
      ></l-tile-layer>
    </l-map>
  </main>
</template>

<script setup>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";
import {ref} from "vue";

const zoom = ref(5);
const url = ref('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
</script>

<style scoped>
>>> .leaflet-control-zoom {
  display: none;
}
</style>