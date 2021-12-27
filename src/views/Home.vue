<template>
  <div class="home">
    <WeatherMap />
    <!-- <CarouselCpn /> -->
    <wish-card />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WeatherMap from '@/components/WeatherMap.vue'; // @ is an alias to /src
// import CarouselCpn from '@/components/CarouselCpn.vue';
import WishCard from '@/components/WishCard.vue';

export default defineComponent({
  name: 'Home',
  components: {
    WeatherMap,
    // CarouselCpn,
    WishCard,
  },
});
</script>
