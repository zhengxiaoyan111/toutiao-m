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

    <div slot="nav-right" class="wap-nav-placeholder"></div>
    <div slot="nav-right" @click="isChannelEditShow=true" class="wap-nav-wrap">
        <van-icon name="wap-nav"></van-icon>
    </div>

  </van-tabs>


  <van-popup v-model="isChannelEditShow" position="bottom"
             class="channel-edit-popup"
             closeable
             close-icon-position="top-left"
             get-container="body"
             style="height: 100%"
             >

    <channel-edit :user-channels="channels" :active="active"
    @close="isChannelEditShow=false"
    @update-active="active = $event"></channel-edit>



  </van-popup>
</div>
</template>

<script>
import {getUserChannels} from "../../api/user";
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'

export default {
name: "HomeIndex",
  components:{
  ArticleList,
    ChannelEdit
  },
  data(){
  return{
      active: 0,   //控制被激活的标签
    channels:[],
    isChannelEditShow:true  //控制编辑频道的显示状态
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
  },
  onUpdateActive(index){
  this.active=index
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
  .wap-nav-placeholder{
    width: 33px;
    flex-shrink: 0;
  }

  .wap-nav-wrap{
    height: 43px;
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    opacity: .9;
    //position: relative;
    .van-icon{
      font-size: 22px;
    }
    &:before{
      content: '';
      width: 1px;
      height: 29px;
      background: url("line.png") no-repeat;
      background-size: contain;
      left: 0;
      top: 0;
    }
  }
}
</style>