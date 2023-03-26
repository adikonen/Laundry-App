<script setup>
import { RouterLink } from 'vue-router'
import { useBill } from '@/stores/bill'
import ThreeDot from '@/components/ThreeDot.vue'

const store = useBill()

// onBeforeUnmount(store.resetForm)
window.onbeforeunload = store.resetForm
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
    <v-list lines="two">
      <!-- <template v-for="item in store.bill" :key="item.bill_id">
        <v-list-item :title="item.title" :subtitle="item.description">
          <template v-slot:append>
            <ThreeDot
              @handle-delete="() => store.deleteBill(item.bill_id)"
              :edit_link="{ name: 'bill.edit', params: { bill_id: item.bill_id } }"
            ></ThreeDot>
          </template>
        </v-list-item>
      </template> -->
    </v-list>
  </MainLayout>
</template>
