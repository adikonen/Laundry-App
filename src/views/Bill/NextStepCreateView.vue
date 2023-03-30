<script setup>
import { RouterLink } from 'vue-router'
import { useClothes } from '@/stores/clothes'
import { useBill } from '@/stores/bill'
import { Icon } from '@iconify/vue'
const clothesStore = useClothes()
const billStore = useBill()
// onBeforeUnmount(clothesStore.resetForm)
window.onbeforeunload = clothesStore.resetForm


function test(index) {
  console.table(billStore.form.clothes)
  console.log(billStore.form.clothes[index])
  billStore.form.clothes[index].count++
}
</script>

<template>
  <MainLayout>
    <h4 class="title">Buat Nota</h4>
    <RouterLink :to="{ name: 'bill.create' }">
      <v-btn value="Tambah Pakaian" class="full-btn" color="teal">Kembali</v-btn>
    </RouterLink>
    <v-divider></v-divider>
    <v-text-field
      type="search"
      label="Cari Pakaian"
      v-model="clothesStore.search"
      class="mt-2"
    ></v-text-field>
    <v-list lines="two">
      <template v-for="(item, index) in clothesStore.tenClothes" :key="item.clothes_id">
        <v-list-item :title="item.title" :subtitle="item.description">
          <template v-slot:append>
            <v-dialog persistent transition="dialog-top-transition" width="100%">
              <template v-slot:activator="{ props }">
                <v-btn color="teal" v-bind="props" @click="() => billStore.appendClothes(item)">
                  <Icon icon="mdi:note-plus" height="25"></Icon>
                </v-btn>
              </template>
              <template v-slot:default="{ isActive }">
                <v-card>
                  <v-toolbar color="teal" :title="'Jumlah ' + item.name"></v-toolbar>
                  <v-card-text>
                    <div class="text-h2 py-12 text-center">
                      <div class="mb-5">
                        <div>{{ billStore.form.clothes[index].count }}</div>
                        <v-btn>
                          <Icon icon="mdi:plus" height="30" @click="test(index)"></Icon>
                        </v-btn>
                        <v-btn>
                          <Icon icon="mdi:minus" height="30" @click="billStore.form.clothes[index].count--"></Icon>
                        </v-btn>
                      </div>
                      <v-slider
                        v-model="billStore.form.clothes[index].count"
                        thumb-label
                        :step="1"
                        width="100%"
                      ></v-slider>  
                    </div>
                  </v-card-text>
                  <v-card-actions class="justify-end">
                    <v-btn 
                      color="teal" 
                      value="tambah" 
                      @click="() => { 
                        isActive.value = false
                   
                      }"
                    >
                      Catat Ke Nota
                    </v-btn>
                    <v-btn 
                      variant="text" 
                      @click="isActive.value = false"
                    >
                      Batal
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
            <!-- <v-btn color="teal">
            <Icon icon="mdi-light:plus-circle" height="25"></Icon>
          </v-btn> -->
          </template>
        </v-list-item>
      </template>
    </v-list>
    <v-btn class="full-btn mt-5" color="teal" @click="billStore.storeBill()">Simpan</v-btn>
  </MainLayout>
</template>
