<script setup>
import Dialog from 'primevue/dialog';
import Checkbox from 'primevue/checkbox';
import { ref, toRef, watch, defineEmits } from "vue";
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import Area from '../models/area.js';
import areasService from "../services/areasService.js";

const emit = defineEmits(['close-dialog']);

const props = defineProps(['visible', 'event']);
const visibleFromProp = toRef(props, 'visible');
const eventFromProp = toRef(props, 'event');
const dialogVisible = ref(null);

// Form values
let eventName = ref('');
let streetAddress = ref('');
let isOutdoorArea = ref(false);

function addEvent() {
  console.log(eventFromProp.value);
  const area = new Area(eventName.value, streetAddress.value, isOutdoorArea.value, eventFromProp.value.lat, eventFromProp.value.lng);
  console.log(area);

  areasService.create(area);

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
			<label for="eventName">Event name</label>
			<InputText
				id="eventName"
				v-model="eventName"
				class="w-100" />
		</div>
		<div class="d-flex flex-column gap-2 pt-1">
			<label for="streetAddress">Street address</label>
			<InputText
				id="streetAddress"
				v-model="streetAddress"
				class="w-100" />
		</div>
		<div class="d-flex flex-column pt-1">
			<label for="isOutdoorArea">Is outdoor area</label>
			<Checkbox
				id="isOutdoorArea"
				v-model="isOutdoorArea"
				name="isOutdoorArea"
				:binary="true" />
		</div>
		<div class="d-flex flex-row w-100 pt-1 justify-content-left">
			<div class="d-flex flex-column w-100 pr-1">
				<label for="lat">Lat</label>
				<InputNumber
					id="lat"
					v-model="eventFromProp.lat"
					name="lat"
					disabled
					class="w-100" />
			</div>
			<div class="d-flex flex-column w-100 pl-1">
				<label for="long">Long</label>
				<InputNumber
					id="long"
					v-model="eventFromProp.lng"
					name="long"
					disabled
					class="w-100" />
			</div>
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