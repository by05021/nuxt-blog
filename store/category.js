export const state = () => ({
    page: 1,
    size: 10,
    finished: false,
    loading: true,
    categoryList: []
});

export const mutations = {
    setPage(state, data) {
        state.page = data;
    },
    setFinished(state, data) {
        state.finished = data;
    },
    setLoading(state, data) {
        state.loading = data;
    },
    setCategoryList(state, data) {
        state.categoryList = data;
    },
};

export const actions = {
    async getCategoryList({ commit }, { page, siez, categoryId }) {
        const list = await this.$axios.$get('/api/blog/posts/posts/v1/list', { params: { page, siez, categoryId } });
        console.log(list);
        // commit('setCategoryList', list);
    }
}