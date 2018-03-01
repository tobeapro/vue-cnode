import Vue from 'vue'
import Router from 'vue-router'
import list from '../components/views/list.vue'
import detail from '../components/views/detail.vue'
import user from '../components/views/user.vue'
Vue.use(Router)
export default new Router({
    routes:[
        {
            path:'/',
            name:'home',
            component:list,
        },
        {
            path:'/detail/:id',
            name:'detail',
            component:detail
        },
        {
            path:'/user/:loginname',
            name:'user',
            component:user
        }
    ]
})