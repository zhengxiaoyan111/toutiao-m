//文章模块网络请求
import request from "../utils/request";
//获取文章列表
export const getArticle=params=>{
  return request ({
    method:'GET',
    url:'/app/v1_1/articles',
    params
  })
}









