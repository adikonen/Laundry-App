<script setup>
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
</script>

<template>
  <v-app>
    <v-app-bar :elevation="5" color="teal">
      <v-app-bar-nav-icon>
        <Icon height="30" icon="mdi:zodiac-cancer" />
      </v-app-bar-nav-icon>
      <v-app-bar-title>Ida Laundry</v-app-bar-title>
    </v-app-bar>
    <div class="router-view-wrapper">
      <!-- <RouterView></RouterView> -->
      <slot></slot>
    </div>
    <div class="space"></div>
    <v-bottom-navigation bg-color="white" grow>
      <v-btn value="recent">
        <Icon icon="mdi-light:face-mask" height="30"></Icon>
        <RouterLink :to="{ name: 'clothes.index' }"> Pakaian </RouterLink>
      </v-btn>
      <v-btn value="favorites">
        <Icon icon="mdi-light:note-plus" height="30"></Icon>
        <RouterLink :to="{ name: 'bill.index' }"> Nota </RouterLink>
      </v-btn>

      <v-btn value="history">
        <Icon icon="mdi-light:alarm" height="30"></Icon>
        History
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<style scoped>
.space {
  margin: 4rem 0;
}
</style>
