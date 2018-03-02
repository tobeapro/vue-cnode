import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state:{
        token: '',
        userInfo:{}
    },
    mutations:{
        setToken(state,str){
            state.token=str
        },
        setUserInfo(state,obj){
            state.userInfo=obj
        }
    },
    actions:{
        set_token({commit},str){
            commit('setToken',str)
        },
        set_userInfo({commit},obj){
            commit('setUserInfo',obj)
        }
    },
    getters:{

    }
})
