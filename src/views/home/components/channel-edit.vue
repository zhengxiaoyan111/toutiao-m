<template>
  <div class="channel-edit">
    <van-cell center :border="false">
      <div slot="title" class="channel-title">我的频道</div>
      <van-button type="danger" plain round size="mini"
      @click="isEdit=!isEdit"
      >{{isEdit ?'完成' :'编辑'}}</van-button>
    </van-cell>

    <van-grid :gutter="10">
      <van-grid-item v-for="(channel,index) in userChannels"
                     class="grid-item"
                      :class="{active:index===active}"
                     :key="index"
                     :icon="(isEdit&&index!==0)?'clear':''"
                     :text="channel.name"
                     @click="onUserChannelClick(channel,index)"
      />
    </van-grid>


    <van-cell center :border="false">
      <div slot="title" class="channel-title">频道推荐</div>
<!--      <van-button type="danger" plain round size="mini">编辑</van-button>-->
    </van-cell>

    <van-grid :gutter="10">
      <van-grid-item v-for="(channel, index) in userChannels" class="grid-item"
                     :key="index"
                     icon="clear"
                     :text="channel.name"
                     @click="onAdd(channel)"
      />
    </van-grid>

  </div>
</template>

<script>
import {getAllChannel,addUserChannel ,deleteUserChannel} from './../../../api/channel'
import {setItem} from "../../../utils/storage";
export default {
name: "ChannelEdit",
  props:{
    userChannels:{
      type:Array,
      required:true
    },
    active:{
      type:Number,
      required:true
    }
  },
  data(){
    return{
      allChannels:[],
      isEdit:false
    }
  },
  computed:{
  //推荐频道列表:所有频道-我的频道
  recommendChannels(){

    return this.allChannels.filter(channel=>{
    return !this.userChannels.find(userChannel=>{
        return userChannel.id===channel.id
      })

    })
  }
  },

  created() {
  this.loadAllChannels()
  },
  methods:{
    async loadAllChannels () {
      const { data } = await getAllChannel()
      this.allChannels = data.data.channels
    },
    async onAdd(channel){
      this.userChannels.push(channel)
      //频道数据持久化
      if(this.user){
        await addUserChannel({
          channels:[{
            id:channel.id,
            seq:this.userChannels.length
          }]
        })
      }else {
        setItem('user-channle',this.userChannels)
      }
    },
    onUserChannelClick(channel,index){
      //编辑状态,删除频道
      if(this.isEdit&&index!==0){
        this.deleteChannel(channel,index)
      }else {
        //非编辑状态,切换频道
        this.switchChannel(index)
      }

    },
    async deleteChannel(channel,index){
      if(index<=this.active){
        this.$emit('update-active',this.active-1)
      }
      this.userChannels.splice(index,1)

      if(this.user){
        await deleteUserChannel(channel.id)
      }else{
        setItem('user-channls',this.userChannels)
      }


    },
    switchChannel(index){
      this.$emit('close')  //发送关闭弹出层事件
      this.$emit('update-active',index)
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit{
  padding-top: 54px;
  .channel-title{
    font-size: 16px;
    color: #333333;

  }
  .grid-item{
    width: 80px;
    height: 43px;
    /deep/ .van-grid-item__content{

    background-color: #f4f5f6;
      .van-grid-item__text{
        font-size: 14px;
        color: #222222;
        margin-top: 0;
      }
     .van-grid-item__icon{
       position: absolute;
       right: -5px;
       top: -5px;
       font-size: 20px;
       color: #CCCCCC;
     }
    }
  }
  .active{
   /deep/ .van-grid-item__text{
      color: red;

    }
  }
}
</style>