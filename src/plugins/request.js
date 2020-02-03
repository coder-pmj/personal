import axios from 'axios'
import { Loading, Message } from 'element-ui'
export const req = axios.create({
    timeout: 10000
})

/* let personalLoad = {
    loadingInstance: null,
    open() {
        this.loadingInstance = Loading.service({ target: '.personal'})
    },
    close() {
        if (this.loadingInstance) {
            this.loadingInstance.close()
            this.loadingInstance = null
        }
    }
} */


let loadMusic = {
    loadingInstance: null,
    open() {
        this.loadingInstance = Loading.service({ target: '#result', text: "加载中……" })
    },
    close() {
        if (this.loadingInstance) {
            this.loadingInstance.close()
            this.loadingInstance = null
        }
    }
}
req.interceptors.request.use(function (config) {
    
    /* if (config.url === '/api/userinfo/get' || config.url.includes('/api/img/user')) {
        if (!personalLoad.loadingInstance) {
            // personalLoad.open()
        }

    } */
    if (config.url.lastIndexOf('/') === 14 && config.url.includes('/api/music/get/')) {

        if (!loadMusic.loadingInstance) {
            loadMusic.open()
        }
    }

    return config;
}, function (error) {
    Message({
        type: "error",
        message: "服务器异常"
    })
    return Promise.reject(error);
});
req.interceptors.response.use(function (res) {
   
    loadMusic.close()
    return res;
}, function (error) {
    return Promise.reject(error);
});

