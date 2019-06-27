import Util from '../libs/util';

export default {
	login (user, password) {
        return new Promise((resolve, reject) => {
            const url = '/api/Token';
            Util.ajax.post(url,
                {
                  	name: user,
                   	password: password,
                   	sub: "",
  					source: ""
                }).then(response => {
                resolve(response.data);
            }).catch(error => {
                console.log(JSON.stringify(error.response.data));
                reject(error.response.data);
            });
        });
    },
    checkLogin (token) {
        return new Promise((resolve, reject) => {
            const url = '/api/Token/IsHaveToken';
            Util.ajax.post(url,{
              token: token
            }).then(response => {
                resolve(response.data);
            }).catch(error => {
                console.log(JSON.stringify(error.response.data));
                reject(error.response.data);
            });
        });
    },
}