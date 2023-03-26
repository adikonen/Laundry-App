<script setup>
import { onBeforeUnmount, onMounted } from 'vue'
import { useClothes } from '@/stores/clothes'
import { useRoute } from 'vue-router'
const route = useRoute()
const store = useClothes()

onMounted(() => store.findClothes(route.params.clothes_id))
onBeforeUnmount(store.resetForm)
</script>

<template>
  <MainLayout>
    <v-form @submit.prevent="store.updateClothes(route.params.clothes_id)">
      <h4 class="title">Edit Jenis Pakaian</h4>
      <v-text-field
        label="Nama Pakaian"
        v-model="store.form.name"
        :rules="[(v) => !!v || 'Kolom nama diperlukan']"
        autofocus
      ></v-text-field>
      <v-text-field
        label="Khusus Untuk (Tidak wajib)"
        v-model="store.form.forPerson"
      ></v-text-field>
      <div class="dual-input">
        <v-text-field label="Harga (ribu)" type="number" v-model="store.form.cost"></v-text-field>
        <v-text-field label="Perpcs" type="number" v-model="store.form.perPcs"></v-text-field>
      </div>
      <v-radio-group inline label="Jenis Orderan" v-model="store.form.type">
        <v-radio name="active" label="Laundry" :value="1" color="teal"></v-radio>
        <v-radio name="active" label="Setrikaan" :value="2" color="teal"></v-radio>
      </v-radio-group>
      <v-btn
        value="Ubah Pakaian"
        class="full-btn"
        color="teal"
        @click="store.updateClothes(route.params.clothes_id)"
      >
        Ubah Pakian
      </v-btn>
    </v-form>
  </MainLayout>
</template>
