<template lang="pug">
  .detail(:class="loadingStatus?'loading':''")
    login(:showStatus="showStatus",@changeShowStatus="checkUserInfo")
    .back
        .toHome(@click.prevent="toHome")
            img(:src="back")
        .user(@click.prevent="checkUserInfo",:title="userInfo.loginname?userInfo.loginname:'请登录'")
            img(:src="userInfo==={}||userInfo.avatar_url===undefined?noUser:userInfo.avatar_url")
    .container
        .header
            .title {{detail.title}}
            .info   
                span.top(v-if="detail.top") 置顶     
                span 作者:{{detail.author.loginname}} ·
                span 发布于:{{countTime(detail.create_at)}}前 ·
                span 最后编辑:{{countTime(detail.last_reply_at)}}前
        .content(v-html="detail.content")
        .reply 
            h4 共有评论{{detail.reply_count}}条
            .reply-text
                textarea(v-model="commentText",placeholder="请输入评论内容...")
                button(@click.prevent="comment") 评论
                button(class="clear",@click.prevent="clearComment") 清空
            ul.reply-list
                li(v-for="(item,index) in detail.replies",:key="index") 
                    .author
                        img(:src="item.author.avatar_url",class="avatar",@click.prevent="toUserInfo(item.author.loginname)")
                        span.name {{item.author.loginname}}
                        span.time {{index+1}}楼·{{countTime(item.create_at)}}前
                    .reply-content(v-html="item.content")
                    .reply-btn(@click.prevent="reply(item.id)") 回复
    .footer
        .input
            input(v-model="replyText")
        .confirm
            button() 确认
</template>
<script>
import qs from 'qs'
import noUser from '../../assets/noUser.png'
import back from '../../assets/back.png'
import login from '../common/login.vue'
export default {
    name:'detail',
    data(){
        return{
            detail:{
                author:{
                    loginname:''
                }
            },
            showStatus:false,
            loadingStatus:true,
            replyText:'',
            commentText:'',
            noUser,
            back,
            replyIndex:0
        }
    },
    computed:{
        token(){
            return this.$store.state.token
        },
        userInfo(){
            return this.$store.state.userInfo
        }
    },
    components:{
        login
    },
    created(){
        this.$axios.get('https://cnodejs.org/api/v1/topic/'+this.$route.params.id)
        .then((res)=>{
            this.detail=res.data.data
            this.loadingStatus=false;
        })
        .catch((err)=>{
            this.loadingStatus=false;
            alert(err)
        })
    },
    methods:{
        toUserInfo(name){
            this.$router.push("/user/"+name)
        },
        countTime(time){
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
        reply(id){
            this.$axios.post(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}/replies`,qs.stringify({
                accesstoken:this.token,
                content:this.replyText,
                reply_id:id
            }))
            .then((res)=>{
                alert(res)
            })
            .catch((err)=>{
                alert(err)
            })
        },
        comment(){
            if(this.token===''){
                alert('请先登录')
                return
            }else{
               this.$axios.post(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}/replies`,qs.stringify({
                accesstoken:this.token,
                content:this.commentText,
                }))
                .then((res)=>{
                    if(res.data.success){
                        this.$axios.get('https://cnodejs.org/api/v1/topic/'+this.$route.params.id)
                        .then((res)=>{
                            window.scrollTo(0,document.body.scrollHeight)
                            this.commentText=''
                            this.detail=res.data.data
                        })
                        .catch((err)=>{
                            alert(err)
                        })
                    }else{
                        alert("评论失败")
                    }
                })
                .catch((err)=>{
                    if(err.response.status===400){
                        alert(err.response.data.error_msg)
                        return
                    }
                    alert("服务器出错")
                }) 
            }
        },
        clearComment(){
            this.commentText=''
        },
        checkUserInfo(){
            this.showStatus=!this.showStatus
        },
        toHome(){
            this.$router.push("/")
        } 
    }
}
</script>
<style lang="scss">
.markdown-text p,.preview p {
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    word-wrap: break-word;
    line-height: 2em;
    margin: 1em 0
}
.markdown-text>:last-child,.preview>:last-child,textarea#title {
    margin-bottom: 1em
}
.markdown-text>:first-child,.preview>:first-child {
    margin-top: 0
}
.markdown-text li,.preview li {
    font-size: 14px;
    line-height: 2em
}
.markdown-text li code,.markdown-text p code,.preview li code,.preview p code {
    color: #000;
    background-color: #fcfafa;
    padding: 4px 6px
}
.markdown-text img {
    width:100%;
    max-width:980px;
    cursor: pointer;
}
.markdown-text h1 code,.markdown-text h2 code,.markdown-text h3 code,.markdown-text h4 code,.markdown-text h5 code,.markdown-text h6 code {
    font-size: inherit;
    color: inherit
}
.panel .markdown-text a {
    color: #08c
}
.detail{
    margin:40px 0;
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
        .user{
            position: absolute;
            right:4px;
            top:4px;
            cursor: pointer;
            img{
                display:block;
                width:34px;
                height:34px;
                border-radius:50%;
                background-color:#fff;
            }
        }
    }
    .header{
        padding:10px;
        .title{         
            font-size:20px;
            font-weight:bold;
            line-height:30px;
        }
        .info{
            line-height:20px;
            color:#aaa;
            .top{
                font-weight:bold;
                color:#f03506;
            }
        }
    }
    .content{
        padding:0 10px;
        border-top:1px solid #ddd;
        border-bottom:1px solid #ddd;
    }
    .reply{
        margin-top:10px;
        h4{
            padding-left:10px;
            height:40px;
            line-height:40px;
            background-color:#ddd;
        }
        .reply-text{
            margin:6px 10px;
            textarea{
                float:left;
                margin-bottom:10px;
                padding:0 6px;
                width:100%;
                height:60px;
                font-size:16px;
                line-height:20px;
                resize:none;
                border:1px solid #ddd;
                overflow-y:auto;
            }
            .clear{
                margin-left:10px;
                background-color:#aaa;
            }
        }
        .reply-list{
            margin-top:10px;
            border-top:1px solid #ddd;
            li{
                position: relative;
                padding-left:10px;
                border-bottom:1px solid #ddd;
                .author{
                    line-height:42px;
                    img.avatar{
                        float:left;
                        margin:6px 0;
                        width:30px;
                        height:30px;
                    }
                    .name{
                        margin-left:6px;
                    }
                    .time{
                        margin-left:10px;
                        color:#08c;
                    }
                }
                .reply-btn{
                    position: absolute;
                    top:10px;
                    right:10px;
                    padding:4px 6px;
                    color:#fff;
                    background-color:#aaa;
                    border-radius: 6px;
                    cursor: pointer;
                    &:hover{
                        color:#fff;
                        text-decoration: underline;
                    }
                }
            }
        }
    }
    .footer{
        position:fixed;
        bottom:0;
        width:100%;
        height:40px;
        background-color:#555;
        .input{
            margin:8px 60px 8px 10px;
            input{
                padding:0 6px;
                width:100%;
                line-height:24px;
                border-radius: 6px;
            }
        }
        .confirm{
            position: absolute;
            top:6px;
            right:4px;
        }      
    }
}
</style>
