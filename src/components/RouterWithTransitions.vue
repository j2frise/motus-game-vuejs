<template>
  <router-view v-slot="{ Component, route }">
    <transition
      appear
      mode="out-in"
      :enter-active-class="
        'animated ' + route.meta.transition?.enterActiveClass || ''
      "
      :leave-active-class="
        'animated ' + route.meta.transition?.leaveActiveClass || ''
      ">
      <component
        :is="Component"
        :key="route.path" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router';
</script>
