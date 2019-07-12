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
    AddAuthorization(toKen,timeStamp,signal){
        return new Promise((resolve, reject) => {
            const url = '/api/Enterprise/AddAuthorization';
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
    EditAuthorization(toKen,membersid,signal){
        return new Promise((resolve, reject) => {
            const url = '/api/Enterprise/EditAuthorization';
            Util.ajax.post(url,
                {   
                    toKen: toKen,
                    membersid: membersid,
                    signal: signal
                }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error.response.data);
            });
        });
    },
    SaveTemplateAuthorization(toKen,membersid,selectValue,signal){
        return new Promise((resolve, reject) => {
            const url = '/api/Enterprise/SaveTemplateAuthorization';
            Util.ajax.post(url,
                {   
                    toKen: toKen,
                    membersid: membersid,
                    selectValue: selectValue,
                    signal: signal
                }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error.response.data);
            });
        });
    },
    AddLegalAuthorization(toKen,membersid,signal){
        return new Promise((resolve, reject) => {
            const url = '/api/Enterprise/AddLegalAuthorization';
            Util.ajax.post(url,
                {   
                    toKen: toKen,
                    membersid: membersid,
                    signal: signal
                }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error.response.data);
            });
        });
    },
    MembersTemplateDetail(toKen,membersid,signal){
        return new Promise((resolve, reject) => {
            const url = '/api/Enterprise/MembersTemplateDetail';
            Util.ajax.post(url,
                {   
                    toKen: toKen,
                    membersid: membersid,
                    signal: signal
                }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error.response.data);
            });
        });
    },
    MembersList (pageIndex, pageSize, filler,validationState
, toKen, timeStamp, signal) {
        return new Promise((resolve, reject) => {
            const url = '/api/Enterprise/MembersList';
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
    SelectMembers(toKen,phone,signal){
        return new Promise((resolve, reject) => {
            const url = '/api/Enterprise/SelectMembers';
            Util.ajax.post(url,
                {   
                    toKen: toKen,
                    phone: phone,
                    signal: signal
                }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error.response.data);
            });
        });
    },
    MembershipTemplateState(toKen,membersid,template,state,signal){
        return new Promise((resolve, reject) => {
            const url = '/api/Enterprise/MembershipTemplateState';
            Util.ajax.post(url,
                {   
                    toKen: toKen,
                    membersid: membersid,
                    template: template,
                    state: state,
                    signal: signal
                }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error.response.data);
            });
        });
    },
    SendToMembers(toKen,message,userid,signal){
        return new Promise((resolve, reject) => {
            const url = '/api/Enterprise/SendToMembers';
            Util.ajax.post(url,
                {   
                    toKen: toKen,
                    message: message,
                    userid: userid,
                    signal: signal
                }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error.response.data);
            });
        });
    },
    AgainInviteMembership(toKen,membersid,signal){
        return new Promise((resolve, reject) => {
            const url = '/api/Enterprise/AgainInviteMembership';
            Util.ajax.post(url,
                {   
                    toKen: toKen,
                    membersid: membersid,
                    signal: signal
                }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error.response.data);
            });
        });
    }
}