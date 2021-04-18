export const state = () => ({
    categoryNav: [],
    userInfo: {},
    config: {},
    menu: [],
    ListImg: [
        { img: 'https://image.bygit.cn/list_01.png' },
        { img: 'https://image.bygit.cn/list_02.png' },
        { img: 'https://image.bygit.cn/list_03.png' },
        { img: 'https://image.bygit.cn/list_04.png' },
        { img: 'https://image.bygit.cn/list_05.png' },
        { img: 'https://image.bygit.cn/list_06.png' },
        { img: 'https://image.bygit.cn/list_07.png' },
        { img: 'https://image.bygit.cn/list_08.png' },
        { img: 'https://image.bygit.cn/list_09.png' },
        { img: 'https://image.bygit.cn/list_10.png' },
        { img: 'https://image.bygit.cn/list_11.png' },
        { img: 'https://image.bygit.cn/list_12.png' },
        { img: 'https://image.bygit.cn/list_13.png' },
        { img: 'https://image.bygit.cn/list_14.png' }
    ],
    bannerList: [
        { img: "https://image.bygit.cn/banner-1.png" },
        { img: "https://image.bygit.cn/banner-2.png" },
        { img: "https://image.bygit.cn/banner-3.png" },
        { img: "https://image.bygit.cn/banner-4.png" },
    ],
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
        commit('setCategoryNav', categoryNav.status === 'fulfilled' ? categoryNav.value.models : []);
        commit('setUserInfo', userInfo.status === 'fulfilled' ? userInfo.value.model : {});

        commit('setMenu', menu.status === 'fulfilled' ? menu.value.models : [])
        if (config.status === 'fulfilled') {
            const list = config.value.models
            let arr = {};
            for (let i = 0; i < list.length; i++) {
                arr[list[i].configKey] = list[i].configValue
            }
            commit('setConfig', arr);
        } else {
            commit('setConfig', {});
        }
    },
    //首页社交
    getSocial() {
        return this.$axios.$get('/api/blog/social/social/v1/info');
    },
    //首页推荐
    getFeature() {
        return this.$axios.$get('/api/blog/posts/weight/v1/list?page=1&size=3');
    },
    //首页博客列表
    getBlogList() {
        return this.$axios.$get('/api/blog/posts/posts/v1/list');
    }
}