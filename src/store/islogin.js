import GlobalInfo from '@/api/account';
import router from '@/router'

function getCookie(objName){//获取指定名称的cookie的值
  var arrStr = document.cookie.split("; ");
  for (var i = 0; i < arrStr.length; i++) {
    var temp = arrStr[i].split("=");
    if (temp[0] == objName)
      return unescape(temp[1]);
  }
}

function delCookie(name){
  var date = new Date();
  date.setTime(date.getTime() - 10000);
  document.cookie = name + "=a; expires=" + date.toGMTString();
}

function checkCookie() {
    if(getCookie('token') !== ''&& getCookie('token') !== undefined){
        console.log(1);
        GlobalInfo.checkLogin(getCookie('token')).then(res => {
            if(!res) {
                delCookie('token');
                history.go(0);
            }
        }).catch(error => {});
        return true

    }else {
        console.log(2);
        return false
    }
}
const state = {
    isLogin: checkCookie(),
};

const getters = {
    validate: state => {
        return state;
    },
};

const mutations = {
	changeIsLogin: (state, bool) => {
        state.isLogin = bool;
    },
};

const actions = {
	changeLoginState ({ commit }, bool) {
        commit('changeIsLogin', bool);
    },
    getProfile ({ commit }) {
        // return new Promise((resolve, reject) => {
        //     GlobalInfo.checkLogin(getCookie('accessToken')).then(res => {
        //         commit('changeIsLogin', res.data.is_validated);
        //         resolve(res);
        //     }, reject);
        // });
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};