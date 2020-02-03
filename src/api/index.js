import { req } from '../plugins/request'
//删除动态
export function delItem(data) {
    return req({
        method: "post",
        url: "/api/update/delItem",
        data
    })
}
//添加评论
export function addComment(arr) {
    return req({
        method: "post",
        url: "/api/update/addcomment",
        data: arr
    })
}
//更新社交账号
export function updateCircle(data) {
    return req({
        method: 'post',
        url: '/api/update/circle',
        data
    })
}
//更新短语
export function updateText(data) {
    return req({
        method: 'post',
        url: '/api/update/text',
        data
    })
}
//更新标签
export function updateTags(data) {
    return req({
        method: 'post',
        url: '/api/update/tags',
        data
    })
}
//头像上传
export function uploadAvatar(data) {
    return req({
        method: 'post',
        url: '/api/upload/avatar',
        data
    })
}
//登录
export function loginRegist(data) {
    return req({
        method: 'post',
        url: '/api/login',
        data
    })
}
//获取用户数据
export function getUserInfo(data) {
    return req({
        method: 'post',
        url: '/api/userinfo/get',
        data
    })
}
//获取网站访问数
export function getVisiter() {
    return req({
        method: 'get',
        url: '/api/visiter/get'
    })
}
//设置网站访问数
export function setVisiter() {
    return req({
        method: 'get',
        url: '/api/visiter/set'
    })
}
//获取item
export function getItem() {
    return req({
        method: 'post',
        url: `/api/item/get`
    })
}
//增加热度
export function addPeople(id, num) {
    return req({
        method: 'get',
        url: `/api/item/addpeople/${id}/${num}`
    })
}
//获得详细
export function getDetail(id) {
    return req({
        method: 'post',
        url: `/api/item/getdetail/${id}`
    })
}
//搜索歌曲
export function getMusic(str) {
    return req({
        method: 'post',
        url: `/api/music/get/${str}`
    })
}
//播放上一首
export function getPrepMusic(id) {
    return req({
        method: 'post',
        url: `/api/music/getprep/${id}`
    })
}
//播放下一首
export function getNextMusic(id) {
    return req({
        method: 'post',
        url: `/api/music/getnext/${id}`
    })
}

//增加搜索数量
export function addSearchNum(id, num) {
    return req({
        method: 'post',
        url: `/api/music/addsearchnum/${id}/${num}`
    })
}
//获得热搜榜
export function getHotMusic() {
    return req({
        method: "post",
        url: '/api/music/gethot'
    })
}
//获得音乐数量
export function getAllMusic() {
    return req({
        method: "post",
        url: "/api/music/getallmusic"
    })
}
