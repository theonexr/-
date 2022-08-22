<template>
  <div class="topic">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="onLoad"
    >
      <ul>
        <li v-for="item in list" :key="item.id">
          <img class="pic" :src="item.scene_pic_url" alt="" />
          <h2>
            {{ item.title }}
          </h2>
          <p>{{item.subtitle}}</p>
          <p style="color:red;font-size:15px;">¥{{item.price_info}}元起</p>
        </li>
      </ul>
    </van-list>
  </div>
</template>

<script>
import { listaction } from "@/api/topic/index.js";
export default {
  data() {
    return {
      info: {},
      loading: false,
      finished: false,
      list:[],
      start:1
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      listaction({
        page: this.start,
      }).then((res) => {
        
        // this.info = res;
        this.list.push(...res.data)
        console.log(this.list);
        this.loading =false
        if(this.start >= res.total){
          this.finished = true
        } 
      });
    },
    onLoad() {
      this.start++
      this.init()      
    },
  },
};
</script>

<style lang="less" scoped>
.topic {
  padding-bottom: 50px;
  .pic {
    width: 100%;
  }
}
</style>