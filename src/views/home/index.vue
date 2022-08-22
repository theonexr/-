<template>
  <div class="header">
    <van-search
      :label="city"
      placeholder="搜索商品"
      disabled
      @click="goSearch"
    />
    <button class="position" @click="LookMap"></button>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in homeinfo.banner" :key="item.id">
        <img :src="item.image_url" alt="" />
      </van-swipe-item>
    </van-swipe>
    <router-link to="newsgoty/1" tag="button">新品首发</router-link>
    <router-link to="newsgoty/2" tag="button">人气推荐</router-link>
    <div v-html="text"></div>
  </div>
</template>

<script>
import { index } from "@/api/home/index.js";

export default {
  data() {
    return {
      homeinfo: {},
      text: "<div><p>123</p></div>",
      city: "",
    };
  },
  created() {
    // axios({
    //   method: "get",
    //   url: "http://shop.bufantec.com/bufan/index/index",
    // }).then((res) => {
    //   console.log(res);
    //   this.homeinfo = res.data;
    // });
    index().then((res) => {
      console.log(res);
      this.homeinfo = res;
    });
  },
  mounted() {
    // 2.
    //     AMap.plugin('AMap.Geolocation', function() {
    //   var geolocation = new AMap.Geolocation({
    //     // 是否使用高精度定位，默认：true
    //     enableHighAccuracy: true,
    //     // 设置定位超时时间，默认：无穷大
    //     timeout: 10000,
    //     // 定位按钮的停靠位置的偏移量
    //     offset: [10, 20],
    //     //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
    //     zoomToAccuracy: true,
    //     //  定位按钮的排放位置,  RB表示右下
    //     position: 'RB'
    //   })

    //   geolocation.getCurrentPosition(function(status,result){
    //         if(status=='complete'){
    //             onComplete(result)
    //         }else{
    //             onError(result)
    //         }
    //   });

    //   function onComplete (data) {
    //     // data是具体的定位信息
    //   }

    //   function onError (data) {
    //     // 定位出错
    //   }
    // })
    // 3.
    var _this = this;
    if(this.$store.state.cityInfo.name){
      _this.city = this.$store.state.cityInfo.name
      return
    }
    AMap.plugin("AMap.CitySearch", function () {
      var citySearch = new AMap.CitySearch();
      citySearch.getLocalCity(function (status, result) {
        if (status === "complete" && result.info === "OK") {
          // 查询成功，result即为当前所在城市信息
          console.log(result);
          _this.city = result.city;
          // console.log(_this.city);
        }
      });
    });
  },
  methods: {
    goSearch() {
      this.$router.push("/search");
    },
    LookMap() {
      this.$router.push("/map");
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  position: relative;
  img {
    width: 100%;
  }
  ::v-deep .van-swipe__indicator {
    background-color: red;
  }
  .position {
    position: absolute;
    z-index: 10;
    left: 20px;
    top: 15px;
    border: 1px solid transparent;
    background-color: transparent;
    width: 50px;
    height: 20px;
  }
}
</style>