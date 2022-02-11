<template>
  <el-card class="box-card">
    <template #header>
      <div class="box-header">
        <span>{{ nickName }}</span>
        <div>
          <span>{{ date }}</span>
          <span>{{ address }}</span>
        </div>
      </div>
    </template>
    <!-- <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div> -->
    <span class="comment">{{ comment }}</span>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// import YlCard from '@/base-ui/card';

export default defineComponent({
  // components: {
  //   YlCard,
  // },
  props: {
    date: String,
    comment: String,
    nickName: String,
    address: String,
    index: Number,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped lang="less">
.el-card {
  &:deep(.el-card__header) {
    padding: 4px 4px !important;
  }
  &:deep(.el-card__body) {
    padding: 4px 12px;
  }
  .box-header {
    font-size: 14px;
    padding: 2px 8px;
    display: flex;
    justify-content: space-between;
  }
}
.comment {
  font-size: 17px;
}
</style>
