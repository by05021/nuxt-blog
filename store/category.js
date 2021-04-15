export const state = () => ({
    page: 1,
    size: 10,
    finished: false,
    loading: true,
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
    }
};

export const actions = {
    getCategoryList({ commit }, { page, siez, categoryId }) {
        return this.$axios.$get('/api/blog/posts/posts/v1/list', { params: { page, siez, categoryId } });
    }
}