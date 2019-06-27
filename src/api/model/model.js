 import Util from '../../libs/util';

export default {
	leftMenu (token) {
        return new Promise((resolve, reject) => {
            const url = '/api/Information/GetContractMenu';
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
    tableList (id, pageindex, pagesize) {
        return new Promise((resolve, reject) => {
            const url = '/api/Contract/GetCommon';
            Util.ajax.post(url,{
                    warrantId: id,
                    pageIndex: pageindex,
                    pageSize: pagesize
                }).then(response => {
                resolve(response.data);
            }).catch(error => {
                console.log(JSON.stringify(error.response.data));
                reject(error.response.data);
            });
        });
    },
    parentSearch (xmlUrl, fkname, guid, pageIndex, pageSize, obj) {
        console.log(xmlUrl,fkname,guid,pageIndex,pageSize,obj)
        return new Promise((resolve, reject) => {
            const url = '/api/Contract/GetCommonDetailTable';
            Util.ajax.post(url,{
                    xmlUrl: xmlUrl,
                    guid: guid,
                    fkName: fkname,
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                    filler: JSON.stringify(obj)
                }).then(response => {
                resolve(response.data);
            }).catch(error => {
                console.log(JSON.stringify(error.response.data));
                reject(error.response.data);
            });
        });
    },
    GetCommonDetail (xmlUrl, guid) {
        return new Promise((resolve, reject) => {
            const url = '/api/Contract/GetCommonDetail';
            Util.ajax.post(url,{
                    xmlUrl: xmlUrl,
                    guid: guid
                }).then(response => {
                resolve(response.data);
            }).catch(error => {
                console.log(JSON.stringify(error.response.data));
                reject(error.response.data);
            });
        });
    },
    GetCommonDetailEdit (xmlUrl, guid) {
        return new Promise((resolve, reject) => {
            const url = '/api/Contract/GetCommonDetailEdit';
            Util.ajax.post(url,{
                    xmlUrl: xmlUrl,
                    guid: guid
                }).then(response => {
                resolve(response.data);
            }).catch(error => {
                console.log(JSON.stringify(error.response.data));
                reject(error.response.data);
            });
        });
    },
    PostCommonDetailEdit (xmlUrl, guid, obj, signParts) {
        console.log(xmlUrl,guid,obj,signParts)
        return new Promise((resolve, reject) => {
            const url = '/api/Contract/PostCommonDetailEdit';
            Util.ajax.post(url,{
                    xmlUrl: xmlUrl,
                    guid: guid,
                    jsonMessage: JSON.stringify(obj),
                    signParts: JSON.stringify(signParts)
                }).then(response => {
                resolve(response.data);
            }).catch(error => {
                console.log(JSON.stringify(error.response.data));
                reject(error.response.data);
            });
        });
    },
    AddGetCommon (xmlUrl, fkName, fkGuid,conGuid,comAuthGuid,contractTypeId,token) {
        console.log(xmlUrl, fkName, fkGuid,conGuid,comAuthGuid,contractTypeId,token)
        return new Promise((resolve, reject) => {
            const url = '/api/Contract/AddGetCommon';
            Util.ajax.post(url,{
                    xmlUrl: xmlUrl,
                    fkName: fkName,
                    fkGuid: fkGuid,
                    contractTypeConfigGuid: conGuid,
                    comAuthGuid: comAuthGuid,
                    contractTypeId: contractTypeId,
                    token: token
                }).then(response => {
                resolve(response.data);
            }).catch(error => {
                console.log(JSON.stringify(error.response.data));
                reject(error.response.data);
            });
        });
    },
    AddPostCommon (obj) {
        console.log(obj)
        return new Promise((resolve, reject) => {
            const url = '/api/Contract/AddPostCommon';
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
    GetCommonPdf (guid, token) {
        console.log(guid, token)
        return new Promise((resolve, reject) => {
            const url = '/api/Contract/GetCommonPdf';
            Util.ajax.post(url,{
                    sysGuid: guid,
                    toKen: token
                }).then(response => {
                resolve(response.data);
            }).catch(error => {
                console.log(JSON.stringify(error.response.data));
                reject(error.response.data);
            });
        });
    },
    DeteleContract (conGuid, token, xmlUrl) {
        console.log(conGuid, token, xmlUrl)
        return new Promise((resolve, reject) => {
            const url = '/api/Contract/DeteleContract';
            Util.ajax.post(url,{
                    contractGuid: conGuid,
                    toKen: token,
                    xmlUrl: xmlUrl
                }).then(response => {
                resolve(response.data);
            }).catch(error => {
                console.log(JSON.stringify(error.response.data));
                reject(error.response.data);
            });
        });
    },
}