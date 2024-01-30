<script setup>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LIcon, LControlZoom, LGeoJson } from "@vue-leaflet/vue-leaflet";
import { onBeforeMount, onMounted, ref } from "vue";
import contextMenuComp from "@/components/contextMenuComp.js";
import ContextMenu from 'primevue/contextmenu';
import Badge from "primevue/badge";
import AddEventDialog from "@/components/AddEventDialog.vue";
import areasService from "../services/AreasService.js";
import { latLng } from "leaflet";

// Map
const map = ref(null);
let center = ref([51.7785551, 19.474152]);
const zoom = ref(16);
const bounds = ref(null);
const url = ref('https://tile.openstreetmap.org/{z}/{x}/{y}.png');
let areas = ref([]);
// const polygon = ref({
//     latlngs: [[51.78054616613809, 19.49480473995209], [51.78062249921673, 19.495266079902652], [51.78054284730566, 19.495673775672916], [51.7802939341772, 19.49578106403351], [51.78016117994722, 19.494949579238895]],
//     color: 'green'
// });

// Dialog 
const dialogVisible = ref(false);
const areaEvent = ref();

// Context menu
const contextMenu = ref(null);
const { contextMenuOptions, handleContextMenuClick, eventLatLong } = contextMenuComp(contextMenu, dialogVisible);

function onMapClick(e) {
  console.log('onMapClick', e);
}

function onDialogClosed() {
  dialogVisible.value = false;

  loadAreas();
}

function onMarkerClicked(event) {
  console.log('On marker clicked', event);
}

async function loadAreas() {
  const result = await areasService.getAll();
  
  if (result.data && result.data.length > 0) {
    result.data.forEach(a => {
      a.Polygon = JSON.parse(a.Polygon);
      a.Coordinates = JSON.parse(a.Coordinates).coordinates;
    });
  }
  
  areas.value = result.data;
}

function zoomUpdated (newZoomValue) {
  if (zoom.value !== newZoomValue) {
    zoom.value = newZoomValue;
  }
}

function centerUpdated (newCenterValue) {
  if (center.value !== newCenterValue) {
    center.value = newCenterValue;
  }
}

function boundsUpdated (newBoundsValue) {
  if (bounds.value !== newBoundsValue) {
    bounds.value = newBoundsValue;
  }  
}

function openAddEventDialog(area) {
  areaEvent.value = area;
  dialogVisible.value=true;
}

onBeforeMount(async () => {
  await loadAreas();
  
  navigator.geolocation.getCurrentPosition((position) => {
    center.value = [position.latitude, position.longitude];
  });
});

onMounted(() => {
  console.log('Mounted');
  console.log(map.value);
  map.value.ready = false;
});
</script>

<template>
<main
	class="d-flex"
	style="width: 100vw; height: 100vh">
	<l-map
		ref="map"
		:zoom="zoom"
		:center="center"
		:min-zoom="4"
		aria-haspopup="true"
		@click="onMapClick"
		@contextmenu="handleContextMenuClick"
		@update:zoom="zoomUpdated"
		@update:center="centerUpdated"
		@update:bounds="boundsUpdated">
		<l-tile-layer
			:url="url"
			layer-type="base"
			name="OpenStreetMap" />
		<l-marker
			v-for="area in areas"
			:key="area.id"
			:lat-lng="latLng(area.Coordinates[1], area.Coordinates[0])"
			:name="area.name"
			@click="onMarkerClicked">
			<l-icon
				:icon-size="[80, 80]"
				:icon-anchor="[40, 70]">
				<img
					style="width: 100%"
					src="../../public/map/marker-basketball.png"
					alt="basketball icon">
			</l-icon>
		</l-marker>
		<l-geo-json
			v-for="area in areas"
			:key="area.id"
			:name="area.name"
			:geojson="area.Polygon" 
			@click="openAddEventDialog(area)" />
		<!--		<l-polygon-->
		<!--			:lat-lngs="polygon.latlngs"-->
		<!--			:color="polygon.color" -->
		<!--			@mouseenter="console.log('Mouse enter')"-->
		<!--			@mouseover="console.log('Mouse enter')" />-->
		<l-control-zoom
			class="control-zoom-bottom-right"
			:position="'bottomright'" />
		<ContextMenu
			ref="contextMenu"
			class="map-context-menu"
			:model="contextMenuOptions">
			<template #item="{ item, props }">
				<a
					class="flex align-items-center"
					v-bind="props.action">
					<font-awesome-icon :icon="item.icon" />
					<span class="ml-2">{{ item.label }}</span>
					<Badge
						v-if="item.badge"
						class="ml-auto"
						:value="item.badge" />
				</a>
			</template>
		</ContextMenu>
		<AddEventDialog
			:visible="dialogVisible"
			:event="areaEvent"
			@close-dialog="onDialogClosed" />
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