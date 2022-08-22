import  request  from "../request.js";


function indexaction(data){
   return request({
        method:'get',
        url:'http://shop.bufantec.com/bufan/search/indexaction',
        params:data,
    })
}
function helperaction(data){
    return request({
         method:'get',
         url:'http://shop.bufantec.com/bufan/search/helperaction',
         params:data,
     })
 }
 function addhistoryaction(data){
    return request({
         method:'post',
         url:'http://shop.bufantec.com/bufan/search/addhistoryaction',
         data,
     })
 }

export{
    indexaction,
    helperaction,
    addhistoryaction
}