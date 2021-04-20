<template>
  <div class="article-wrapper">
    <div class="pattern-center-blank" />
    <div class="article-top">
      <div class="pattern-attachment-img">
        <img class="lazyload" :src="topImg" alt="" />
      </div>
      <div class="single-header">
        <h1 class="entry-title">{{ data.title }}</h1>
        <p class="entry-census">
          <span><img :src="userInfo.avatar" alt="" /></span>
          <span>{{ userInfo.name }}</span>
          <span class="bull">·</span>
          <span>{{ getTime(data.createTime) }}</span>
          <span class="bull">·</span>
          <span>{{ data.views }} 次阅读</span>
        </p>
      </div>
    </div>
    <div class="main-wrapper">
      <div class="flex-items">
        <div class="cell">
          <div class="entry-content" id="content" v-html="compiledMarkdown" />
        </div>
        <a-anchor
          class="toc"
          affix
          showInkInFixed
          :offsetTop="100"
          @click="handleClick"
        >
          <a-anchor-link
            v-for="(item, index) in navList"
            :key="index"
            :href="`#data-${item.index}`"
            :title="item.title"
          >
            <a-anchor-link
              v-for="(item, index) in item.children"
              :key="index"
              :href="`#data-${item.index}`"
              :title="item.title"
            >
              <a-anchor-link
                v-for="(item, index) in item.children"
                :key="index"
                :href="`#data-${item.index}`"
                :title="item.title"
              />
            </a-anchor-link>
          </a-anchor-link>
        </a-anchor>
      </div>
    </div>
  </div>
</template>

