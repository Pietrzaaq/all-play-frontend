<script setup>
import {computed, nextTick, ref} from "vue";

let showContextMenu = ref(false);
let left = ref(0);
let top = ref(0);

const style = computed(() => {
  return {
    top: top + 'px',
    left: left + 'px',
  };
});

function open(e) {
  left = e.pageX || e.clientX;
  top = e.pageY || e.clientY;
  nextTick(() => this.$el.focus());
  showContextMenu = true;
}

function close() {
  showContextMenu = false;
  left = 0;
  top = 0;
}
</script>

<template>
  <menu v-show="showContextMenu" :style="style">
    <li>Test 1</li>
    <li>Test 2</li>
    <li>Test 3</li>
  </menu>
</template>

<style scoped>

</style>