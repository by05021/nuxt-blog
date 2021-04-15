<template>
  <div>用户id：{{ $route.params.id }}</div>
</template>

<script>
export default {
  async asyncData({ params, store }) {
    let payload = {
      page: store.state.category.page,
      size: store.state.category.size,
      categoryId: params.id,
    };
    store.dispatch("category/getCategoryList", payload);
    return { list: params.id };
  },
};
</script>

<style lang="less" scoped>
</style>