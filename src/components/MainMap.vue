<script setup>
import "leaflet/dist/leaflet.css";
import {LMap, LTileLayer, LMarker, LIcon, LPolygon, LControlZoom} from "@vue-leaflet/vue-leaflet";
import {latLng} from "leaflet";
import {onBeforeMount, ref} from "vue";
import axios from "axios";
import ContextMenu from "./ContextMenu.vue";

const menu = ref(null);
let center = ref([51.7785551, 19.474152]);
const zoom = ref(12);
const url = ref('https://tile.openstreetmap.org/{z}/{x}/{y}.png');
let areas = ref([]);
const polygon = ref({
  latlngs: [[47.2263299, -1.6222], [47.21024000000001, -1.6270065], [47.1969447, -1.6136169], [47.18527929999999, -1.6143036], [47.1794457, -1.6098404], [47.1775788, -1.5985107], [47.1676598, -1.5753365], [47.1593731, -1.5521622], [47.1593731, -1.5319061], [47.1722111, -1.5143967], [47.1960115, -1.4841843], [47.2095404, -1.4848709], [47.2291277, -1.4683914], [47.2533687, -1.5116501], [47.2577961, -1.5531921], [47.26828069, -1.5621185], [47.2657179, -1.589241], [47.2589612, -1.6204834], [47.237287, -1.6266632], [47.2263299, -1.6222]],
  color: 'green'
})

function onMapClick(e) {
  console.log(e);
}

function openContextMenu(e) {
  console.log(e);
  console.log(menu);
  menu.open(e);
}

onBeforeMount(async () => {
  const result = await axios.get("https://localhost:7046/areas");
  console.log(result.data);
  areas = result.data;
  
  console.log(menu);

  navigator.geolocation.getCurrentPosition((position) => {
    center = [position.latitude, position.longitude]
  });
})
</script>

<template>
  <main class="d-flex" style="width: 100vw; height: 100vh">
    <l-map ref="map" v-model:zoom="zoom" :center="[51.7785551, 19.474152]" :min-zoom="4" @click="onMapClick" @contextmenu="openContextMenu">
      <l-tile-layer
          :url="url"
          layer-type="base"
          name="OpenStreetMap"
      ></l-tile-layer>
      <l-marker v-for="area in areas" :lat-lng="latLng(area.latitude, area.longitude)"/>
      <l-marker v-for="area in areas" :lat-lng="latLng(area.latitude, area.longitude)">
        <l-icon :icon-size="[30, 50]" :icon-anchor="[12, 40]">
          <img style="width: 100%" src="../../public/basketball_icon.png" alt="basketball icon">
        </l-icon>
      </l-marker>
      <l-polygon :lat-lngs="polygon.latlngs" :color="polygon.color"></l-polygon>
      <l-control-zoom class="control-zoom-bottom-right" :position="'bottomright'"></l-control-zoom>
      <context-menu ref="menu"></context-menu>
    </l-map>
  </main>
</template>

<style scoped>
:deep(.leaflet-control-zoom) {
  display: none;
}

:deep(.leaflet-div-icon) {
  background-color: transparent;
  border: none;
}

.leaflet-control-zoom .control-zoom-bottom-right {
  display: block !important;
}
</style>