<script setup>

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
</script>

<template>
  <aside>
    <section id="side-bar-header">
      <div id="side-bar-header-title">
        <h1>
          All Play
        </h1>
      </div>
      <div id="side-bar-header-actions">
        <font-awesome-icon icon="fa-solid fa-gear"/>
      </div>
      <div id="side-bar-header-search-bar">
        <input type="text"/>
        <div id="side-bar-header-search-bar-icon">
          <font-awesome-icon icon="fa-solid fa-magnifying-glass"></font-awesome-icon>
        </div>
      </div>
      <div></div>
    </section>
  </aside>
</template>

<style scoped>
aside {
  position: absolute;
  display: flex;
  align-items: flex-start;
  z-index: 1000; 
  width: 25rem;
  height: 90vh;
  top: 1rem; 
  left: 1rem;
  background-color: var(--primary-background-color-dark);
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
  border-bottom: 1px solid var(--primary-background-color-dark-light)
}

#side-bar-header-title {
  width: 100%;
  text-align: center;
  font-size: 50px;
}

#side-bar-header-title h1{
  font-size: 1.5rem;
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

#side-bar-header-search-bar input {
  width: 90%;
  margin: auto 0;
  border-radius: 1rem;
  border: none;
}

#side-bar-header-search-bar-icon {
  left: 2rem;
  position: absolute;
}
</style>