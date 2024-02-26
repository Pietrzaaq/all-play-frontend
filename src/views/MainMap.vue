<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import AddEventDialog from '@/components/AddEventDialog.vue';
import areasService from '../services/AreasService.js';
import { latLng } from 'leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Map
const map = ref(null);
let center = ref([51.7785551, 19.474152]);
const zoom = ref(16);
const bounds = ref(null);
const url = ref('https://tile.openstreetmap.org/{z}/{x}/{y}.png');
let areas = ref([]);

// Dialog
const dialogVisible = ref(false);
const areaEvent = ref();

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
        result.data.forEach((a) => {
            a.Polygon = JSON.parse(a.Polygon);
            a.Coordinates = { latitude: a.latitude, longitude: a.longitude };
        });
    }

    areas.value = result.data;

    areas.value.forEach((area) => {
        const polygon = L.geoJSON(area.Polygon).addTo(map.value);

        polygon.on('click', onPolygonClick);
    });
}

function boundsUpdated(newBoundsValue) {
    if (bounds.value !== newBoundsValue) {
        bounds.value = newBoundsValue;
    }
}

function openAddEventDialog(area) {
    areaEvent.value = area;
    dialogVisible.value = true;
}

function initializeMap() {
    map.value = L.map('map', {
        center: L.latLng(center.value[0], center.value[1]),
        zoom: zoom.value
    });

    map.value.on('load', onMapLoad);
    map.value.on('zoomend', onZoomEnd);
    map.value.on('moveend', onMoveEnd);
    map.value.on('click', onMapClick);
    map.value.on('unload', onMapUnload);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 4,
        maxZoom: 19,
        closePopupOnClick: false,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map.value);
}

function onMapLoad() {
    console.log('Map load!');
}

function onMapUnload() {}

function onZoomEnd(event) {
    console.log(event);
    console.log(zoom.value);
    const newZoomValue = event.target._zoom;
    console.log(newZoomValue);

    if (zoom.value !== newZoomValue) {
        console.log('New zoom value', newZoomValue);
        zoom.value = newZoomValue;
    }
}

function onMoveEnd() {
    console.log('onMoveEnd');
    const newCenterValue = map.value.getCenter();

    if (center.value.lat !== newCenterValue.lat && center.value.lng !== newCenterValue.lng) {
        console.log('New center value', newCenterValue);
        center.value = newCenterValue;
    }
}

function onPolygonClick(event) {
    console.log('onPolygonClick');
}

onBeforeMount(async () => {
    await loadAreas();

    navigator.geolocation.getCurrentPosition((position) => {
        center.value = [position.latitude, position.longitude];
    });
});

onMounted(() => {
    initializeMap();
    console.log('Mounted');
});
</script>

<template>
    <main class="d-flex" style="width: 100vw; height: 100vh">
        <div id="map" style="height: 100%" @load="onMapLoad"></div>
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
