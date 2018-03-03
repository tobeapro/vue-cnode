<template lang="pug">
  .content
    login(:showStatus="showStatus",@changeShowStatus="checkUserInfo")
    ul.nav.clearfix
        .container
            li
                a(href="#",@click.prevent="changeTab('all')",:class="tab==='all'?'active':''") 全部
            li
                a(href="#",@click.prevent="changeTab('good')",:class="tab==='good'?'active':''") 精华
            li
                a(href="#",@click.prevent="changeTab('share')",:class="tab==='share'?'active':''") 分享   
            li
                a(href="#",@click.prevent="changeTab('ask')",:class="tab==='ask'?'active':''") 问答 
            li
                a(href="#",@click.prevent="changeTab('job')",:class="tab==='job'?'active':''") 招聘
            li
                a(href="#",@click.prevent="changeTab('dev')",:class="tab==='dev'?'active':''") 客户端测试
        .user(@click.prevent="checkUserInfo",:title="userInfo.loginname?userInfo.loginname:'请登录'")
            img(:src="userInfo==={}||userInfo.avatar_url===undefined?noUser:userInfo.avatar_url")
    ul.list(:class="loadingStatus?'loading':''")
        .container
            li(class="clearfix",v-for="(item,index) in list",:key="index")
                .user_icon(@click="toUserInfo(item.author.loginname)")
                    img(:src="item.author.avatar_url")
                    .name {{item.author.loginname}}
                .info
                    .marked
                        span.top(v-if="item.top") 置顶
                        span(v-if="item.top") ·
                        span.good(v-if="item.good") 精华
                        span(v-if="item.good") ·
                        span.tab {{tabType(item.tab)}}
                    a.title(:href="'#/detail/'+item.id") {{item.title}}
                    .visit 回复数:{{item.reply_count}} / 点击数:{{item.visit_count}}
</template>
<script>
import noUser from '../../assets/noUser.png'
import login from '../common/login.vue'
export default {
    name:'list',
    data(){
        return{
            tab:'all',
            page:1,
            list:[],
            noUser,
            showStatus:false,
            loadingStatus:false
        }
    },
    components:{
        login
    },
    computed:{
        userInfo(){
            return this.$store.state.userInfo
        }
    },
    methods:{
        tabType(val){
            switch(val){
                case "share":return "分享";
                case "ask":return "问答";
                case "job":return "招聘";
                case "dev":return "客户端测试"
                default:return ""
            }
        },
        toUserInfo(name){
            this.$router.push("/user/"+name)
        },
        changeTab(type){
            this.tab=type
            this.page=1
            this.loadingStatus=true;
            this.$axios.get(`https://cnodejs.org/api/v1/topics/?tab=${this.tab}&page=${this.page}`)
            .then((res)=>{
                this.loadingStatus=false;
                this.list=res.data.data
                window.scroll(0,0)
            })
            .catch((err)=>{
                this.loadingStatus=false;
                alert(err)
            })
        },
        loadMoreData(){
            let top=document.body.scrollTop||document.documentElement.scrollTop
            let wHeight=window.innerHeight
            let bHeight=document.body.clientHeight||document.documentElement.clientHeight
            if(top+wHeight>=bHeight){
                this.loadingStatus=true;
                this.page++
                this.$axios.get(`https://cnodejs.org/api/v1/topics/?tab=${this.tab}&page=${this.page}`)
                .then((res)=>{
                    this.loadingStatus=false;
                    res.data.data.forEach((val)=>{
                        this.list.push(val)
                    })
                })
                .catch((err)=>{
                    this.loadingStatus=false;
                    alert(err)
                })
            }
        },
        checkUserInfo(){
            this.showStatus=!this.showStatus
        }
    },
    created(){
        this.$axios.get('https://cnodejs.org/api/v1/topics/?tab=all&page=1')
        .then((res)=>{
            this.list=res.data.data
        })
        .catch((err)=>{
            alert(err)
        })
    },
    mounted(){
        window.addEventListener('scroll', this.loadMoreData)        
    },
    beforeDestory(){
        window.removeEventListener('scroll',this.loadMoreData)
    }
}
</script>
<style lang="scss" scoped>
    .nav{
        position:fixed;
        z-index:1;
        top:0;
        left:0;
        width:100%;
        background-color:#555;
        li{
            float:left;
            margin:6px;
            a{
               padding:4px 12px;
               line-height:30px;
               color:#fff;
               border-radius: 8px;
               &:hover{
                   text-decoration: underline;
               }
               &.active{
                   color:#000;
                   background:#fff;
               }
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
    .list{
        padding-top:42px;
        width:100%;
        li{
            position: relative;
            padding:10px 0;
            width:100%;
            background-color:#fff;
            &:hover{
                background-color:#f6f6f6;
            }
            .user_icon{
                position: absolute;
                width:72px;
                top:50%;
                transform: translateY(-50%);
                img{
                    display:block;
                    margin:6px;
                    width:60px;
                    height:60px;
                    border-radius: 50%;
                    border:1px solid #ddd;  
                }
                .name{
                    line-height:20px;
                    text-align: center;
                    white-space: nowrap;
                    overflow:hidden;
                    text-overflow: ellipsis;
                }
            }
            .info{
                margin-left:76px;
                white-space: nowrap;
                overflow:hidden;
                text-overflow: ellipsis;
                .marked{
                    font-weight:bold;
                    line-height:20px;
                    .top{
                        color:#f03506;
                    }
                    .good{
                        color:#19f006;
                    }
                    .tab{
                        color:#0673f0;
                    }
                }
                .title{            
                    font-size:16px;
                    font-weight:bold;
                    line-height:30px;
                    color:#000;
                    &:hover{
                        text-decoration:underline;
                    }
                }
                .visit{
                    line-height:20px;
                }
            }
        }
    }
</style>
