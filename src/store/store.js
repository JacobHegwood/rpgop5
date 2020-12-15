import Vue from "vue";
import Vuex from "vuex";

import window from "./modules/window";
import auth from "./modules/auth";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: () => ({
    moduleList: [
      { id: 1, name: "Counter" },
      { id: 2, name: "" }
    ]
  }),
  modules: {
    window,
    auth
  }
});
