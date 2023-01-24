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
          :type="getButtonType(counter.AtPageFilesName === item[0])"
          @click="onClick(false)"
        >
          {{ item[0] }}
        </n-button>
      </n-dropdown>
      <n-button
        v-else
        :text="true"
        size="large"
        :type="getButtonType(counter.AtPageFilesName === item[0])"
        @click="onClick(true, item[0])"
      >
        {{ item[0] }}
      </n-button>
    </div>
  </n-space>
</template>

<script setup lang="ts">
import { NSpace, NButton, NDropdown } from "naive-ui";

import router from "@/router";
import { useCounterStore } from "@/stores/counter";
import { clearRubbish, getData } from "@/assets/utils";

const data = getData();
const counter = useCounterStore();

const menuData = data.menuData;

const getDropdownOptions = (data: [string, string[]]) => {
  const options = [];
  for (const i in data[1]) {
    options.push({
      label: data[1][i],
      key: JSON.stringify([`/${data[0]}/${data[1][i]}`, data[0]]),
    });
  }

  return options;
};

const getButtonType = (at: boolean) => {
  if (at) {
    return "primary";
  } else {
    return "default";
  }
};

const onClick = async (click: boolean, name: string = "") => {
  if (click) {
    counter.AtPageFilesName = name;
    await router.push(`/${name}`);
    counter.init();
    clearRubbish();
  }
};

const onSelect = async (key: string) => {
  key = JSON.parse(key);

  await router.push(key[0]);
  counter.AtPageFilesName = key[1];
  counter.init();
  clearRubbish();
};
</script>
