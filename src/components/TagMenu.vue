<template>
  <n-space justify="center" :size="30">
    <div v-for="(item, index) in menuData" :key="index">
      <n-dropdown
        v-if="item.length === 2"
        trigger="hover"
        :options="getDropdownOptions(item)"
        @select="onSelect"
      >
        <n-button
          :text="true"
          size="large"
          :type="getButtonType(store.state.AtPageFilesName === item[0])"
          @click="onClick(false)"
        >
          {{ item[0] }}
        </n-button>
      </n-dropdown>
      <n-button
        v-else
        :text="true"
        size="large"
        :type="getButtonType(store.state.AtPageFilesName === item[0])"
        @click="onClick(true, item[0])"
      >
        {{ item[0] }}
      </n-button>
    </div>
  </n-space>
</template>

<script setup>
import { useStore } from "vuex";
import { NSpace, NButton, NDropdown } from "naive-ui";
import router from "@/router";
import data from "@/assets/data.json";
import { clearRubbish } from "@/assets/utils.js";

const store = useStore();
const menuData = data.menuData;

const getDropdownOptions = (data) => {
  const options = [];
  for (const i in data[1]) {
    options.push({
      label: data[1][i],
      key: JSON.stringify([`/${data[0]}/${data[1][i]}`, data[0]]),
    });
  }

  return options;
};

const getButtonType = (at) => {
  if (at) {
    return "primary";
  } else {
    return "default";
  }
};

const onClick = async (click, name = "") => {
  if (click) {
    store.commit("setState", (state) => {
      state.AtPageFilesName = name;
    });
    await router.push(`/${name}`);
    store.state.init();
    clearRubbish();
  }
};

const onSelect = async (key) => {
  key = JSON.parse(key);

  await router.push(key[0]);
  store.commit("setState", (state) => {
    state.AtPageFilesName = key[1];
  });
  store.state.init();
  clearRubbish();
};
</script>
