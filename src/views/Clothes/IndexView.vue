<script setup>
import { RouterLink } from 'vue-router'
import { useClothes } from '@/stores/clothes';

const store = useClothes()
console.log(store.clothes)
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
    <v-list-item
      v-for="item in store.clothes"
      :key="item.title"
      :title="item.title"
      :subtitle="item.description"
      bg-color="red"
    ></v-list-item>
  </v-list>
</template>

<style scoped>

</style>