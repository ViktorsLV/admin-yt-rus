import firebase from 'firebase/app'

export default {
    state: {
        info: {}
    },
    mutations: {
        setInfo(state, info) {
            state.info = info
        },
        clearInfo(state) {
            /* so the information clears out and does not cache when a user logs out */
            state.info = {}
        }
    },
    actions: {
        async fetchInfo({ dispatch, commit }) {
            try {
                const uid = await dispatch('getUid')
                const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
                commit('setInfo', info)
                
            } catch (err) {
                commit('setError', err)
                throw err
            }
        },
        async updateInfo({dispatch, commit, getters}, toUpdate) {
            try {
                const uid = await dispatch('getUid')
                const updateData = {...getters.info, ...toUpdate}
                await firebase.database().ref(`users/${uid}/info`).update(updateData)
                commit('setInfo', updateData)
                
            } catch (err) {
                commit('setError', err)
                throw err
            }
        }
    },
    getters: {
        info: state => state.info
    }
}