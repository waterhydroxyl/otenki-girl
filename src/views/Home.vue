<template>
  <div class="home">
    <WeatherMap />
    <!-- <CarouselCpn /> -->
    <div class="bg">
      <wish-card @newpost="newpost" />
      <masonry-cpn ref="masRef" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import WeatherMap from '@/components/WeatherMap.vue'; // @ is an alias to /src
// import CarouselCpn from '@/components/CarouselCpn.vue';
import WishCard from '@/components/WishCard.vue';
import MasonryCpn from '@/components/MasonryCpn.vue';

export default defineComponent({
  name: 'Home',
  components: {
    WeatherMap,
    // CarouselCpn,
    WishCard,
    MasonryCpn,
  },
  setup() {
    const masRef = ref<InstanceType<typeof MasonryCpn>>();
    // onMounted(()=>{

    // })
    const newpost = () => {
      masRef.value?.getDate();
    };
    return { newpost, masRef };
  },
});
</script>
<style scoped>
.bg {
  background: url(../assets/bg.jpeg) center center no-repeat;
  background-size: 100% auto;
  padding: 5.86667vw 6vw 5.6vw;
}
</style>
