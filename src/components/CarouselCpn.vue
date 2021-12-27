<template>
  <div class="container">
    <el-carousel :interval="3000" :arrow="true" :autoplay="true">
      <el-carousel-item v-for="(item, index) in imagesArr" :key="index">
        <img :src="item.img" alt="" />
        <div class="carousel-caption">
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup>
const imagesArr = [
  {
    img: 'https://img.yzcdn.cn/vant/apple-1.jpg',
    title: 'Apple',
    desc: 'New Arrivals',
  },
  {
    img: 'https://img.yzcdn.cn/vant/apple-2.jpg',
    title: 'Apple',
    desc: 'New Arrivals',
  },
  {
    img: 'https://img.yzcdn.cn/vant/apple-3.jpg',
    title: 'Apple',
    desc: 'New Arrivals',
  },
  {
    img: 'https://img.yzcdn.cn/vant/apple-4.jpg',
    title: 'Apple',
    desc: 'New Arrivals',
  },
  {
    img: 'https://img.yzcdn.cn/vant/apple-5.jpg',
    title: 'Apple',
    desc: 'New Arrivals',
  },
];
</script>

<style lang="less" scoped>
.container {
  position: relative;
  height: 200px;
  width: 100%;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
