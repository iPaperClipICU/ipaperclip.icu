import { ref, computed } from "vue";
import type { Ref } from "vue";
import { zhCN, darkTheme, lightTheme } from "naive-ui"; // NaiveUI Config
import { createDiscreteApi } from "naive-ui";
import type { ConfigProviderProps } from "naive-ui";

/**
 * 修改 DiscreteAPI 主题
 * @param themeName 主题名称
 */
export const changeNaiveUIDiscreteAPITheme = (themeName: "light" | "dark") => {
  themeRef.value = themeName;
};

const themeRef: Ref<"light" | "dark"> = ref("dark");
const configProviderPropsRef = computed<ConfigProviderProps>(() => ({
  locale: zhCN,
  theme: themeRef.value === "light" ? lightTheme : darkTheme,
}));

const { message, notification, dialog, loadingBar } = createDiscreteApi(
  ["message", "dialog", "notification", "loadingBar"],
  {
    configProviderProps: configProviderPropsRef,
  }
);

export default { message, notification, dialog, loadingBar };
