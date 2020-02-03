import { getUser } from '../plugins/utils'
export default {
    namespaced: true,
    state: {
        info: getUser() ? getUser() : []
    },
    mutations: {
        setInfo(state, arr) {
            state.info = arr
        },
        updateInfo(state) {
            state.info = []
        }
    }
}