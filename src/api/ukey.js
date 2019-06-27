import Util from '@/libs/util';

export default {
	UpdateCaMessage (toKen, txt, signal) {
        return new Promise((resolve, reject) => {
            const url = '/api/Enterprise/UpdateCaMessage';
            Util.ajax.post(url,
                {
                  	toKen: toKen,
					cabase64: txt,
					signal: signal,
                }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error.response.data);
            });
        });
    },
}