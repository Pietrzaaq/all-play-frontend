import { computed, ref } from 'vue';
import { defineStore } from "pinia";
import areasService from "../services/areasService";

export const useAreasStore = defineStore(
    'areas', () => {
    const _areas = ref([]);
    const areas = computed(() => _areas.value);
    async function loadAll() {
        const result = await areasService.getAll();

        if (result.data && result.data.length > 0) {
            result.data.forEach((a) => {
                a.Polygon = JSON.parse(a.Polygon);
                a.Coordinates = { latitude: a.latitude, longitude: a.longitude };
            });
        }

        _areas.value = result.data;
    }

    return { 
        _areas, 
        areas,
        loadAll
    };
});