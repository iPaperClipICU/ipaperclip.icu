<template>
  <n-tabs
    v-if="showTabs"
    type="line"
    justify-content="space-evenly"
    :default-value="tabsDefaultValue"
    @update:value="handleUpdateValue"
  >
    <n-tab v-for="(item, index) in tabData" :key="index" :name="item">
      {{ item }}
    </n-tab>
  </n-tabs>
</template>

<script>
import { ref, defineComponent } from "vue";
// import { NIcon, NMenu } from "naive-ui";
// import router from "@/router";
import { NTabs, NTab } from "naive-ui";

const init = (data) => {
  const path = location.pathname;
  if (path == "/") return;

  const filesName = decodeURIComponent(path.split("/")[1]);
  var tagName = decodeURIComponent(path.split("/")[2]);

  for (const i in data) {
    const filesData = data[i];

    if (filesData.name == filesName) {
      // 是否有Tag
      if (filesData.data[0].type != "tag") return;

      if (tagName == "undefined") {
        tagName = filesData.data[0].name;
      }

      for (const ii in filesData.data) {
        const tagData = filesData.data[ii];

        if (tagData.name == tagName) {
          tabsDefaultValue.value = tagData.name;
        }
        tabData.value.push(tagData.name);
      }
      showTabs.value = true;
    }
  }
};

const showTabs = ref(false);
const tabsDefaultValue = ref("");
const tabData = ref([]);
export default defineComponent({
  components: { NTabs, NTab },
  props: ["data"],
  setup(props) {
    init(props.data);
    return {
      showTabs,
      tabsDefaultValue,
      tabData,
      handleUpdateValue: (value) => {
        const filesName = decodeURIComponent(location.pathname.split("/")[1]);
        // router.push(`/${filesName}/${value}`);
        window.location.href = `/${filesName}/${value}`;
      },
    };
  },
});
</script>
