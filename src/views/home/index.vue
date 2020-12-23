<template>
<div class="home-container">

  <van-nav-bar class="app-nav-bar">
    <van-button slot="title" icon="search"
                class="search-btn"
                type="info" round size="small">搜索

    </van-button>
  </van-nav-bar>


  <van-tabs v-model="active" class="channel-tabs">
    <van-tab :title="channel.name"  v-for="channel in channels" :key="channel.id" >
    <article-list :channel="channel"></article-list>
    </van-tab>

  </van-tabs>


</div>
</template>

<script>
import {getUserChannels} from "../../api/user";
import ArticleList from './components/article-list'

export default {
name: "HomeIndex",
  components:{
  ArticleList
  },
  data(){
  return{
      active: 0,   //控制被激活的标签
    channels:[]
    }
  },
  created() {
  this.loadChannels()
  },
  methods:{
    async loadChannels(){
      const {data}=await getUserChannels()
      this.channels=data.data.channels
    }
  }
}
</script>

<style scoped lang="less">
.home-container{
  /deep/.van-nav-bar__title{
    max-width: none;
  }


  .search-btn{
    width: 277px;
    height: 32px;
    background:#5babfb;
    border: none;
    .van-icon{
      font-size: 16px;
    }
    .van-button__text{
      font-size: 14px;
    }
  }
  .channel-tabs{
   /deep/ .van-tab{
      border-right: 1px solid #CCCCCC;
     border-bottom: 1px solid #edeff3;
    }
    /deep/.van-tab__line{
      bottom: 20px;
      width: 15px !important;
      height: 3px;
      background: #3296fa;

    }
  }
}
</style>