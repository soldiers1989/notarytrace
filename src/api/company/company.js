import Util from '@/libs/util';

export default {
	EnterpriseCertification (toKen, timeStamp, signal) {
        return new Promise((resolve, reject) => {
            const url = '/api/Enterprise/EnterpriseCertification';
            Util.ajax.post(url,
                {
                  	toKen: toKen,
                    timeStamp: timeStamp,
                    signal: signal
                }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error.response.data);
            });
        });
    },
    UkeyCertification (toKen, timeStamp, signal) {
        return new Promise((resolve, reject) => {
            const url = '/api/Enterprise/UkeyCertification';
            Util.ajax.post(url,
                {
                    toKen: toKen,
                    timeStamp: timeStamp,
                    signal: signal
                }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error.response.data);
            });
        });
    },
    MembersAuthorization (pageIndex, pageSize, filler,validationState
, toKen, timeStamp, signal) {
        return new Promise((resolve, reject) => {
            const url = '/api/Enterprise/MembersAuthorization';
            Util.ajax.post(url,
                {   pageIndex: pageIndex,
                    pageSize: pageSize,
                    filler: filler,
                    validationState: validationState,
                    toKen: toKen,
                    timeStamp: timeStamp,
                    signal: signal
                }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error.response.data);
            });
        });
    },
}