<template>
    <div class="login-container">

      <van-nav-bar class="app-nav-bar"
          title="登录"
          left-arrow
          @click-left="$router.back()" />

      <!--      登录表单-->
      <van-form ref="login-form"
          @submit="onLogin" @failed="onFail" :show-error="false"
                :show-error-message="false"
                validate-first>
        <van-field
            v-model="user.mobile"
            icon-prefix="toutiao"
            left-icon="shouji"
            center
            placeholder="请输入手机号"
            :rules="formRules.mobile"
            name="mobile"
        />
        <van-field
            v-model="user.code"
            clearable
            center
            icon-prefix="toutiao"
            left-icon="yanzhengma"
            placeholder="请输入验证码"
            :rules="formRules.code"
            name="code">
          <template #button>
            <van-count-down :time="1000*60" format="ss s"
                         @finish="isCountDownShow=false"
                  v-if="isCountDownShow"/>
            <van-button size="mini"
                        v-else
                        round
                        class="send-btn"
                        @click.prevent="onSendSms"
                        :loading="isSendSmsLoading"
                        >发送验证码</van-button>
          </template>
        </van-field>
        <!--      登录按钮-->
        <div class="login-btn-wrap">
          <van-button type="info" block class="login-btn" >登录</van-button>
        </div>

      </van-form>

    </div>
</template>

<script>
import {login,sendSms} from "../../api/user";

import {Toast} from 'vant'

export default {
  name:'LoginIndex',
  data(){
    return{
      user:{
        mobile:'',
        code:''
      },
      formRules:{
        mobile:[{ required: true, message: '请输入手机号' },{pattern:/^1[3|5|7|8|9]\d{9}$/,message: '手机号格式错误'}],
        code:[{ required: true, message: '请输入验证码' },{pattern:/^\d{6}$/,message: '验证码格式错误'}]
      },
      isCountDownShow:false,  //控制倒计时和发送按钮的显示状态
      isSendSmsLoading:false
    }
  },
  methods:{
   async  onLogin(){
     Toast.loading({
       message: '登陆中...',
       forbidClick: true, //禁止背景点击
       duration:0   //显示时长
     });
      //1.找到数据接口
      //2.封装请求方法
      //3.请求调用登录

     //4.出来响应结果
     try {
       const { data }=await login(this.user)
      // console.log(res);
       Toast.success('登录成功')
       //将后端返回的用户登录状态(token等数据)放到vuex中
       this.$store.commit('setUser',data.data)

       //登录成功,跳转回原来页面
       // this.$router.back()
       this.$router.push(this.$route.query.redirect || '/')

     }catch (err){
       console.log(err);
      Toast.fail('登录失败,手机号或验证码错误')
     }


    },
    onFail(error){
     if(error.errors[0]){
       Toast({message:error.errors[0].message,position:"top"})
     }
    },
    async onSendSms(){
     //发送验证码,校验手机号->验证通过,请求发送验证码->用户接受短信->输入验证码->登录
    try {
      await this.$refs['login-form'].validate('mobile')
          this.isSendSmsLoading=true//展示按钮的loading状态
      await sendSms(this.user.mobile)
      this.isCountDownShow=true

    }catch ( err  ){
      let message='';
      if(err&&err.response&&err.response.status===429){
        message='发送太频繁了,请稍后重试'
      }else if(err.name==='mobile'){
        message=err.message
      }else {
        message='发送失败,请稍后重试'
      }
      this.isSendSmsLoading=false   //无论发送验证码成功或失败,最后都要关闭发送按钮

      Toast({
        message,
        position:"top"
      })
    }

    },
  }
}

</script>

<style scoped lang="less">
.login-container{
  .send-btn{
    width: 76px;
    height: 23px;
    background-color: #ededed;
    .van-button__text{
      font-size: 11px;
      color: #666666;
    }
  }
  .login-btn-wrap{
  padding: 26px 16px;
    .login-btn{
      background-color: #6db5fb;
      border:none;
      .van-button__text{
        font-size: 15px;
      }

    }
  }
}
</style>