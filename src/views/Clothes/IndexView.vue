<script setup>
import { RouterLink } from 'vue-router'
import { useClothes } from '@/stores/clothes';
import ThreeDot from '../../components/ThreeDot.vue';
const store = useClothes()
console.table(store.clothes.map(item => ({clothes_id: item.clothes_id})))
</script>

<template>
  <h4 class="title">Daftar Pakian</h4>
  <RouterLink :to="{name: 'clothes.create'}">
    <v-btn value="Tambah Pakaian" class="full-btn" color="teal">
      Tambah Pakian
    </v-btn>
  </RouterLink>
  <v-divider></v-divider>
  <v-list lines="two">
    <template 
    v-for="(item, index) in store.clothes"
    :key="item.clothes_id"
    >
    <v-list-item  
    :title="item.title"
    :subtitle="item.description"
    bg-color="red"
    >
      <template v-slot:append>
          <ThreeDot @handle-delete="() => store.deleteClothes(item.clothes_id)" :edit_link="{name: 'clothes.edit', params: {clothes_id: item.clothes_id}}"></ThreeDot>
        </template>
      </v-list-item>
    </template>
  </v-list>
</template>

<style scoped>

</style>