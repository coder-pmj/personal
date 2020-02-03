import axios from 'axios'
import { Loading, Message } from 'element-ui'
export const req = axios.create({
    timeout: 10000
})
let loads = {
    loadingInstance: null,
    open() {
        this.loadingInstance = Loading.service({ target: '.left', text: "加载中……" })
    },
    close() {
        if (this.loadingInstance) {
            this.loadingInstance.close()
            this.loadingInstance = null
        }
    }
}
let personalLoad = {
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
}


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
    if (config.url.includes('/api/item/getdetail') || config.url === '/api/item/get') {
        if (!loads.loadingInstance) {
            loads.open()
        }

    }
    if (config.url === '/api/userinfo/get' || config.url.includes('/api/img/user')) {
        if (!personalLoad.loadingInstance) {
            personalLoad.open()
        }

    }
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
    loads.close()
    loadMusic.close()
    // setTimeout(function () {
        personalLoad.close()
    // }, 1000)
    return res;
}, function (error) {
    return Promise.reject(error);
});

