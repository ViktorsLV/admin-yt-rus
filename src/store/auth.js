/* eslint-disable */
import firebase from 'firebase/app'
import { register } from 'register-service-worker'

export default {
    actions: {
        async login({dispatch, commit}, {email, password}) {
            try { 
                await firebase.auth().signInWithEmailAndPassword(email, password)
            } catch (err) {
                commit('setError', err)
                throw err
            }
        },
        async logout({commit}) {
            await firebase.auth().signOut()
            await commit('clearInfo') /* clearing the info after signing out */
        },
        async register({ dispatch, commit }, { email, password, name}) {  
            try { 
                await firebase.auth().createUserWithEmailAndPassword(email, password)
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users/${uid}/info`).set({
                    bill: 10000,
                    name: name
                })
            } catch (err) {
                commit('setError', err)
                throw err
            }
        },
        getUid() {
            const user = firebase.auth().currentUser
            return user ? user.uid : null 
        }
    }
}