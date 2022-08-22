<template>
  <div class="back">
    <van-nav-bar
      title="不凡"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <form action="/">
      <van-search
        v-model.trim="iptVal"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <div class="defult" v-if="current == 'default'">
      <div>
        <div class="historyBox">
          <span>历史记录</span>
          <van-icon name="delete-o" />
          <div
            class="Box"
            v-for="item in searchInfo.historyData"
            :key="item.id"
          >
            {{ item.keyword }}
          </div>
        </div>
      </div>
      <div class="floatBox">
        <div class="hotKeywordBox">
          <span>热门搜索</span>
          <div
            class="Box"
            v-for="item in searchInfo.hotKeywordList"
            :key="item.id"
          >
            {{ item.keyword }}
          </div>
        </div>
      </div>
    </div>
    <div class="notice" v-else-if="current == 'notice'">
      <ul>
        <li class="showGoods" v-for="item in noticeList" :key="item.id" @click="showGoods(item.name)">
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="goods" v-else>
      <div>
        <p>综合</p>
        <p>价格</p>
        <p>分类</p>
      </div>
      <ul>
        <li v-for="item in goodList" :key="item.id">
          <img  :src="item.list_pic_url" alt="">
          <p>{{item.name}}</p>
          <span>¥{{item.retail_price}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { indexaction, helperaction,addhistoryaction } from "@/api/home/search.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      iptVal: "",
      searchInfo: {},
      current: "default", //defult notice goods
      noticeList: [],
      goodList:[]
    };
  },
  watch: {
    iptVal() {
      if (this.iptVal) {
        this.current = "notice";
        helperaction({
          keyword: this.iptVal,
          order: "",
        }).then((res) => {
          console.log(res);
          this.noticeList = res.keywords;
        });
      } else {
        this.current = "default";
      }
    },
  },
  async created() {
    var res = await indexaction({
      openId: localStorage.getItem("openId"),
    });

    console.log(res);
    this.searchInfo = res;
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onSearch(val) {
      Toast(val);
    },
    onCancel() {},
    showGoods(val) {
      this.current = "goods";
      addhistoryaction({
        keyword:val,
        openId:localStorage.getItem('openId')
      })
      helperaction({
        keyword: val,
        order: "",
      }).then((res) => {
        this.goodList = res.keywords;
        console.log(res);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.back {
  background-color: rgb(244, 244, 244);
  height: 100%;
}
.historyBox,
.hotKeywordBox {
  position: relative;
  width: 100%;
  height: 160px;
  background-color: rgb(255, 255, 255);
  top: 10px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  overflow: hidden;
  span {
    position: absolute;
    top: 5px;
    left: 15px;
    font-size: 15px;
  }
  .van-icon {
    position: absolute;
    top: 5px;
    right: 15px;
    font-size: 16px;
  }
  .Box {
    position: relative;
    top: 35px;
    height: 30px;
    font-size: 14px;
    line-height: 30px;
    font-weight: 800;
    padding: 0 4px;
    margin: 0 13px;
    border: 1px solid #a7a7a7;
  }
}
.hotKeywordBox {
  position: relative;
  top: 20px;
}
.showGoods {
  font-size: 20px;
  background-color: #fff;
  margin: 4px;
  margin-left: 23px;
  text-align: left;
  padding: 8px 0;
  position: relative;
}
.goods div{
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  font-size: 14px;
}
.goods ul li {
  list-style: none;
  width: 49%;
  height: 280px;
  text-align: center;
  background-color: #fff;
  img{
    width: 100%;
  }
  p{
    font-size: 15px;
  }
  span{
    color: rgb(139,72,71);
    font-size: 17px;
  }
}
</style>