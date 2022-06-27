<template>
  <CMenu />
</template>

<script>
import { h, defineComponent } from "vue";
import data from "@/assets/data.json";
import { NDropdown, NButton, NSpace } from "naive-ui";

const init = () => {
  const filesName = decodeURIComponent(location.pathname.split("/")[1]);
  const getButton = (name, at, click) => {
    let type = "";
    if (at) type = "primary";
    else type = "default";

    return h(
      NButton,
      {
        text: true,
        size: "large",
        type,
        "on-click": () => {
          if (click) location.href = `/${name}`;
        },
      },
      {
        default: () => name,
      }
    );
  };

  let MenuList = [];
  for (const i in data) {
    let at;
    if (filesName == data[i].name) at = true;
    else at = false;

    if (data[i].tag) {
      // 有Tag
      let options = [];
      for (const ii in data[i].data) {
        options.push({
          label: data[i].data[ii].name,
          key: `/${data[i].name}/${data[i].data[ii].name}`,
        });
      }

      MenuList.push(
        h(
          NDropdown,
          {
            trigger: "hover",
            options: options,
            "on-select": (key) => {
              location.href = key;
            },
          },
          {
            default: () => getButton(data[i].name, at, false),
          }
        )
      );
    } else {
      // 没有Tag
      MenuList.push(getButton(data[i].name, at, true));
    }
  }

  return h(
    NSpace,
    {
      justify: "center",
      size: 30,
    },
    {
      default: () => MenuList,
    }
  );
};

const CMenu = init();
export default defineComponent({
  components: {
    CMenu,
    // NDropdown,
    // NButton,
    // NSpace,
    // NDivider,
    // NCard,
  },
  setup() {
    return {
      // options: [
      //   {
      //     label: "布朗酒店，伦敦",
      //     key: "brown's hotel, london",
      //   },
      // ],
    };
  },
});
</script>
