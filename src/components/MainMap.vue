<script setup>
import "leaflet/dist/leaflet.css";
import {LMap, LTileLayer, LMarker, LIcon, LPolygon, LControlZoom} from "@vue-leaflet/vue-leaflet";
import {latLng} from "leaflet";
import {onBeforeMount, ref} from "vue";
import axios from "axios";
import contextMenuComp from "./contextMenuComp.js";

const contextMenu = ref(null);
const { contextMenuStyle,contextMenuOptions, handleContextMenuClick, contextMenuOptionClicked } = contextMenuComp(contextMenu);
let center = ref([51.7785551, 19.474152]);
const zoom = ref(12);
const url = ref('https://tile.openstreetmap.org/{z}/{x}/{y}.png');
let areas = ref([]);
const polygon = ref({
  latlngs: [[51.78054616613809, 19.49480473995209], [51.78062249921673, 19.495266079902652], [51.78054284730566, 19.495673775672916], [51.7802939341772, 19.49578106403351], [51.78016117994722, 19.494949579238895]],
  color: 'green'
});

function onMapClick(e) {
  console.log('onMapClick', e);
}

onBeforeMount(async () => {
  const result = await axios.get("https://localhost:7046/areas");
  console.log(result.data);
  areas.value = result.data;

  navigator.geolocation.getCurrentPosition((position) => {
    center.value = [position.latitude, position.longitude];
  });
});
</script>

<template>
<main
	class="d-flex"
	style="width: 100vw; height: 100vh">
	<l-map
		ref="map"
		:zoom="zoom"
		:center="[51.7785551, 19.474152]"
		:min-zoom="4"
		@click="onMapClick"
		@contextmenu="handleContextMenuClick($event)">
		<l-tile-layer
			:url="url"
			layer-type="base"
			name="OpenStreetMap" />
		<l-marker
			v-for="area in areas"
			:key="area.id"
			:lat-lng="latLng(area.latitude, area.longitude)">
			<l-icon
				:icon-size="[30, 50]"
				:icon-anchor="[12, 40]">
				<img
					style="width: 100%"
					src="../../public/basketball_icon.png"
					alt="basketball icon">
			</l-icon>
		</l-marker>
		<l-polygon
			:lat-lngs="polygon.latlngs"
			:color="polygon.color" />
		<l-control-zoom
			class="control-zoom-bottom-right"
			:position="'bottomright'" />
		<vue-simple-context-menu
			ref="contextMenu"
			element-id="map-context-menu"
			class="map-context-menu"
			:options="contextMenuOptions"
			:style="`top: ${contextMenuStyle.top}px; left: ${contextMenuStyle.left}px`"
			@option-clicked="contextMenuOptionClicked" />
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

.map-context-menu {
  position: fixed;
  z-index: 1000;
  margin: 0;
  padding: 1rem;
  cursor: pointer;
  color: var(--primary-font-color);
  border-radius: 0 1.5rem 1.5rem 1.5rem !important;
  min-width: 15rem;
}
</style>