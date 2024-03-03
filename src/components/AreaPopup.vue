<script setup>
import { onMounted, toRef, watch } from 'vue';

const props = defineProps(['teleportTo', 'popupArea']);
console.log(props);
const teleportToRef = toRef(props.teleportTo);
const popupAreaRef = toRef(props.popupArea);

watch(teleportToRef, function () {});

function onMouseOver(event) {}

onMounted(() => {});
</script>

<template>
    <Teleport :to="teleportToRef">
        <div id="area-popup-body" class="ap-popup position-absolute flex flex-column w-100" @mouseover="onMouseOver">
            <div class="ap-popup-header">
                <div class="ap-popup-header_title font-bold" style="font-size: 1.5rem">
                    {{ popupAreaRef.StreetAddress }}
                </div>
                <div class="ap-popup-header_sport_type d-flex flex-row align-items-center justify-content-center">
                    <font-awesome-icon v-if="popupAreaRef.Sport === 'basketball'" :icon="['fas', 'basketball']" style="width: 1rem; height: 1rem"></font-awesome-icon>
                    <font-awesome-icon v-if="popupAreaRef.Sport === 'soccer'" :icon="['fas', 'futbol']" style="width: 1rem; height: 1rem"></font-awesome-icon>
                    <font-awesome-icon v-if="popupAreaRef.Sport === 'volleyball'" :icon="['fas', 'volleyball']" style="width: 1rem; height: 1rem"></font-awesome-icon>
                    <div style="font-size: 1rem; font-weight: 500">{{ popupAreaRef.Sport }}</div>
                </div>
            </div>
            <div class="ap-popup-body">
                <div>{{ popupAreaRef.FormattedAddress }}</div>
            </div>
        </div>
    </Teleport>
</template>

<style scoped lang="scss"></style>
