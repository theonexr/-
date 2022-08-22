import  request  from "../request.js";


function index(){
   return request({
        method:'get',
        url:'http://shop.bufantec.com/bufan/index/index'
    })
}

export{
    index
}