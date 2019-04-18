<template>
  <footer class="footer" v-show="!show.loading && !show.output">
    <ul class="lang-list">
      <li
        class="lang"
        @click="changeLang(value)"
        v-for="(value, key) in languages"
        :key="value"
      >{{key}}</li>
    </ul>
    <div class="meta">
      <a href="https://imjad.cn" target="_blank">journey-ad</a>
      <a href="https://github.com/journey-ad/oreooo" target="_blank">Github</a>
    </div>
  </footer>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data () {
    return {
      languages: this.$store.state.languages
    };
  },
  computed: mapState({
    show: state => state.show,
    lang: state => state.lang
  }),
  methods: {
    changeLang (lang) {
      this.$store.commit('changeLang', lang);
      this.$i18n.locale = lang;
    }
  }
};
</script>

<style lang="scss">
.footer {
  text-align: center;
  font-size: 1.8rem;
  .lang-list {
    margin: 0;
    padding: 0;
    margin: 1rem 0;
    .lang {
      list-style-type: none;
      display: inline;
      &:hover {
        cursor: pointer;
        color: var(--black-hover);
      }
      &:not(:first-child):before {
        content: " / ";
      }
    }
  }
  .meta {
    margin: 1rem 0;
    opacity: 0.8;
  }
}
</style>
