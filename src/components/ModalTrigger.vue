<script setup>
import { ref } from 'vue'
const open = ref(false)
const props = defineProps(['color', ''])
</script>

<template @click="open = false">
  <Teleport to="body">
    <v-btn color="primary" @click="open = true">Trigger</v-btn>
    <div v-show="open" class="modal">
      <p>Hello from the modal!</p>
      <button @click="open = false">Close</button>
    </div>
  </Teleport>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}
</style>