<script>
import { getrand, getTime } from "../../middleware/public";
import { mapState } from "vuex";
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
let rendererMD = new marked.Renderer();
marked.setOptions({
  renderer: rendererMD,
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
  highlight: (code) => hljs.highlightAuto(code).value,
});
export default {
  async asyncData({ params, store, error }) {
    const id = parseInt(params.id);
    const data = await store.dispatch("getPosts", { id });
    const ListImg = store.state.ListImg;
    if (data.success === 1) {
      return {
        id,
        data: data.model,
        topImg: ListImg[getrand(0, ListImg.length - 1)].img,
      };
    }
    error({ statusCode: 504 });
  },
  data() {
    return {
      navList: [],
    };
  },
  computed: {
    ...mapState(["userInfo"]),
    //此函数将markdown内容进一步的转换
    compiledMarkdown() {
      let index = 0;
      rendererMD.heading = (text, level) => {
        return `<h${level} id="data-${index++}">${text}</h${level}>`;
      };
      return marked(this.data.content);
    },
  },
  created() {
    this.navList = this.handleNavTree();
  },
  methods: {
    handleClick(e) {
      e.preventDefault();
    },
    getTime(createTime) {
      return getTime(createTime);
    },
    getrand(m, n) {
      return getrand(m, n);
    },
    getTitle(content) {
      let nav = [];
      let tempArr = [];
      content.replace(/(#+)[^#][^\n]*?(?:\n)/g, function (match, m1) {
        let title = match.replace("\n", "");
        let level = m1.length;
        tempArr.push({
          title: title.replace(/^#+/, "").replace(/\([^)]*?\)/, ""),
          level: level,
          children: [],
        });
      });
      // 只处理二级到四级标题，以及添加与id对应的index值，这里还是有点bug,因为某些code里面的注释可能有多个井号
      nav = tempArr.filter((item) => item.level >= 2 && item.level <= 4);
      let index = 0;
      return (nav = nav.map((item) => {
        item.index = index++;
        return item;
      }));
    },
    getParentIndex(nav, endIndex) {
      for (var i = endIndex - 1; i >= 0; i--) {
        if (nav[endIndex].level > nav[i].level) {
          return nav[i].index;
        }
      }
    },
    handleNavTree() {
      const navs = this.getTitle(this.data.content);
      navs.forEach((item) => {
        const parentIndex = this.getParentIndex(navs, item.index);
        item.parent = parentIndex;
      });
      return this.filterArray(navs);
    },
    filterArray(data, parent) {
      const self = this;
      var tree = [];
      var temp;
      for (var i = 0; i < data.length; i++) {
        if (data[i].parent === parent) {
          var obj = data[i];
          temp = self.filterArray(data, data[i].index);
          if (temp.length > 0) {
            obj.children = temp;
          }
          tree.push(obj);
        }
      }
      return tree;
    },
  },
};
</script>

<style lang="less" scoped>
.article-wrapper {
  .pattern-center-blank {
    padding-top: 75px;
    background-color: #fff;
  }
  @media (max-width: 768px) {
    .pattern-center-blank {
      padding-top: 50px;
    }
  }
}
.article-top {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
  }
  .pattern-attachment-img {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    background-origin: border-box;
    width: 100%;
    height: 400px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      pointer-events: none;
    }
  }
  .single-header {
    max-width: 900px;
    padding: 0 10px;
    margin-left: auto;
    margin-right: auto;
    text-align: left;
    top: auto;
    bottom: 20px;
    position: absolute;
    left: 0;
    right: 0;
    color: #fff;
    text-shadow: 2px 2px 10px #000;
    z-index: 1;
    .entry-title {
      font-size: 32px;
      width: 100%;
      color: #fff;
      font-weight: bold;
    }
    .entry-census {
      color: #fff;
      font-size: 14px;
      padding: 18px 0 0;
      line-height: 39px;
      span {
        color: #fff;
        font-size: 14px;
        img {
          width: 35px;
          height: 35px;
          border-radius: 100%;
          float: left;
          margin-right: 12px;
        }
      }
      .bull {
        margin: 0 5px;
      }
    }
  }
  @media (max-width: 768px) {
    .pattern-attachment-img {
      height: 280px;
    }
    .single-header {
      .entry-title {
        font-size: 24px;
      }
      .entry-census {
        padding: 0;
      }
    }
  }
}
/deep/ .main-wrapper {
  min-height: 600px;
  max-width: 900px;
  padding: 0 10px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 50px;
  background-color: rgba(255, 255, 255, 0.8);
  @keyframes main {
    0% {
      opacity: 0;
      transform: translateY(50px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .cell {
    margin-right: 25px;
  }
  .entry-content {
    position: relative;
    animation: main 1s;
  }

  .entry-content .begin,
  .single-begin {
    float: left;
    font-size: 3.6em;
    line-height: 1em;
    margin-right: 3px;
    margin-top: 2px;
    font-weight: 700;
  }

  @media screen and (max-width: 860px) {
    .entry-content .begin,
    .single-begin {
      margin-top: 6px;
    }
  }

  .entry-content ul {
    list-style: disc;
    border: 1px dashed #e4e4e4;
    padding: 15px 10px 15px 30px;
    color: #616161;
    margin-left: 0;
    border-radius: 10px;
    margin: 16px 0;
  }

  .entry-content ol {
    list-style: decimal;
    border: 1px dashed #e4e4e4;
    padding: 15px 10px 15px 30px;
    color: #616161;
    margin-left: 0;
    border-radius: 10px;
    margin: 16px 0;
  }

  .entry-content table {
    display: block;
    width: 100%;
    overflow: auto;
  }

  .entry-content table th {
    font-weight: 600;
  }

  .entry-content table th,
  .entry-content table td {
    padding: 6px 13px;
    border: 1px solid #dfe2e5;
  }

  .entry-content table tr {
    background-color: #fff;
    border-top: 1px solid #c6cbd1;
  }

  .entry-content table tr:nth-child(2n) {
    background-color: #f6f8fa;
  }

  .entry-content blockquote {
    padding: 0 1em;
    color: #6a737d;
    border-left: 0.25em solid #dfe2e5;
  }

  .entry-content blockquote > :first-child {
    margin-top: 0;
  }

  .entry-content blockquote > :last-child {
    margin-bottom: 0;
  }

  .entry-content ol li,
  .entry-content ul li {
    padding: 8px 0;
  }

  .entry-content h3 {
    color: #737373;
    margin: 17px 0;
  }

  .entry-content h1 {
    margin: 16px 0;
    clear: both;
    font-size: 24px;
    color: rgb(64, 64, 64);
  }

  .entry-content h2 {
    margin: 18px 0;
    clear: both;
    font-size: 22px;
    color: rgb(64, 64, 64);
  }

  .entry-content h3 {
    margin: 17px 0;
    clear: both;
    font-size: 20px;
    color: rgb(64, 64, 64);
  }

  .entry-content h4 {
    margin: 16px 0;
    clear: both;
    font-size: 18px;
    color: rgb(64, 64, 64);
  }

  .entry-content h5 {
    margin: 15px 0;
    clear: both;
    font-size: 16px;
    color: rgb(64, 64, 64);
  }

  .entry-content h6 {
    margin: 14px 0;
    clear: both;
    font-size: 14px;
    color: rgb(64, 64, 64);
  }

  .entry-content a {
    color: #e67474;
    position: relative;
  }

  .entry-content a:hover {
    color: orange;
    text-decoration: none;
  }

  .entry-content a:after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: orange;
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }

  .entry-content a:hover:after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }

  .entry-content p {
    color: #797979;
    margin: 15px 0 22px;
    line-height: 30px;
  }

  .entry-content hr {
    max-width: 100%;
    height: 50px;
    background: url("../../assets/images/hr.gif") 100% no-repeat;
    border: none;
    margin-top: 15px;
    margin-bottom: 15px;
  }

  .entry-content .post-password-form {
    text-align: center;
  }

  .entry-content a img.alignleft,
  .entry-content a img.alignright,
  .entry-content a img.aligncenter {
    cursor: -webkit-zoom-in;
  }

  .entry-content img {
    max-width: 100%;
  }

  pre {
    position: relative;
    background: #2b3940;
    border-radius: 5px;
    line-height: 1.6;
    margin-bottom: 1.6em;
    font-size: 15px;
    max-width: 100%;
    overflow: auto;
    text-shadow: none;
    color: #000;
    padding: 20px;
    box-shadow: 0 10px 30px 0px rgba(0, 0, 0, 0.4);
  }

  code {
    color: #fff;
    word-break: break-word;
    padding: 2px;
    text-shadow: none;
    border-radius: 0 0 5px 5px;
  }

  .example {
    text-align: center;
    border-radius: 4px;
    margin-bottom: 20px;
    padding: 30px 50px;
    margin: 20px 0;
    i {
      background-color: #fe9600;
    }
  }
  .toc {
    width: 200px;
    h3 {
      padding: 7px 0 7px 16px;
      line-height: 1.143;
      font-size: 16px;
      font-weight: bold;
      color: #fe9600;
    }
    .ant-anchor-link-active > .ant-anchor-link-title {
      color: #fe9600;
    }
    .ant-anchor-link-title:hover {
      color: #fe9600;
    }
    .ant-anchor-ink-ball {
      border: 2px solid #fe9600;
    }
  }
  .flex-items {
    align-items: initial;
  }

  .single-reward {
    position: relative;
    width: 100%;
    margin: 35px auto;
    text-align: center;
    z-index: 90;
    .reward-open {
      position: relative;
      width: 40px;
      height: 40px;
      font-size: 18px;
      padding: 7px;
      color: #fff;
      text-align: center;
      display: inline-block;
      border-radius: 100%;
      background: #d34836;
      cursor: pointer;
    }
    .reward-open:hover .reward-main {
      display: block;
    }
    .reward-main {
      position: absolute;
      top: 40px;
      left: -157px;
      margin: 0;
      padding: 15px 0 0;
      width: 355px;
      background: 0 0;
      display: none;
      animation: main 0.4s;
    }
    .reward-row {
      list-style: disc;
      border: 1px dashed #e4e4e4;
      margin: 0 auto;
      padding: 20px 15px 10px;
      background: #f5f5f5;
      display: inline-block;
      border-radius: 4px;
      cursor: auto;
      li {
        list-style-type: none;
        padding: 0 12px;
        display: inline-block;
        img {
          width: 130px;
          max-width: 130px;
          border-radius: 3px;
          position: relative;
        }
        p {
          color: #666666;
          font-size: 12px;
          text-align: center;
        }
      }
    }
  }

  @media (max-width: 768px) {
    padding: 10px;
    min-height: 400px;
    .cell {
      margin: 0;
    }
    .toc {
      display: none;
    }
  }
}
</style>