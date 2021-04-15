export const state = () => ({
    categoryNav: [],
    userInfo: {},
    config: [],
    menu: []
})

export const mutations = {
    setCategoryNav(state, data) {
        state.categoryNav = data
    },
    setUserInfo(state, data) {
        state.userInfo = data
    },
    setConfig(state, data) {
        state.config = data
    },
    setMenu(state, data) {
        state.menu = data
    }
}

export const actions = {
    //获取分类，用户基本信息，配置信息，自定义菜单
    async nuxtServerInit({ commit }, { $axios }) {
        const [categoryNav, userInfo, config, menu] = await Promise.allSettled([
            $axios.$get('/api/blog/category/category/v1/list'),
            $axios.$get('/api/blog/auth/master/v1/get'),
            $axios.$get('/api/blog/config/config-base/v1/list'),
            $axios.$get('/api/blog/menu/front/v1/list?page=1&size=10')
        ])
        commit('setCategoryNav', categoryNav.value.models);
        commit('setUserInfo', userInfo.value.model);
        commit('setConfig', config.value.models);
        commit('setMenu', menu.value.models)
    },
}