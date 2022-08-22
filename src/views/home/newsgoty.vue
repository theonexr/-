<template>
  <div class="newsgoty">
        <van-nav-bar
      title="不凡"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <img src="../../assets/cb1c3ef50e22b6096fde67febe863494caefebad.png@2560w_400h_100q_1o.webp" alt="">
      <div class="goods">
        <p>综合</p>
        <p>价格</p>
        <p>分类</p>
      </div>
    <van-grid :column-num="2">
      <van-grid-item v-for="item in list" :key="item.id">
        <img class="pic" :src="item.list_pic_url" alt="" />
        <h2>
          {{ item.name }}
        </h2>
        ¥{{ item.retail_price }}
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { goodsList } from "@/api/home/newsgoty.js";
export default {
  data() {
    return {
      list: [],
    };
  },
  created() {
    console.log(this.$route.params.id);
    var id = this.$route.params.id;
    goodsList({
      isHot: id == 2 ? 1 : "",
      isNew: id == 1 ? 1 : "",
      order: "",
    }).then((res) => {
      console.log(res);
      this.list = res.data;
    });
  },
  methods:{
        onClickLeft() {
      this.$router.go(-1);
    },
  }
};
</script>

<style lang="less" scoped>
@import '../../assets/style/newsgoty.less';
</style>