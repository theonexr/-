import  request  from "../request.js";


function goodsList(data){
   return request({
        method:'get',
        url:'http://shop.bufantec.com/bufan/goods/goodsList',
        params:data
    })
}

export{
    goodsList
}