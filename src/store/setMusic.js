export default {
    namespaced: true,
    state: {
        data: [],
        isplaying: false,
        src: "",
        hotMusic: [],
        resultMusic: [],
        
        playingMusic: {},
        played: []
    },
    mutations: {
        //获取热门歌曲
        setHotMusic(state, res) {
            state.hotMusic = res
        },
        setData(state, res) {
            state.data = res
        },
        isplayed(state) {
            state.isplaying = false
        },
        playing(state) {
            state.isplaying = true
        },
        setPlayingMusic(state, res) {
            state.playingMusic = res
        },
        setResultMusic(state, res) {
            state.resultMusic = res
        },
        setSrc(state, res) {
            state.src = res
        },
        addplayed(state, id) {
            state.played = id
        },
        //状态切换
        toogle(state) {
            state.isplaying = !state.isplaying
        }
    }
}