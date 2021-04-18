<template>
  <div class="container">
    <div style="height: 2300px"></div>
    <div v-for="(item, index) in categoryList" :key="index">
      {{ item.title }}
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ params, store }) {
    const data = await store.dispatch("category/getCategoryList", {
      page: store.state.category.page,
      size: store.state.category.size,
      categoryId: params.id,
    });
    if (data.success === 1) {
      return { categoryList: data.models };
    }
    error({ statusCode: 400, message: "id有误，查询失败" });
  },
};
</script>

<style lang="less" scoped>
</style>