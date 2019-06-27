import Util from '../../libs/util';

let util2 = {

};

// util2.ajaxUrl = 'http://localhost:9188';

// util2.ajax = axios.create({
//     baseURL: util2.ajaxUrl,
//     timeout: 30000,
//     withCredentials: true,
//     headers: {
//     	'Accept': 'application/json',
//     	'Content-Type': 'application/json;charset=UTF-8'
//     }
// });

export default {
	// Test () {
 //        return new Promise((resolve, reject) => {
 //            const url = '/ETAuto199Service/GetCertName?jsoncallback=?';
 //            util2.ajax.get(url).then(response => {
 //                resolve(response.data);
 //            }).catch(error => {
 //                console.log(JSON.stringify(error.response.data));
 //                reject(error.response.data);
 //            });
 //        });
 //    },
	getPackageList () {
        return new Promise((resolve, reject) => {
            const url = '/api/GetPackageListInfo';
            Util.ajax.get(url).then(response => {
                resolve(response.data);
            }).catch(error => {
                console.log(JSON.stringify(error.response.data));
                reject(error.response.data);
            });
        });
    },
    pay (userid, packageid) {
        return new Promise((resolve, reject) => {
            const url = '/api/PackagePay/GetPackagePayQRCode';
            Util.ajax.post(url,{
            	userId: userid,
            	packageId: packageid
            }).then(response => {
                resolve(response.data);
            }).catch(error => {
                console.log(JSON.stringify(error.response.data));
                reject(error.response.data);
            });
        });
    },
    checkPayResult (payid) {
        return new Promise((resolve, reject) => {
            const url = '/api/PackagePay/GetWeixinPayResult/' + payid;
            Util.ajax.get(url).then(response => {
                resolve(response.data);
            }).catch(error => {
                console.log(JSON.stringify(error.response.data));
                reject(error.response.data);
            });
        });
    },
}