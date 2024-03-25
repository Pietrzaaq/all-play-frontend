<script setup>
import { toRef } from 'vue';
import MapPopup from "@/components/map/MapPopup.vue";

const props = defineProps(['popupArea']);
const popupAreaRef = toRef(props.popupArea);
</script>

<template>
    <MapPopup>
        <template #header>
            <div class="ap-popup-header_title font-bold" style="font-size: 1.5rem">
                {{ popupAreaRef.StreetAddress }}
            </div>
            <div class="ap-popup-header_sport_type d-flex flex-row align-items-center justify-content-center">
                <font-awesome-icon v-if="popupAreaRef.Sport === 'basketball'" :icon="['fas', 'basketball']" style="width: 1rem; height: 1rem"></font-awesome-icon>
                <font-awesome-icon v-if="popupAreaRef.Sport === 'soccer'" :icon="['fas', 'futbol']" style="width: 1rem; height: 1rem"></font-awesome-icon>
                <font-awesome-icon v-if="popupAreaRef.Sport === 'volleyball'" :icon="['fas', 'volleyball']" style="width: 1rem; height: 1rem"></font-awesome-icon>
                <div style="font-size: 1rem; font-weight: 500">{{ popupAreaRef.Sport }}</div>
            </div>
        </template>
        <div>{{ popupAreaRef.FormattedAddress }}</div>
    </MapPopup>
</template>

<style scoped lang="scss"></style>
