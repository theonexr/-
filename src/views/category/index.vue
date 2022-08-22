<template>
  <div>
    <van-search :placeholder="'商品搜索，共' + 5 + '款好物'" />
    <van-sidebar 
    v-model="activeKey" 
    >
       <!-- v-for="item in list" 
    :key="item.id" -->
      <van-sidebar-item title="居家" />
      <van-sidebar-item title="餐厨" />
      <van-sidebar-item title="饮食" />
      <van-sidebar-item title="配件" />
      <van-sidebar-item title="服装" />
      <van-sidebar-item title="变量" />
      <van-sidebar-item title="杂货" />
      <van-sidebar-item title="洗护" />
      <van-sidebar-item title="志趣" />
    </van-sidebar>
  </div>
</template>

<script>
import { indexaction, currentaction } from "@/api/category/index.js";
export default {
  data() {
    return {
      activeKey: 0,
      iptVal: "",
      list: [],
      currentIndex:1
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      indexaction()
      .then((res) => {
        console.log(res);
        this.list = res.categoryList;
      });
      currentaction({
        id:this.list[this.currentIndex]
      })
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.van-field__control {
  text-align: center;
  background-color: rgb(238, 238, 238);
}
</style>