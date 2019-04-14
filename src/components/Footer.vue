<template>
  <footer class="footer" v-show="!state.loading && !state.output">
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
export default {
  props: {
    state: {
      type: Object,
      default: () => {
        return {
          loading: true,
          output: false
        };
      }
    },
    languages: [Object]
  },
  methods: {
    changeLang (lang) {
      localStorage.lang = lang;
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
