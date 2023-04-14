import Vue from 'vue'

import Vuex from 'vuex'

const actions = {}

const mutations = {
    CHANGENAME(state, value) {
        state.userName = value
    },
    CHANGEID(state, value){
        state.userID = value
    },
    JUDGETIME(state, value) {
        if (value >= 0 && value <= 5) {
            state.hello = '夜深了注意休息。'
        }
        else if (value <= 10) {
            state.hello = '早上好！'
        }
        else if (value <= 12) {
            state.hello = '中午好！'
        }
        else if (value <= 17) {
            state.hello = '下午好！'
        }
        else {
            state.hello = '晚上好！'
        }
    }
}

const state = {
    userName: '用户',
    hello: '你好。',
    userID: 1
}

Vue.use(Vuex)

export default new Vuex.Store({
    actions,
    mutations,
    state
})