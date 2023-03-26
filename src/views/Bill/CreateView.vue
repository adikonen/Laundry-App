<script setup>
import { useClothes } from '@/stores/clothes'
const store = useClothes()

// onBeforeUnmount(store.resetForm)
</script>

<template>
  <MainLayout>
    <v-form @submit.prevent="store.storeBill">
      <h4 class="title">Buat Nota</h4>
      <v-text-field
        label="Kepada"
        v-model="store.form.forPerson"
        :rules="[(v) => !!v || 'Kolom nama diperlukan']"
        autofocus
      ></v-text-field>
      <RouterLink :to="{ name: 'bill.nextstep-create' }">
        <v-btn value="Tambah Pakaian" class="full-btn" color="teal"> Selanjutnya </v-btn>
      </RouterLink>
    </v-form>
  </MainLayout>
</template>
