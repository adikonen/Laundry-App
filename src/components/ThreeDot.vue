<script setup>
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
const open = ref(false)
const prop = defineProps(['edit_link'])
const emit = defineEmits(['handle-delete'])
</script>

<template>
  <div class="wrapper">
    <button @click="open = !open">
      <Icon icon="mdi:dots-vertical" height="30"></Icon>
    </button>  
    <div class="dots-card" v-show="open">
      <RouterLink :to="edit_link">
      <p>
         Edit
        </p>
      </RouterLink>
      <p @click="$emit('handle-delete')">
        Hapus
      </p>
    </div>
  </div>
</template>

<style scoped>
  button {
    padding:0.4rem;
  }
  .wrapper {
    position: relative;
  }
  .dots-card {
    text-align: left;
    padding:0.5rem 1rem;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    position:absolute;
    z-index: 10000000;
    top:0;
    left:-3.8rem;
    background-color: white;
    margin-bottom:5rem
  }
</style>
