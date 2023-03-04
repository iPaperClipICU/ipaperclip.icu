<template>
  <n-card title="文字稿" hoverable>
    <template #header-extra>
      <n-button quaternary type="primary" @click="showAbout = true">
        关于来源
      </n-button>
    </template>
    <n-result v-if="showError" status="error" title="加载失败">
      <template #footer>
        <n-button @click="refreshButtonClick()">刷新</n-button>
      </template>
    </n-result>
    <n-skeleton v-if="showLoad && !showError" text :repeat="5" />
    <MarkdownView v-if="!showLoad && !showError" />
    <n-modal
      v-model:show="showAbout"
      preset="card"
      style="width: 600px"
      title="关于文字稿来源"
      :bordered="false"
    >
      <n-p
        >来源:
        <n-a href="https://github.com/ipaperclip/paperclipfans" target="_blank"
          >ipaperclip/paperclipfans</n-a
        >
        和
        <n-a href="https://github.com/Just-Prog/paperclipfans" target="_blank"
          >Just-Prog/paperclipfans</n-a
        ></n-p
      >
      <n-p
        >如果您希望对文字稿进行修改, 请前往上述两个仓库,
        当我们注意到上游仓库更新时, 我们将会同步更新</n-p
      >
    </n-modal>
  </n-card>
</template>

<script setup lang="ts">
import { h, onMounted, ref, type VNode } from "vue";
import {
  NA,
  NP,
  // NH1,
  NLi,
  NOl,
  NCard,
  NAlert,
  NModal,
  NButton,
  NResult,
  NDivider,
  NSkeleton,
} from "naive-ui";
import cheerio from "cheerio";
import showdown from "showdown";
import type { ChildNode } from "domhandler/lib/node";

const showAbout = ref<boolean>(false);
const showError = ref<boolean>(false);
const showLoad = ref<boolean>(true);
const MarkdownView = ref(() => h("div", null, ""));

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
});

