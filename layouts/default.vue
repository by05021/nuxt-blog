<template>
  <div id="app">
    <Header />
    <Nuxt />
  </div>
</template>
<script>
import Header from "../components/Header";
export default {
  components: {
    Header,
  },
};
</script>
<style lang="less">
body {
  cursor: data-uri("../assets/images/normal.cur"), auto;
}
p {
  cursor: data-uri("../assets/images/texto.cur"), auto;
}
a {
  transition: color 0.2s ease-out, border 0.2s ease-out, opacity 0.2s ease-out;
  cursor: data-uri("../assets/images/ayuda.cur"), auto;
}
</style>
