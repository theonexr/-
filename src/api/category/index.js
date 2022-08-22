import  request  from "../request.js";


function indexaction(){
   return request({
        method:'get',
        url:'http://shop.bufantec.com/bufan/category/indexaction'
    })
}
function currentaction(data){
    return request({
         method:'get',
         url:'http://shop.bufantec.com/bufan/category/currentaction',
         params:data
     })
 }

export{
    indexaction,
    currentaction
}