 import Util from '../../libs/util';

export default {
	companyMark (obj) {
		console.log(obj)
        return new Promise((resolve, reject) => {
            const url = '/api/Contract/Common_EcSave';
            Util.ajax.post(url,{
                    request: JSON.stringify(obj)
                }).then(response => {
                resolve(response.data);
            }).catch(error => {
                console.log(JSON.stringify(error.response.data));
                reject(error.response.data);
            });
        });
    },
    getSignPerson (Guid, conGuid, token) {
        console.log(Guid, conGuid)
        return new Promise((resolve, reject) => {
            const url = '/api/Contract/GetSigned';
            Util.ajax.post(url,{
                    comAuthGuid: Guid,
                    contractTypeConfigGuid: conGuid,
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