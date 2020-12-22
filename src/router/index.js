import Vue from 'vue'
import VueRouter from "vue-router";


Vue.use(VueRouter)

//配置路由表
const routes=[
  {
    path:'/login',
    name:'login',
    component:()=>import('./../views/login')
  },
  {
    path:'/',
    component:()=>import('./../views/layout'),
    children:[
      {
        path:'',
        name:'home',
        component:()=>import('./../views/home')
      },
      {
        path:'/qa',
        name:'home',
        component:()=>import('./../views/qa')
      },
      {
        path:'/video',
        name:'home',
        component:()=>import('./../views/video')
      },
      {
        path:'/my',
        name:'home',
        component:()=>import('./../views/my')
      },
    ]
  }




]


const router=new VueRouter(
    {
      routes
    }
)
export default router






