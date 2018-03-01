<template lang="pug">
  .content
    ul.nav.clearfix
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
    ul.list
        li(class="clearfix",v-for="(item,index) in list",:key="index")
            .user_icon(@click="userInfo(item.author.loginname)")
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
    export default {
        name:'list',
        data(){
            return{
                tab:'all',
                page:1,
                list:[]
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
            userInfo(name){
                this.$router.push("/user/"+name)
            },
            changeTab(type){
                this.tab=type
                this.page=1
                this.$axios.get(`https://cnodejs.org/api/v1/topics/?tab=${this.tab}&page=${this.page}`)
                .then((res)=>{
                    this.list=res.data.data
                })
                .catch((err)=>{
                    alert(err)
                })
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
        }
    }
</script>
<style lang="scss" scoped>
    .nav{
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
    }
    .list{
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
