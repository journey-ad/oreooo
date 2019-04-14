<template>
  <div class="container" v-show="!state.loading">
    <div class="design" v-show="!state.loading && !state.output">
      <div class="icon tooltip">
        <span class="tooltiptext" v-html="$t('tooltip')"></span>
      </div>
      <div class="title">
        <div class="meta" v-t="'input.meta'"></div>
        <div v-show="oreoStr">
          <div class="input str" v-show="oreoStr">
            <span>{{oreoStr}}</span>
          </div>
        </div>
        <div v-show="!oreoStr">
          <div class="input str placeholder">
            <span v-t="'input.placeholder'"></span>
            <img class="icon" @click="getRandom()" src="../assets/images/random.svg">
          </div>
        </div>
      </div>
      <div class="control">
        <div @click="strAdd('o')" class="btn small" v-t="'input.btn.o'"></div>
        <div @click="strAdd('r')" class="btn small" v-t="'input.btn.r'"></div>
        <div @click="strAdd('-')" class="btn small" v-t="'input.btn.and'"></div>
        <div @click="strAdd('-1')" class="btn small">-1</div>
      </div>
      <div @click="generateImage()" class="index-btn" v-t="'input.generate'"></div>
    </div>
    <div class="output" v-show="!state.loading && state.output">
      <div class="title">
        <div class="meta" v-t="'output.meta'"></div>
        <div class="output str">{{oreoStr}}</div>
      </div>
      <div class="output-image">
        <canvas width="240rem" height="500rem" ref="oreoCanvas" id="oreoCanvas"></canvas>
      </div>
      <div v-if="isIOS()" @click="showImage" class="btn" v-t="'output.show'"></div>
      <div v-else @click="downloadImage" class="btn" v-t="'output.save'"></div>
      <div @click="backToInput" class="btn" v-t="'output.back'"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      oreoArr: [],
      imgUrl: ''
    };
  },
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
    images: [Object]
  },
  computed: {
    oreoStr () {
      let str = '';
      this.oreoArr.forEach((item, index) => {
        switch (item) {
        case 'O':
        case 'Ob':
          str += this.$i18n.tc('basic.o', index + 1);
          break;
        case 'R':
          str += this.$i18n.tc('basic.r', index + 1);
          break;
        case '-':
          str += this.$i18n.t('basic.and');
          break;
        default:
          break;
        }
      });
      return str;
    }
  },
  methods: {
    keyEvent (ev) {
      // console.log(ev.keyCode);
      if (!this.state.loading && !this.state.output) {
        // input Page
        switch (ev.keyCode) {
        case 79:
          this.strAdd('o');
          break;
        case 82:
          this.strAdd('r');
          break;
        case 8:
          this.strAdd('-1');
          break;
        case 32:
        case 189:
          this.strAdd('-');
          break;
        case 13:
          this.generateImage();
          break;
        default:
          break;
        }
      } else if (!this.state.loading && this.state.output) {
        // output Page
        if (ev.keyCode === 8) {
          this.backToInput();
        }
      }
    },
    strAdd (str) {
      switch (str) {
      case 'o':
        if (this.oreoArr.length === 0) {
          this.oreoArr.push('O');
        } else {
          this.oreoArr.push('Ob');
        }
        break;
      case 'r':
        this.oreoArr.push('R');
        break;
      case '-':
        if (
          this.oreoArr.length > 0 &&
            this.oreoArr[this.oreoArr.length - 1] !== '-'
        ) {
          this.oreoArr.push('-');
        }
        break;
      case '-1':
        if (this.oreoArr.length > 0) {
          this.oreoArr.pop();
        }
        break;
      default:
        break;
      }
    },
    getRandom () {
      for (let i = 0; i < Math.floor(Math.random() * 8) + 1; i++) {
        const random = Math.random() * 5;
        let str = '';
        if (random < 1) {
          str = '-';
        } else if (random < 3) {
          str = 'o';
        } else {
          str = 'r';
        }
        for (let j = 0; j < Math.floor(Math.random() * 4) + 1; j++) {
          // console.log(i, str, j);
          this.strAdd(str);
        }
      }
      if (this.oreoArr[this.oreoArr.length - 1] === '-') {
        this.oreoArr.pop();
      }
      if (this.oreoArr.length === 0) {
        this.getRandom();
      }
    },
    generateImage () {
      if (this.oreoArr.length > 0) {
        const that = this;
        this.$emit('setState', { loading: true, output: false });
        const oreoArr = this.oreoArr;
        const drawArr = [];

        // Delete '-' at the end
        if (oreoArr[oreoArr.length - 1] === '-') {
          oreoArr.pop();
        }

        // Canvas height calculation
        let height = 0;
        for (let index = 0; index < oreoArr.length; index++) {
          const thisLayer = oreoArr[index];
          if (thisLayer !== '-') {
            const drawItem = {
              image: this.images[thisLayer],
              x: thisLayer === 'R' ? 10 : 0,
              y: height,
              width: thisLayer === 'R' ? 220 : 240,
              height: thisLayer === 'R' ? 155 : 160
            };
            drawArr.splice(0, 0, drawItem);
            height += 24;
          } else {
            height += 72;
          }
        }
        height += 160 - 24; // Add the last image's height.

        const canvas = this.$refs.oreoCanvas;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        drawArr.forEach(item => {
          ctx.drawImage(item.image, item.x, item.y, item.width, item.height);
        });

        this.imgUrl = canvas.toDataURL('image/png');
        setTimeout(() => {
          that.$emit('setState', { loading: false, output: true });
        }, 1000);
      }
    },
    downloadImage () {
      const a = document.createElement('a');
      a.href = this.imgUrl;
      a.download = 'oreo.png';
      a.dispatchEvent(new MouseEvent('click', {}));
    },
    showImage () {
      window.open(this.imgUrl);
    },
    backToInput () {
      this.state.output = false;
      this.oreoArr = [];
      this.imgUrl = '';
    },
    isIOS () {
      const u = window.navigator.userAgent;
      const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      return isiOS;
    }
  },
  mounted () {
    const that = this;
    window.addEventListener('keyup', function (e) {
      that.keyEvent(e);
    });
  }
};
</script>

