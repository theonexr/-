<template>
  <div id="app">
    <router-view />
    <van-tabbar route active-color="#c35559" v-if="isShow">
      <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/topic" icon="search">专题</van-tabbar-item>
      <van-tabbar-item replace to="/category" icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item replace to="/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item replace to="/mine" icon="friends-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data(){
    return{
      isShow:true,
    }
  },
  watch:{
    $route(to,from){
      console.log(to)
      var arr= ['/home','/topic','/category','/cart','/mine']
      if(arr.includes(to.path)){
        this.isShow=true
      }else{
        this.isShow=false
      }
    }
  },
  created(){
     var userInfo = {

      "openId":"18355004716",

      "nickName":"许锐",

      "avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIbWFEIJj8IpGeHM7dGic1aTFZALjWcMm9ltWfFiaQfVRYticWBfgGfzXWMt2EkJWiaicPtftHAlWxUibxQ/132"

    };

    var openId = userInfo.openId;

    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    localStorage.setItem("openId", openId);


  }
}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
