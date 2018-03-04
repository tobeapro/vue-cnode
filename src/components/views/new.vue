<template lang="pug">
  .new
    .back
        .toHome(@click.prevent="toHome")
            img(:src="back")
    .container
        .article
            .title
                span 标题
                input(v-model="title",placeholder="标题字数10字以上")
            .tab
                span 选择模块
                select(v-model="tab")
                    option(value="share") 分享
                    option(value="ask") 问答
                    option(value="job") 招聘
                    option(value="dev") 客户端测试
            .content
                textarea(v-model="content",placeholder="请输入话题内容")
            .confirm
                button(@click.prevent="confirmTopic") 提交
                button(@click.prevent="clearContent",class="clear") 清空
</template>
<script>
import noUser from '../../assets/noUser.png'
import login from '../common/login.vue'
import back from '../../assets/back.png'
import qs from 'qs'
export default{
    name:'new',
    data(){
        return{
            back,
            title:'',
            tab:'dev',
            content:'',
            noUser,
            showStatus:false
        }
    },
    components:{
        login
    },
    computed:{
        token(){
            return this.$store.state.token
        },
        userInfo(){
            return this.$store.state.userInfo
        }
    },
    mounted(){
        if(this.token===''){
            alert("请先登录")
            this.$router.push('/')
        }
    },
    methods:{
        toHome(){
            this.$router.push("/")
        },
        confirmTopic(){
            this.$axios.post('https://cnodejs.org/api/v1/topics', qs.stringify({
                accesstoken:this.token,
                title:this.title,
                tab:this.tab,
                content:this.content
            }))
            .then((res)=>{
                if(res.data.success){
                    this.$router.push('/detail/'+res.data.topic_id)
                }else{
                    alert(res.data.error_msg)
                }
            })
            .catch((err)=>{
                if(!err.response.data.success){
                    alert(err.response.data.error_msg)
                    return
                }
                alert("服务器异常")
            })
        },
        clearContent(){
            this.content=''
        }
    }
}
</script>
<style lang="scss" scoped>
    .new{
        padding-top:40px;
        .back{
            position:fixed;
            z-index:1;
            top:0;
            left:0;
            width:100%;
            height:40px;
            text-align:center;
            background-color:#555;
            .toHome{
                float:left;
                width:40px;
                line-height:40px;
                cursor:pointer;
                img{
                    width:20px;
                    height:20px;
                    vertical-align:middle;
                }
            }
        }
        .article{  
            padding:6px 12px;
            span{
                font-size:14px;
                line-height:30px;
                margin-right:10px;
            } 
            .tab{
                margin:10px 0;
            }   
            input,select{
                padding-left:6px;
                height:30px;
                border:1px solid #aaa;
                border-radius: 4px;
                &:focus{
                    border-color:#08a4ec;
                    box-shadow:0 0 1px #08a4ec;
                }
            }
            textarea{
                padding-left:10px;
                width:100%;
                height:200px;
                font-size:16px;
                line-height:20px;
                border:1px solid #aaa;
                border-radius: 4px;
                resize: none;
                &:focus{
                    border-color:#08a4ec;
                    box-shadow:0 0 1px #08a4ec;
                }
            } 
            .clear{
                margin-left:10px;
                background-color:#aaa;
            }              
        }
    }
</style>
