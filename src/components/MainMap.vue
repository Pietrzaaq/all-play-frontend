<script setup>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LIcon, LPolygon, LControlZoom } from "@vue-leaflet/vue-leaflet";
import { latLng } from "leaflet";
import { onBeforeMount, ref } from "vue";
import axios from "axios";
import contextMenuComp from "./contextMenuComp.js";
import ContextMenu from 'primevue/contextmenu';
import Badge from "primevue/badge";
import AddEventDialog from "./AddEventDialog.vue";

// Map
const map = ref(null);
let center = ref([51.7785551, 19.474152]);
const zoom = ref(12);
const url = ref('https://tile.openstreetmap.org/{z}/{x}/{y}.png');
let areas = ref([]);
const polygon = ref({
    latlngs: [[51.78054616613809, 19.49480473995209], [51.78062249921673, 19.495266079902652], [51.78054284730566, 19.495673775672916], [51.7802939341772, 19.49578106403351], [51.78016117994722, 19.494949579238895]],
    color: 'green'
});

// Context menu
const contextMenu = ref(null);
const { contextMenuOptions, handleContextMenuClick, dialogVisible } = contextMenuComp(contextMenu);

// Dialog 


function onMapClick(e) {
    console.log('onMapClick', e);
}

function onDialogClosed() {

}

onBeforeMount(async () => {
    const result = await axios.get("https://localhost:5000/areas");
    console.log(result.data);
    areas.value = result.data;

    navigator.geolocation.getCurrentPosition((position) => {
        center.value = [position.latitude, position.longitude];
    });

    // map.value.invalidateSize();
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
            aria-haspopup="true"
            @click="onMapClick"
            @contextmenu="handleContextMenuClick">
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
            <AddEventDialog :visible="dialogVisible" @closeDialog="onDialogClosed"></AddEventDialog>
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