const main = async (url: string) => {
  showError.value = false;
  showLoad.value = true;
  // 所以下面是怎么跑起来的呢？💩
  const resp = await fetch(url).catch(() => {
    showError.value = true;
    return null;
  });
  if (resp === null) return;
  let mdText = await resp.text().catch(() => {
    showError.value = true;
    return null;
  });
  if (mdText === null) return;
  mdText = mdText.replace(/\r/g, "");

  // const footerReg = /\[\^\d\]:\n[^[]+/;
  const footerReg = /\^\d\]:\r?\n?[^^]+/g;
  const footerList = mdText.match(footerReg);
  mdText = mdText.replace(footerReg, "").replace(/\[$/g, "");

  const abstractReg = /!!! abstract ""(\r?\n.*\r?\n(\t| {4}).+)+/gm;
  const abstract = (() => {
    const match = mdText.match(abstractReg);
    if (match !== null) return match[0] || null;
    else return null;
  })();
  mdText = mdText.replace(abstractReg, "<abstract></abstract>");

  const md = new showdown.Converter();
  let html = md.makeHtml(mdText);

  if (abstract !== null)
    html = html.replace(
      "<p><abstract></abstract></p>",
      `<abstract>${abstract}</abstract>`
    );

  const parseBold = (strs: string | (VNode | string)[]): (VNode | string)[] => {
    // 由 Copilot 生成 🙃
    // **bold** __bold__
    const REG = [/\*\*[^*]+\*\*/, /__[^_]+__/];
    if (!Array.isArray(strs)) strs = [strs];

    let childrenList: (VNode | string)[] = [];
    for (let str of strs) {
      if (typeof str === "string" && str.search(REG[0]) !== -1) {
        // **bold**
        const match = (str.match(REG[0]) as RegExpMatchArray)[0];
        const name = match.replace(/^\*\*/, "").replace(/\*\*$/, "");
        str.split(match).forEach((value, index) => {
          if (index !== 0) childrenList.push(h("b", null, name));
          childrenList = childrenList.concat(parseBold(value));
        });
      } else if (typeof str === "string" && str.search(REG[1]) !== -1) {
        // __bold__
        const match = (str.match(REG[1]) as RegExpMatchArray)[0];
        const name = match.replace(/^__/, "").replace(/__$/, "");
        str.split(match).forEach((value, index) => {
          if (index !== 0) childrenList.push(h("b", null, name));
          childrenList = childrenList.concat(parseBold(value));
        });
      } else {
        childrenList.push(str);
      }
    }

    return childrenList;
  };
  const parseLink = (strs: string | string[]): (VNode | string)[] => {
    // [name](url) <url>

    const REG = [/\[[^[]+\]\(http(s)?:\/\/[^(]+\)/, /<http(s)?:\/\/[^<]+>/];
    if (!Array.isArray(strs)) strs = [strs];

    let childrenList: (VNode | string)[] = [];
    for (const str of strs) {
      if (str.search(REG[0]) !== -1) {
        // [name](url)
        const match = (str.match(REG[0]) as RegExpMatchArray)[0];
        const name = (match.match(/\[.+\]/) as RegExpMatchArray)[0]
          .replace(/^\[/, "")
          .replace(/\]$/, "");
        const url = (match.match(/\(http(s)?:\/\/.+\)/) as RegExpMatchArray)[0]
          .replace(/^\(/, "")
          .replace(/\)$/, "");
        str.split(match).forEach((value, index) => {
          if (index !== 0)
            childrenList.push(
              h(NA, { href: url, target: "_blank" }, { default: () => name })
            );
          childrenList = childrenList.concat(parseLink(value));
        });
      } else if (str.search(REG[1]) !== -1) {
        // <url>
        const match = (str.match(REG[1]) as RegExpMatchArray)[0];
        const url = (match.match(/<http(s)?:\/\/.+>/) as RegExpMatchArray)[0]
          .replace(/^</, "")
          .replace(/>$/, "");
        str.split(match).forEach((value, index) => {
          if (index !== 0)
            childrenList.push(
              h(NA, { href: url, target: "_blank" }, { default: () => url })
            );
          childrenList = childrenList.concat(parseLink(value));
        });
      } else if (str !== "") childrenList.push(str);
    }

    return childrenList;
  };
  const parseChildren = (ele: ChildNode): VNode | string | undefined => {
    if (ele.type === "text") {
      // Text
      return ele.data;
    } else if (ele.type === "tag") {
      const childrenList: (VNode | string)[] = [];
      for (const children of ele.children) {
        const parse = parseChildren(children);
        if (parse !== undefined) childrenList.push(parse);
      }
      if (ele.name === "h1") {
        // H1
        // return h(NH1, null, { default: () => childrenList });
      } else if (ele.name === "p") {
        // p
        return h(NP, null, { default: () => childrenList });
      } else if (ele.name === "img") {
        // img
        const { src, alt } = ele.attribs;
        return h("img", {
          src,
          alt,
          style: "max-width: 100%; min-height: 40px",
          loading: "lazy",
        });
      } else if (ele.name === "abstract") {
        // abstract
        if (typeof childrenList[0] !== "string") throw new Error(); // TODO: Error
        const match = childrenList[0].match(/(\t| {4}).+\n?/gm);
        if (match !== null) {
          let msgs: (VNode | string)[] = [];
          for (const i of match) {
            msgs = msgs.concat(
              parseLink(
                i.replace("\t", "").replace("\n", "").replace("    ", "")
              )
            );
            msgs.push(h("br"));
          }
          return h(
            NAlert,
            {
              "show-icon": false,
            },
            { default: () => msgs }
          );
        }
      }
    }
  };

  const mdCD: (VNode | string)[] = [];
  cheerio
    .load(html)("h1, p, abstract")
    .each((i, elem) => {
      if (
        elem.type === "tag" &&
        elem.name === "p" &&
        elem.children[0].type === "text" &&
        elem.children[0].data.search(/!!! note ".*"/) !== -1
      ) {
        return;
      }
      const parse = parseChildren(elem);
      if (parse !== undefined) mdCD.push(parse);
    });
  if (footerList !== null) {
    mdCD.push(h(NDivider));
    const olList: VNode[] = [];
    for (const ii of footerList) {
      const i = ii
        .replace(/\[$/g, "")
        .replace(/\r?\n?!!! note[^]+$/, "")
        .replace(/^\^\d\]:( |(\r?\n( {4}|\t)))?/g, "");

      // const num = numMatch[0].replace("[^", "").replace("]:\n    ", "");
      const msgList: (VNode | string)[] = [];
      i.split("\n").forEach((v) => {
        if (v === "") return;

        let msg: string | (VNode | string)[] = v;
        if (msg.search(/( {4}|\t).+/) !== -1)
          msg = msg.replace(/( {4}|\t)/, "");
        msg = parseLink(msg);
        msg = parseBold(msg);

        msgList.push(h("p", { class: "footer" }, { default: () => msg }));
      });
      olList.push(h(NLi, null, { default: () => msgList }));
    }
    mdCD.push(h(NOl, null, { default: () => olList }));
  }
  MarkdownView.value = () => h("div", null, { default: () => mdCD });
  showLoad.value = false;
};
const refreshButtonClick = () => {
  main(props.url);
};
onMounted(() => {
  main(props.url);
});
</script>

<style>
.n-p {
  font-size: 15px !important;
}

.footer {
  margin: 5px 0;
  font-size: 13px;
}
.footer:first-child {
  margin-top: 0;
}
/* .footer:last-child {
  margin-bottom: 0;
} */
</style>
