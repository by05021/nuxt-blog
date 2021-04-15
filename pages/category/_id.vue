<template>
  <div class="container">
    <div style="height: 300px"></div>
    <div v-for="(item, index) in categoryList" :key="index">
      {{ item.title }}
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ params, store }) {
    const payload = {
      page: store.state.category.page,
      size: store.state.category.size,
      categoryId: params.id,
    };
    const list = await store.dispatch("category/getCategoryList", payload);
    return { categoryList: list.models };
  },
};
</script>

<style lang="less" scoped>
</style>