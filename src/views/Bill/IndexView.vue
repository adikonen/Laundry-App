<script setup>
import { RouterLink } from 'vue-router'
import { useBill } from '@/stores/bill'
import ThreeDot from '@/components/ThreeDot.vue'

const store = useBill()

// onBeforeUnmount(store.resetForm)
window.onbeforeunload = store.resetForm
console.log(store.bills)
</script>

<template>
  <MainLayout>
    <h4 class="title">Daftar Nota</h4>
    <RouterLink :to="{ name: 'bill.create' }">
      <v-btn value="Tambah Pakaian" class="full-btn" color="teal"> Buat Nota </v-btn>
    </RouterLink>
    <v-divider></v-divider>
    <v-text-field
      type="search"
      label="Cari Nota"
      v-model="store.search"
      class="mt-2"
    ></v-text-field>
    <template v-for="item in store.bills" :key="item.bill_id">
      <v-list lines="two">
        <v-list-item :title="item.forPerson" :subtitle="item.createdAt">
          <template v-slot:append>
            <RouterLink :to="{ name: 'bill.show', params: {bill_id: item.bill_id} }">
              <v-btn color="white">Detail</v-btn>
            </RouterLink>
          </template>
        </v-list-item>
      </v-list>
    </template>
  </MainLayout>
</template>
