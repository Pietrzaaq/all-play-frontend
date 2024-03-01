<script setup>

import {onMounted, toRef, watch} from "vue";

const props = defineProps(['teleportTo', 'popupArea'])
console.log(props);
const teleportToRef = toRef(props.teleportTo);
const popupAreaRef = toRef(props.popupArea);

watch(teleportToRef, function () {
});

function onMouseOver(event) {
}

onMounted(() => {
    
}) 
</script>

<template>
    <Teleport :to="teleportToRef">    
        <div id="area-popup-body" style="min-width: 30rem" class="ap-popup position-absolute flex flex-column" @mouseover="onMouseOver">
            <div class="ap-popup-header">
                <h3>{{ popupAreaRef.FormattedAddress }}</h3>
            </div>
            <div class="ap-popup-body">
                <div>{{ popupAreaRef.FormattedAddress }}</div>
                <div>{{ popupAreaRef.Sport }}</div>
            </div>
        </div>
    </Teleport>

</template>

<style scoped lang="scss"></style>
