<script setup>
import Dialog from 'primevue/dialog';
import { ref, toRef, watch, defineEmits } from "vue";
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import SportEvent from '@/models/sportEvent.js';

const emit = defineEmits(['close-dialog']);

const props = defineProps(['visible', 'event']);
const visibleFromProp = toRef(props, 'visible');
const eventFromProp = toRef(props, 'event');
const dialogVisible = ref(null);

// Form values
let sportType = ref('');
let createdBy = ref();
let creationDate = ref();
let eventStartDate = ref();
let eventEndDate = ref();

function addEvent() {
  creationDate.value = new Date();
  
  const event = new SportEvent(eventFromProp.value.Id, sportType.value, createdBy.value, creationDate.value, eventStartDate.value, eventEndDate.value);
  sportEventService.create(event);

  closeDialog();
}

function closeDialog() {
  emit('close-dialog');
}

watch(visibleFromProp, function () {
  dialogVisible.value = visibleFromProp.value;
});
</script>

<template>
    <Dialog
        :visible="dialogVisible"
        modal
        header="Add event"
        :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
        @update:visible="closeDialog">
        <form autocomplete="off">
            <div class="d-flex flex-column gap-2">
                <label for="eventName">Sport type</label>
                <InputText
                    id="eventName"
                    v-model="sportType"
                    class="w-100" />
            </div>
            <div class="d-flex flex-column gap-2 pt-1">
                <label for="streetAddress">Created by</label>
                <InputText
                    id="streetAddress"
                    v-model="createdBy"
                    class="w-100" />
            </div>
            <div class="d-flex flex-column pt-1">
                <label for="eventStartDate">Start date</label>
                <Calendar
                    id="eventStartDate"
                    v-model="eventStartDate"
                    name="eventStartDate"
                    show-time
                    hour-format="24" />
            </div>
            <div class="d-flex flex-column pt-1">
                <label for="eventStartDate">End date</label>
                <Calendar
                    id="eventStartDate"
                    v-model="eventEndDate"
                    name="eventStartDate"
                    show-time
                    hour-format="24" />
            </div>
            <div class="d-flex w-100 justify-content-flex-end pt-3">
                <Button
                    label="Submit"
                    icon="pi pi-check"
                    icon-pos="right" 
                    @click.prevent="addEvent" />
            </div>
        </form>
    </Dialog>
</template>


<style scoped>

</style>