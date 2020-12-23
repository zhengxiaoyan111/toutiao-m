<template>
 <div class="article-list">

   <van-pull-refresh v-model="isRefreshLoading"
                     @refresh="onRefresh"
                     :success-text="refreshSuccessText"
                     :success-duration="1500"
   >

   <van-list
       v-model="loading"
       :finished="finished"
       finished-text="没有更多了"
       @load="onLoad"
   >
     <article-item v-for="(article,index) in articles" :key="index" :article="article"></article-item>



<!--     <van-cell v-for="(article,index) in articles" :key="index" :title="article.title" />-->
   </van-list>

   </van-pull-refresh>

 </div>

</template>

<script>
import {getArticle} from "../../../api/article";
import ArticleItem from "../../../components/article-item/index"

export default {
name: "ArticleList",
  components:{
    ArticleItem
  }
  ,
  props:{
  channel:{
    type:Object,
    required:true,

  }
  },
  data() {
    return {
      articles: [],
      loading: false,
      finished: false,
      timestamp:null ,//获取下一页数据的时间戳
      isRefreshLoading:false,
      refreshSuccessText:''
    }
  },
  methods: {
    async onLoad () {
     //请求获取数据
      const {data}=await getArticle({
        channel_id:this.channel.id,   //频道ID
        timestamp:this.timestamp||Date.now(),            //时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
            with_top: 1                //是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含

      })
      const {results}=data.data
      //把数据放到数组中
      this.articles.push(...results)
      //设置本次加载状态结束,它才可以判断是否需要加载一次,否则会永远停在这里
      this.loading=false

      //数据加载完成
      if(results.length){
        this.timestamp=data.data.pre_timestamp
      }else{
          this.finished=true
      }
    },

    async onRefresh(){
      //下拉刷新,组件自己就会展示loading状态
      //1.请求数据
      const {data}=await getArticle({
        channel_id:this.channel.id,
        timestamp:Date.now(),
        with_top: 1

      })
      const {results}=data.data

      //2.把数据放到列表中(追加到顶部)
      this.articles.unshift(...data.data.results)
      //3.关闭刷新壮心 loading
      this.isRefreshLoading=false
      this.refreshSuccessText=`更新了${results.length}条数据`

    }
  }
}
</script>

<style scoped lang="less">
.article-list{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  top: 90px;
  overflow-y: auto;
}
</style>