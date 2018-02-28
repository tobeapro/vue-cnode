<template lang="pug">
  .detail(v-html="detail.content")
</template>
<script>
    export default {
        name:'detail',
        data(){
            return{
                detail:{}
            }
        },
        created(){
            this.$axios.get('https://cnodejs.org/api/v1/topic/'+this.$route.params.id)
            .then((res)=>{
                this.detail=res.data.data
                console.log(res)
            })
        }
    }
</script>
<style lang="scss" scoped>

</style>
