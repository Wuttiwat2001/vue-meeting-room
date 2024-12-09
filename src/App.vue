<script setup>
import { ref, onMounted } from 'vue';
import { Popover } from 'bootstrap';
const popoverButtonRef = ref(null);

onMounted(() => {
  Array.from(document.querySelectorAll('button[data-bs-toggle="popover"]'))
    .forEach(popoverNode => new Popover(popoverNode))
});
</script>

<template>
  <div>
    <router-view></router-view>
  </div>


  <!-- <button ref="popoverButtonRef" type="button" class="btn btn-secondary" data-bs-container="body"
    data-bs-toggle="popover" data-bs-placement="top" data-bs-content="Top popover">
    Popover on top
  </button>

  <div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
      Dropdown button
    </button>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="#">Action</a></li>
      <li><a class="dropdown-item" href="#">Another action</a></li>
      <li><a class="dropdown-item" href="#">Something else here</a></li>
    </ul>
    <router-view></router-view>
  </div> -->
</template>

<style scoped></style>