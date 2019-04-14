<template>
  <div id="app">
    <Loading :state="state"></Loading>
    <Container :state="state" :images="images" @setState="setState"></Container>
    <Footer :state="state" :languages="languages"></Footer>
  </div>
</template>

<script>
import Loading from './components/Loading.vue';
import Container from './components/Container.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'app',
  data () {
    return {
      state: {
        loading: true,
        output: false
      },
      images: {},
      languages: {
        中: 'zh_cn',
        En: 'en_us',
        日: 'ja_jp',
        De: 'de_de'
      }
    };
  },
  methods: {
    loadImages () {
      const that = this;
      const sources = {
        O: require('@/assets/images/O.png'),
        R: require('@/assets/images/R.png'),
        Ob: require('@/assets/images/Ob.png')
      };
      const bgColorArr = [
        '#caad9f',
        '#f0c869',
        '#6abce0',
        '#9ac4bd',
        '#fad0c4',
        '#9ec6cd'
      ];
      // Set background color
      document.documentElement.style.setProperty(
        '--bg-color',
        bgColorArr[Math.floor(Math.random() * bgColorArr.length)]
      );
      const cacheImages = {};
      let index = 0;
      const attCount = Object.getOwnPropertyNames(sources).length;
      for (const imgItem in sources) {
        cacheImages[imgItem] = new Image();
        cacheImages[imgItem].onload = function () {
          index++;
          if (index === attCount) {
            that.images = cacheImages;
            console.log('Image loaded.');
            window.setTimeout(() => {
              that.state.loading = false;
            }, 1000);
          }
        };
        cacheImages[imgItem].src = sources[imgItem];
      }
    },
    setState (state) {
      this.state = state;
    }
  },
  created () {
    this.loadImages();
  },
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
