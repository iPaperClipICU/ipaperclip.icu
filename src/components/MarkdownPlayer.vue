<template>
  <n-card title="文字稿" hoverable>
    <n-result v-if="showError" status="error" title="加载失败">
      <template #footer>
        <n-button @click="refreshButtonClick()">刷新</n-button>
      </template>
    </n-result>
    <n-skeleton v-if="showLoad && !showError" text :repeat="5" />
    <MarkdownView v-if="!showLoad && !showError" />
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
  NButton,
  NResult,
  NDivider,
  NSkeleton,
} from "naive-ui";
import showdown from "showdown";
import cheerio, { type Element as cheerioElementType } from "cheerio";

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
  // 💩
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
  const footerReg = /\^\d\]:\r?\n[^^]+/g;
  const footerList = mdText.match(footerReg);
  (window as any).footerList = footerList;
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

  const $ = cheerio.load(html);

  const parseLink = (str: string): (VNode | string)[] | [] => {
    const match = str.match(/\[.+\]\(.+\)/);
    const nameMatch = str.match(/\[.+\]/);
    const urlMatch = str.match(/\(.+\)/);
    if (match !== null && nameMatch !== null && urlMatch !== null) {
      const name = nameMatch[0].replace("[", "").replace("]", "");
      const url = urlMatch[0].replace("(", "").replace(")", "");

      return [str.replace(match[0], ""), h(NA, { href: url }, name)];
    } else return [];
  };

  const mdCD: VNode[] = [];
  $("h1, p, abstract").each((i, elem) => {
    const children = elem.children;
    if (elem.name === "h1" && children[0].type === "text") {
      // 解析 H1
      // mdCD.push(h(NH1, null, children[0].data));
    } else if (elem.name === "p") {
      if (
        children[0].type === "text" &&
        children[0].data.search(/!!! note ".*"/) === -1
      ) {
        // 解析 P Text
        mdCD.push(h(NP, null, children[0].data));
      } else if (children[0].type === "tag" && children[0].name === "img") {
        // 解析 img
        const node = elem.childNodes[0] as cheerioElementType;
        const src = node.attribs.src;
        const alt = node.attribs.src;
        mdCD.push(
          h("img", { src, alt, style: "max-width: 100%", loading: "lazy" })
        );
      }
    } else if (elem.name === "abstract" && children[0].type === "text") {
      // 解析 abstract
      const match = children[0].data.match(/(\t| {4}).+\n?/gm);
      if (match !== null) {
        let msgs: (VNode | string)[] = [];
        for (const i of match) {
          const [msg, link] = parseLink(
            i.replace("\t", "").replace("\n", "").replace("    ", "")
          );
          if (msg === undefined) {
            msgs.push(msg, h("br"));
          } else {
            msgs.push(msg, link, h("br"));
          }
        }
        mdCD.push(
          h(
            NAlert,
            {
              "show-icon": false,
            },
            msgs
          )
        );
      }
    }
  });
  if (footerList !== null) {
    mdCD.push(h(NDivider));
    const olList: VNode[] = [];
    for (const ii of footerList) {
      const i = ii
        .replace(/\[$/g, "")
        .replace(/\r?\n?!!! note[^]+$/, "")
        .replace(/^\^\d\]:\r?\n( {4}|\t)/g, "");

      // const num = numMatch[0].replace("[^", "").replace("]:\n    ", "");
      const msgList: (VNode | string)[] = [];
      i.split("\n").forEach((v) => {
        if (v === "") return;
        else {
          let msg: string | (VNode | string)[] = v;
          if (msg.search(/( {4}|\t).+/) !== -1)
            msg = msg.replace(/( {4}|\t)/, "");

          // TODO: BUG 当两种样式都存在
          if (msg.search(/<http(s)?:\/\/.+>/) !== -1) {
            const urlMatch = (
              msg.match(/<http(s)?:\/\/.+>/) as RegExpMatchArray
            )[0];
            const url = urlMatch.replace("<", "").replace(">", "");
            const tmp: (VNode | string)[] = [];
            msg.split(urlMatch).forEach((v, i) => {
              if (i === 0) tmp.push(v);
              else {
                tmp.push(h(NA, { href: url }, url));
                tmp.push(v);
              }
            });
            msg = tmp;
          } else if (msg.search(/\[.+\]\(http(s)?:\/\/.+\)/) !== -1) {
            const urlMatch = (
              msg.match(/\[.+\]\(http(s)?:\/\/.+\)/) as RegExpMatchArray
            )[0];
            const name = urlMatch.replace(/\]\(.+\)/g, "").replace(/^\[/g, "");
            const url = urlMatch.replace(/\[.+\]\(/g, "").replace(/\)$/g, "");
            const tmp: (VNode | string)[] = [];
            msg.split(urlMatch).forEach((v, i) => {
              if (i === 0) tmp.push(v);
              else {
                tmp.push(h(NA, { href: url }, name));
                tmp.push(v);
              }
            });
            msg = tmp;
          }

          msgList.push(h("p", { class: "footer" }, msg));
        }
      });
      olList.push(h(NLi, null, msgList));
    }
    mdCD.push(h(NOl, null, olList));
  }
  MarkdownView.value = () => h("div", null, mdCD);
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
