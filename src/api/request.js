import  axios  from "axios";
import { Toast } from 'vant';

var host;

// process.env是Node.js提供的一个API，它返回一个包含用户环境信息的对象
// 通过NODE_ENV判断当前环境是生产环境（productin）还是开发环境（development）自动切换不同的域名
// 暂时开发环境和生产环境域名一样
if(process.env.NODE_ENV== "development"){
    host="http://shop.bufantec.com/bufan"
}else{
    host="http://shop.bufantec.com/bufan"
}
// 实例
var instance = axios.create({
    // 基础地址
    baseURL:host,
    // 超过5s断开请求
    timeout:5*1000
})

// 请求拦截器
var loading;
// 发送请求前执行处理
instance.interceptors.request.use(config =>{
    // qs处理post的参数

    // 开启加载loading...
    // loading=loading.service({
    //     lock:true,
    //     text:'努力加载中...',
    //     spinner:'el-icon-loading',
    //     backdround:'rgba(0,0,0,.7)'
    // })
   loading= Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration:0
      });
    return config;
},err=>{
    return Promise.reject(err)
})

// 响应拦截器
instance.interceptors.response.use(response=> {
    loading.clear()
    return response.data;
  }, error=>{
    loading.clear()
    return Promise.reject(error);
  });

  export default instance