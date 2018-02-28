<template lang="pug">
  .content
    ul.list
        li(class="clearfix",v-for="(item,index) in list",:key="index")
            .user_icon
                img(:src="item.author.avatar_url")
                .name {{item.author.loginname}}
            .info
                .marked
                    span.top(v-if="item.top") 置顶
                    span(v-if="item.top") ·
                    span.good(v-if="item.good") 精华
                    span(v-if="item.good") ·
                    span.tab {{tabType(item.tab)}}
                .title {{item.title}}
                .visit 回复数:{{item.reply_count}} / 点击数:{{item.visit_count}}
</template>
<script>
    export default {
        name:'list',
        data(){
            return{
                list:[]
            }
        },
        methods:{
            tabType(val){
                switch(val){
                    case "share":return "分享"
                    break;
                    case "ask":return "问答"
                    break;
                    default:return ""
                }
            }
        },
        created(){
            this.$axios.get('https://cnodejs.org/api/v1/topics/?tab=all&page=1')
            .then((res)=>{
                this.list=res.data.data
                console.log(res.data.data)
            })
        }
    }
</script>
<style lang="scss" scoped>
    .list{
        li{
            background-color:#fff;
            &:hover{
                background-color:#f6f6f6;
            }
            .user_icon{
                float:left;
                width:72px;
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
                    overflow:hidden;
                    text-overflow: ellipsis;
                }
            }
            .info{
                float:left;
                padding:6px;
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
                }
                .visit{
                    line-height:20px;
                }
            }
        }
    }
</style>
