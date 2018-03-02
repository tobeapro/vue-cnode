<template lang="pug">
  transition(name="fade")
    .login(v-if="showStatus") 
      .mask(@click.prevent="changeShowStatus")
      .info
        .noUser(v-if="userInfo==={}||userInfo.loginname===undefined")
          p 请登录
          .token 
            input(v-model="tokenText",placeholder="请输入token值")
          button(@click.prevent="setToken") 确认
        .user(v-else="userInfo==={}||userInfo.loginname===undefined")
          .name(@click.prevent="toUserInfo(userInfo.loginname)") {{userInfo.loginname}}
          .avatar 
            img(:src="userInfo.avatar_url")
          .logout
            button(@click.prevent="logout") 登出
</template>
<script>
import qs from 'qs'
export default {
  name:'login',
  data(){
    return{
      tokenText:''
    }
  },
  props:{
    showStatus:{
      type:Boolean
    }
  },
  computed:{
    userInfo(){
      return this.$store.state.userInfo
    }
  },
  methods:{
    changeShowStatus(){
      this.$emit("changeShowStatus")
    },
    setToken(){
      if(this.tokenText===''){
        alert("请输入token值")
      }else{
        this.$axios.post('https://cnodejs.org/api/v1/accesstoken', qs.stringify({
          accesstoken:this.tokenText
        }))
        .then((res)=>{
          if(res.data.success){
              let data=res.data
              delete data.success
              this.$store.commit('setToken',this.tokenText)
              this.$store.commit('setUserInfo',data)
              this.changeShowStatus() 
          }else{
            alert(res.error_msg)
          }
        })
        .catch((err)=>{
          if(err.response.status===401){
            this.tokenText=''
            alert(err.response.data.error_msg)
          }else{
            alert('登录失败')
          }
        })
      }
    },
    toUserInfo(name){
      this.$router.push("/user/"+name)
    },
    logout(){
      this.$store.commit("setToken",'')
      this.$store.commit("setUserInfo",{})
      this.changeShowStatus() 
    }
  }
}
</script>
<style lang="scss" scoped>
  .fade-enter-active, .fade-leave-active{
    transition: all .2s ease-out;
  }
  .fade-enter, .fade-leave-to{
    transform: translateX(100%)
  }
  .login{
    position:fixed;
    z-index:10;
    top:0;
    right:0;
    width:100%;
    .mask{
      position:fixed;
      top:0;
      bottom:0;
      width:100%;
      background-color:rgba(0,0,0,.6);
    }
    .info{
      position:fixed;
      right:2px;
      top:2px;
      padding:10px;
      background-color:#fff;
      border-radius: 6px;
      .noUser{
        p{
          font-weight:bold;
          line-height:20px;
        }
        .token{
          margin:6px 0;
          input{
            padding-left:6px;
            line-height:26px;
            border:1px solid #ddd;
            border-radius: 4px;
            &:focus{
              border-color:#08a4ec;
              box-shadow:0 0 1px #08a4ec;
            }
            
    
          }
        }
      }
      .user{
        .name{
          margin-bottom:10px;
          font-size:14px;
          font-weight:bold;
          line-height:20px;
          cursor: pointer;
          &:hover{
            text-decoration: underline;
          }
        }
        .avatar{
          img{
            width:100px;
          }
        }
        .logout{
          margin-top:10px;
          text-align: center;
        }
      } 
    }
  }
</style>
