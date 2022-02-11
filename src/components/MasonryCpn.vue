<template>
  <template v-for="item in data" :key="item.id">
    <masonry-item
      :comment="item.comment"
      :date="item.date"
      :address="item.address"
      :nickName="item.nickname"
      :index="index"
    />
  </template>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

import MasonryItem from './MasonryItem.vue';

import { getItems } from '@/api';

export default defineComponent({
  components: {
    MasonryItem,
  },
  setup() {
    let data = ref([]);

    onMounted(() => {
      getDate();
    });

    const getDate = () => {
      getItems().then((res) => {
        data.value = res.data;
      });
      console.log(data);
    };

    return { data, getDate };
  },
});
</script>

<style scoped>
.el-card {
  margin: 20px;
}
</style>
