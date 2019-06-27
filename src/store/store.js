import Vue from 'vue';
import Vuex from 'vuex';
import islogin from './islogin';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        islogin
    }
});