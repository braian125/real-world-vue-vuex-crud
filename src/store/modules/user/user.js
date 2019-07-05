export default {
    namespaced: true,
    state: {
        users: [],
    },
    getters: {
        users: state => state.users
    },
    mutations: {
        SET_USERS: (state, payload) => state.users = payload,
        SET_USER: (state, payload) => state.users[state.users.findIndex(user => user.id === payload.id)] = payload,
        SOCKET_USER: (state, payload) => {
            console.log(payload)
            state.users.push(payload)
        },
    },
    actions: {
        all({commit}) {
            this.dispatch('index', 'user')
            .then((data) => {
                commit('SET_USERS', data)
            }).catch(error => {
            })
        },
        save({commit}, user) {
            return this.dispatch('create', {endpoint: 'user', params: user})
            .then((data) => {
            }).catch(error => {
            })
        },
        destroy({commit}, user) {
            return this.dispatch('destroy', {endpoint: 'user', params: user})
            .then((data) => {
                this.dispatch('user/refresh', data)
            }).catch(error => {
            })
        },
        refresh({commit}, user) {
            commit('SET_USER', user)
        }
    }
}