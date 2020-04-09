export default {
    state: {
        accessToken: ''
    },

    mutations: {
        //改变state的值
        setState(state, obj) {
            for (const i in state) {
                for (const j in obj) {
                    if (i === j) {
                        state[i] = obj[j];
                    }
                }
            }
        }
    }
};
