<script setup>
import { useBill } from '@/stores/bill'
const store = useBill()

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
        <v-btn @click="store.handleFirstStep()" value="Tambah Pakaian" class="full-btn mt-3" color="teal"> Selanjutnya </v-btn>
      </RouterLink>
    </v-form>
  </MainLayout>
</template>
