<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ref } from "vue";
import AutoComplete from 'primevue/autocomplete';

let searchKey = ref(null);

function search() {
  console.log("Searching ", searchKey.value);
}
</script>

<template>
<aside>
	<section id="side-bar-header">
		<div id="side-bar-header-title">
			<h1>
				All Play
			</h1>
			<div id="side-bar-header-actions">
				<font-awesome-icon
					icon="fa-solid fa-gear"
					class="fa-xl" />
			</div>
		</div>
		<div id="side-bar-header-search-bar">
			<AutoComplete
				v-model="searchKey"
				class="side-bar-header-search-bar-autocomplete"
				:suggestions="['Matejki', 'Lumumby']"
				placeholder="Search..."
				@complete="search" />
			<div id="side-bar-header-search-bar-icon">
				<font-awesome-icon icon="fa-solid fa-magnifying-glass" />
			</div>
		</div>
		<div />
	</section>
	<section id="side-bar-body">
		<div class="side-bar-body-option">
			<font-awesome-icon
				icon="fa-solid fa-star"
				class="p-2"
				style="width: 2rem; height: 2rem" />
			<h4>Favorites</h4>
		</div>
		<div class="side-bar-body-option">
			<font-awesome-icon
				icon="fa-solid fa-calendar"
				class="p-2"
				style="width: 2rem; height: 2rem" />
			<h4>Calendar</h4>
		</div>
		<div class="side-bar-body-option">
			<font-awesome-icon
				icon="fa-solid fa-people-group"
				class="p-2"
				style="width: 2rem; height: 2rem" />
			<h4>Teams</h4>
		</div>
		<div class="side-bar-body-option">
			<font-awesome-icon
				icon="fa-solid fa-clock-rotate-left"
				class="p-2"
				style="width: 2rem; height: 2rem" />
			<h4>History</h4>
		</div>
	</section>
</aside>
</template>

<style scoped>
aside {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 1000; 
  width: 25rem;
  height: 90vh;
  top: 1rem; 
  left: 1rem;
  background-color: var(--primary-background-color);
  background-image: var(--primary-background-gradient);
  color: var(--primary-font-color);
  border-bottom: 1px solid var(--primary-background-color-dark-light);
  border-radius: 1rem;
}

#side-bar-header {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  align-items: center;
  border: 0.25rem solid var(--primary-font-color);
  border-radius: 1rem 1rem 0 0;
}

#side-bar-header-title {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
}

#side-bar-header-title h1{
  font-size: 2rem;
  font-weight: 900;
}

#side-bar-header-actions {
  position: absolute;
  padding-right: 1rem;
  font-size: 1.25rem;
  right: 0;
}

#side-bar-header-search-bar {
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 0.5rem;
  margin: 0 auto
}

#side-bar-header-search-bar-icon {
  left: 2rem;
  position: absolute;
}

#side-bar-body {
  width: 100%;
  padding: 1rem;
}

.side-bar-body-option {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem;
  margin: 1rem 1rem 0  0;
  width: 100%;
  border-radius: 3rem;
  border: 0.1rem solid transparent;
  transition: background-color 300ms ease-out;
  cursor: pointer;
}

.side-bar-body-option:hover {
  background-color: var(--primary-background-color);
  border: 0.1rem solid var(--primary-font-color)
}
</style>