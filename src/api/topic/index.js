import  request  from "../request.js";


function listaction(data){
   return request({
        method:'get',
        url:'http://shop.bufantec.com/bufan/topic/listaction',
        params:data
    })
}

export{
    listaction
}