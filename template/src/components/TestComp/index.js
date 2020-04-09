import TestComp from './TestComp.vue';

const TestGlobalComp = {
    install: function(Vue) {
        Vue.component('TestGlobalComp', TestComp);
    }
};

export default TestGlobalComp;