<style lang="scss">
.container {
  position: relative;
  text-align: center;
  width: 75%;
  max-width: 60rem;
  background-color: var(--white);
  margin: 4rem auto;
  padding: 6rem 4rem;
  border-radius: 2rem;
  box-shadow: 0rem 0.5rem 1rem var(--shadow-opacity);

  .tooltip {
    position: absolute;
    width: 2.4rem;
    height: 2.4rem;
    right: 2.4rem;
    top: 2.4rem;
    opacity: 0.2;
    transition: opacity 0.2s;
    background-image: url("../assets/images/tip.svg");
    background-size: 2.4rem 2.4rem;
    background-repeat: no-repeat;

    &:hover {
      opacity: 0.8;
      .tooltiptext {
        visibility: visible;
      }
    }

    .tooltiptext {
      visibility: hidden;
      white-space: nowrap;
      font-size: 1.4rem;
      background-color: var(--black-opacity);
      color: var(--white);
      text-align: left;
      padding: 0.5rem 0.8rem;
      border-radius: 0.6rem;

      /* 定位 */
      position: absolute;
      z-index: 1;
      top: 3.6rem;
      right: 0rem;
    }
  }

  @media only screen and (max-width: 500rem) {
    .container .tooltip {
      display: none;
    }
  }
  .control {
    display: flex;
    justify-content: center;
  }

  .btn {
    display: inline-block;
    border: 0.2rem solid var(--black);
    font-size: 2rem;
    line-height: 2rem;
    padding: 1rem 1.6rem;
    margin: 1rem;
    border-radius: 3rem;
    transition: all 0.2s;

    &:hover {
      cursor: pointer;
      background-color: var(--black);
      color: var(--white);
    }

    .small {
      font-size: 1.8rem;
    }
  }

  .index-btn {
    background-color: var(--black);
    color: var(--white);
    height: 4rem;
    line-height: 4rem;
    font-size: 2.4rem;
    margin: 2rem -4rem -6rem;
    padding: 2rem 4rem;
    border-radius: 0 0 2rem 2rem;
    transition: all 0.2s;

    &:hover {
      cursor: pointer;
      background-color: var(--black-hover);
      color: var(--white);
      font-size: 2.6rem;
    }
  }

  .title {
    .meta {
      color: var(--black);
      font-size: 2.8rem;
      height: 4rem;
      line-height: 4rem;
      margin: 1rem 0;
    }

    .str {
      color: var(--black);
      margin: 2rem 0;
    }
    .input {
      &.str {
        display: flex;
        align-items: center;
        font-size: 4.2rem;
        border: 1px solid var(--border);
        background: var(--gray-f6);
        padding: 1.4rem;
        min-height: 4.2rem;
        word-break: break-all;
        border-radius: 2rem;
      }

      span {
        flex: 1;
      }

      .icon {
        width: 2.6rem;
        height: 2.6rem;
        margin: 0 1rem;
        opacity: 0.4;
        transition: opacity 0.2s;
        &:hover {
          cursor: pointer;
          opacity: 1;
        }
      }
    }

    .placeholder {
      color: var(--gray);
    }

    .output.str {
      font-size: 4.8rem;
      word-break: break-all;
    }
  }

  .output-image {
    margin: 2rem 0;
    padding: 2rem 0;
    -webkit-touch-callout: text;
    -webkit-user-select: text;
    -khtml-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;
  }
}
</style>
