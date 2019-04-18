<template>
  <div id="app">
    <Loading></Loading>
    <Container></Container>
    <Footer></Footer>
  </div>
</template>

<script>
import Loading from './components/Loading.vue';
import Container from './components/Container.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'app',
  components: {
    Loading,
    Container,
    Footer
  }
};
</script>

<style lang="scss">
@import url("./assets/style/style.scss");
</style>
