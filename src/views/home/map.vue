<template>
  <div class="map">
    <van-nav-bar
      title="不凡"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <input type="text" v-model="iptVal" placeholder="搜索" />
    <ul>
      <li @click="goHome(item)" v-for="item in searchList" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
    <p>显示当前位置：</p>
    <div id="container"></div>
  </div>
</template>

<script>
import { mapstate, mapMutations, mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      iptVal: "",
      city: "",
      searchList: "",
    };
  },
  watch: {
    iptVal() {
      var _this = this;
      // JSAPI 2.0 输入提示插件名称由 AMap.Autocomplete 变更为 AMap.AutoComplete 啦！
      AMap.plugin("AMap.AutoComplete", function () {
        var autoOptions = {
          //city 限定城市，默认全国
          city: _this.city,
        };
        // 实例化AutoComplete
        var autoComplete = new AMap.AutoComplete(autoOptions);
        // 根据关键字进行搜索
        autoComplete.search(_this.iptVal, function (status, result) {
          // 搜索成功时，result即是对应的匹配数据
          console.log(result);
          _this.searchList = result.tips;
        });
      });
    },
  },
  mounted() {
    // vuex中有数据，那么地图中展示的应为首页传递的数据
    var _this = this;
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
    // 渲染百度地图
    if (this.$store.state.cityInfo.name) {
      var cityInfo = this.$store.state.cityInfo;
      var map = new AMap.Map("container", {
        zoom: 18, //级别
        center: [cityInfo.location.lng, cityInfo.location.lat], //中心点坐标
        //   viewMode: "3D", //使用3D视图
      });
      var marker = new AMap.Marker({
        position: [116.39, 39.9], //位置
      });
      return;
    }
    var map = new AMap.Map("container", {
      zoom: 15, //级别
    });
  },
  methods: {
    goHome(val) {
      this.addCityInfo(val);
      this.$router.push("/home");
      console.log(333);
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    ...mapMutations({
      addCityInfo: "uptCityInfo",
    }),
  },
};
</script>

<style lang="less" scoped>
.map {
  #container {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 400px;
  }
  input {
    position: relative;
    top: 20px;
    width: 90%;
    height: 40px;
    font-size: 15px;
  }
  p{
    position: absolute;
    bottom: 400px;
    left: 5px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: 17px;
    font-weight: 1000;
  }
}
.map ul li {
  font-size: 15px;
  background-color: #fff;
  margin: 4px;
  margin-left: 20px;
  text-align: left;
  padding: 4px 0;
  position: relative;
  top: 18px;
}
</style>