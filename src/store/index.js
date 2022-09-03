import { createStore } from "vuex";

export default createStore({
  state: {
    AtPageType: "",
    AtPageFilesName: "",
    FilesMenuData: {},
    FileCardData: {},
  },
  getters: {},
  mutations: {
    setAtPageType(state, type) {
      state.AtPageType = type;
    },
    setState(state, func) {
      func(state);
    },
  },
  actions: {},
  modules: {},
});
