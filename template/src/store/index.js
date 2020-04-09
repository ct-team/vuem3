import Vue from 'vue';
import vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import base from './base.js'; // 全局变量和方法

Vue.use(vuex);

const store = new vuex.Store({
    modules: {
        base
    },
    plugins: [
        createPersistedState({
            // storage: window.sessionStorage
            storage: window.localStorage
        })
    ]
});

export default store;
