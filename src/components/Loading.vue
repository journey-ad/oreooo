<template>
  <transition name="bounce">
    <div class="content-loading" v-show="show.loading">
      <img class="loading-img" src="../assets/images/oreo.png" alt="loading">
    </div>
  </transition>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  computed: {
    show () {
      return this.$store.state.show;
    }
  },
  methods: {
    loadImages () {
      const that = this;
      // Set background color
      const bgColorArr = this.$store.state.bgColorArr;
      document.documentElement.style.setProperty(
        '--bg-color',
        bgColorArr[Math.floor(Math.random() * bgColorArr.length)]
      );
      const cacheImages = {};
      const sources = this.$store.state.sources;
      let index = 0;
      const attCount = Object.getOwnPropertyNames(sources).length;
      for (const imgItem in sources) {
        cacheImages[imgItem] = new Image();
        cacheImages[imgItem].onload = function () {
          index++;
          if (index === attCount - 1) {
            that.setImageCache(cacheImages);
            window.setTimeout(() => {
              that.setShow({ loading: false, output: false });
            }, 1000);
            console.log('Image loaded.');
          }
        };
        cacheImages[imgItem].src = sources[imgItem];
      }
    },
    ...mapMutations(['setImageCache', 'setShow', 'changeLang'])
  },
  created () {
    this.loadImages();
  }
};
</script>

<style lang="scss">
.content-loading {
  display: flex;
  width: 100vw;
  height: 100vh;
  text-align: center;
  align-items: center;

  .loading-img {
    width: 30%;
    max-width: 20rem;
    max-height: 20rem;
    margin: 0 auto;
    animation: rotate 6s infinite linear;
  }

  &.bounce-enter-active {
    animation: bounce-in 0.5s;
  }

  &.bounce-leave-active {
    animation: bounce-in 0.5s reverse;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }

    50% {
      transform: scale(1.1);
    }

    100% {
      transform: scale(1);
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
  }
}
</style>
