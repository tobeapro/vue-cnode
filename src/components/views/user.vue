<template lang="pug">
  .user
    .container
      h4 个人信息
      .info
        .avatar
          img(:src="data.avatar_url")
        p.name {{data.loginname}}
        p.score 积分:{{data.score}}
        p.github 
          a(:href="'https://github.com/'+data.githubUsername",target="_blank") @仓库地址
        p.createTime 注册时间{{createTime(data.create_at)}}前
      h4 创建的话题
      .createTopic
        ul.list
          li(v-for="(item,index) in data.recent_topics",:key="index")
            img(:src="item.author.avatar_url")
            a.title(:href="'#/detail/'+item.id") {{item.title}}
      h4 最近参与的话题
      .joinTopic
        ul.list
          li(v-for="(item,index) in data.recent_replies",:key="index")
            img(:src="item.author.avatar_url",@click.prevent="userInfo(item.author.loginname)")
            a.title(:href="'#/detail/'+item.id") {{item.title}}
</template>
<script>
export default {
  name:'user',
  data(){
    return{
      data:{}
    }
  },
  created(){
    this.$axios.get('https://cnodejs.org/api/v1/user/'+this.$route.params.loginname)
    .then((res)=>{
      this.data=res.data.data
    })
    .catch((err)=>{
      alert(err)
    })
  },
  methods:{
    createTime(time){
      let now=new Date()
      time=new Date(time)
      if(now.getFullYear()-time.getFullYear()>0){
        return now.getFullYear()-time.getFullYear()+"年"
      }else if(now.getMonth()-time.getMonth()>0){
        return now.getMonth()-time.getMonth()+"月"
      }else if(now.getDate() - time.getDate()>0){
        return now.getDate() - time.getDate()+"日"
      }else if(now.getHours()-time.getHours()>0){
        return now.getHours()-time.getHours()+"小时"
      }else if(now.getMinutes() - time.getMinutes()>0){
        return now.getMinutes() - time.getMinutes()+"分钟"
      }else{
        return now.getSeconds()-time.getSeconds()+"秒"
      }
    },
    userInfo(name){
      this.$router.push("/user/"+name)
    },
    getUserInfo(){
      this.$axios.get('https://cnodejs.org/api/v1/user/'+this.$route.params.loginname)
      .then((res)=>{
        window.scroll(0,0)
        this.data=res.data.data
      })
      .catch((err)=>{
        alert(err)
      })
    }
  },
  watch:{
    '$route': 'getUserInfo'
  } 
}
</script>
<style lang="scss" scoped>
  .user{  
    h4{
      padding:0 10px;
      line-height:40px;
      background-color:#ddd;
    }
    .info{
      padding-left:10px;
      .avatar{
        margin:10px 0;
        img{
          width:100px;
          height:100px;
        }
      }
      p{
        font-size:14px;
        line-height:20px;
        a{
          color:#555;
          &:hover{
            text-decoration: underline;
          }
        }
      }
    }
    .list{
      li{
        display:flex;
        align-items:center;
        border-bottom:1px solid #ddd;
        img{
          margin:6px 10px;
          width:40px;
          height:40px;
          border-radius: 50%;
          border:1px solid #ddd;
        }
        a{
          font-weight:bold;
          color:#666;
          &:hover{
            color:#000;
            text-decoration: underline;
          }
        }
      }
    }
  }
</style>
