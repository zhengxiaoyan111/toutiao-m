<template>
  <div class="my-container">
    <van-cell-group v-if="user" class="my-info">
      <van-cell  class="base-info" center
          :border="false">
        <van-image class="avatar" slot="icon"

                   round
                   fit="cover"
                   src="currentUser.photo" />
        <div slot="title" class="name">{{currentUser.name}}</div>
        <van-button size="small" round class="updata-btn">编辑资料</van-button>
      </van-cell>

      <van-grid :border="false" class="data-info">
        <van-grid-item  class="data-info-item">
          <div slot="text" class="text-wrap">
          <div class="count">{{currentUser.art_count}}</div>
          <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{currentUser.follow_count}}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{currentUser.fans_count}}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{currentUser.like_count}}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>




      </van-grid>
    </van-cell-group>


    <div  v-else class="not-login">
      <div @click="$router.push('/login')"><img src="./手机.png" alt="" class="mobile"></div>
      <div class="text">登录/注册</div>
    </div>

      <van-grid  :column-num="2" class="nav-grid mb-4">
        <van-grid-item icon-prefix="toutiao" icon='shoucang' text="收藏" class="nav-grid-item"/>
        <van-grid-item icon-prefix="toutiao" icon="lishi" text="历史" class="nav-grid-item"/>

      </van-grid>


      <van-cell title="消息通知" is-link to="/"/>
      <van-cell class="mb-4" title="小智同学" is-link to="/" />
      <van-cell
          v-if="user"
          title="退出登录"
          class="login-cell"
          @click="onLogout"
      />




  </div>
</template>

<script>
import {mapState} from 'vuex'
import {getCurrentUser} from "../../api/user";

export default {
  name: "MyIndex",
  data(){
  return {
    currentUser:{}  //当前登录用户信息
  }
  },
  created() {
  this.loadCurrentUser()
  },
  computed:{
  ...mapState(['user'])
  },
  methods:{
    async loadCurrentUser(){
      const {data}=await getCurrentUser()
        this.currentUser=data.data
  },
    onLogout(){
      //提示用户确认退出
      this.$dialog.confirm({
        title: '退出提示',
        message: '确认退出吗'
      })
          .then(() => {
            //清除用户登录状态
            this.$store.commit('setUser',null)
          })
          .catch(() => {
            // on cancel
          });
      //
    }
  }
}
</script>

<style scoped lang="less">

.my-container{
  .my-info{
    background: url("./banner.png") no-repeat;
    background-size: cover;
    .base-info{
      background-color: unset;
      height: 115px;
      box-sizing: border-box;
      padding-top:38px;
      padding-bottom: 11px;
      .avatar{
        width: 66px;
        height: 66px;
        border: 1px solid #fff;
        box-sizing: border-box;
        margin-right: 11px;
      }
      .name{
        color: white;
        font-size: 15px;
      }
      .updata-btn{
        //width: 58px;
        height: 16px;
        font-size: 10px;
        color: #666666;

      }
    }
    .data-info{

      .data-info-item{
        height: 65px;
        color: white;
        .text-wrap{
          display: flex;
          flex-direction: column;
          align-items: center;
          .count{
            font-size: 18px;
          }
          .text{
            font-size: 11px;
          }
        }
      }

    }

   /deep/ .van-grid-item__content{
      background-color: unset;
    }
  }

  .not-login{
    height: 180px;
    background: url("./banner.png") no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    .mobile{
      width: 66px;
      height: 66px;

    }
    .text{
      color: white;
      font-size: 14px;
    }
  }



  /deep/ .nav-grid{
    .nav-grid-item{
      height: 70px;
    .toutiao{
        font-size:22px;
      }
      .toutiao-shoucang{
        color: #eb5253;
      }
      .toutiao-lishi{
        color: #ff9d1d;
      }
      .van-grid-item__text{
        font-size: 14px;
        color: #333333;
      }
    }
  }
}


.login-cell{
  text-align: center;
  color: #d86262;
}
.mb-4{
  margin-bottom: 4px;
}


</style>