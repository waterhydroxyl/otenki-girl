<template>
  <el-card>
    <div class="price"><h3>¥ 3,400</h3></div>
    <div class="des">因为下雨而困扰的你，100%的晴天女孩会为你带来阳光😄无论在什么地方...</div>
    <div class="form">
      <el-form :inline="true" :model="form" label-width="120px" label-position="top">
        <div class="submit">
          <el-button type="danger" round @click="onSubmit"
            >Upload<el-icon class="el-icon--right"><Upload /></el-icon
          ></el-button>
        </div>
        <el-form-item label="日期">
          <!-- <el-col :span="11"> -->
          <el-date-picker
            v-model="form.date"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="选择日期"
            style="width: 100%"
          ></el-date-picker>
          <!-- </el-col> -->
        </el-form-item>

        <el-form-item label="昵称">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>

        <el-form-item label="地址" class="pick-adress">
          <el-input v-model="form.address"></el-input>
        </el-form-item>

        <el-form-item label="留言" class="pick-adress">
          <el-input v-model="form.comment" type="textarea"></el-input>
        </el-form-item>
        <!-- <el-form-item class="pick-adress"> -->
        <!-- </el-form-item> -->
      </el-form>
    </div>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

import { postNewItem } from '@/api';

export default defineComponent({
  setup(props, { emit }) {
    const form = reactive({
      date: '',
      address: '',
      nickname: '',
      comment: '',
    });

    const onSubmit = () => {
      postNewItem(form).then((res) => {
        if (res.status === 200) {
          emit('newpost');
        }
      });
    };
    return {
      form,
      onSubmit,
    };
  },
});
</script>

<style scoped lang="less">
.el-card {
  margin: 20px;
  ::v-deep .el-card__body {
    padding-right: 0;
  }
}
.price {
  color: red;
  letter-spacing: 2px;
  h3 {
    margin: 4px;
  }
}
.des {
  display: -webkit-box;
  margin-right: 10px;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.el-form {
  .submit {
    width: 100%;
    text-align: center;
    margin: 10px;
  }
  .el-form-item {
    width: 45%;
    margin-bottom: 0px;
    &.pick-adress {
      width: 100%;
      padding-right: 8px;
    }
    ::v-deep .el-input__inner {
      padding-right: 0px;
    }

    ::v-deep span.el-input__prefix {
      padding: 12px 0 0 0;
    }
  }
  ::v-deep .el-form-item__label {
    display: block;
    text-align: left;
    padding: 0 !important;
    line-height: 20px;
  }
  ::v-deep .el-input__inner {
    height: 30px;
  }
}
</style>
