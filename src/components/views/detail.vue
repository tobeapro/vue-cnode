<template lang="pug">
  
</template>
<script>
    export default {
        name:'list',
        data(){
            return{

            }
        },
        created(){
            this.$axios.get('https://cnodejs.org/api/v1/topics')
            .then((res)=>{
                console.log(res)
            })
        }
    }
</script>
<style lang="scss" scoped>

</style>
