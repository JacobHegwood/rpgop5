import * as services from "../../services";
import _ from "lodash";

const state = {
  windows: []
};

const actions = {
  fetchModules: ({ commit }) => {
    // Call the messages service on the server via websocket
    services.moduleService.find({}).then((messages) => {
      commit("FETCH_MODULES", messages.data);
    });
  },

  addModule: ({ commit }) => {
    console.log("invoked");
    // A new message has been created on the server, so dispatch a mutation to update our state/view
    services.moduleService.on("created", (message) => {
      console.log("created");
      commit("ADD_WINDOW", message);
    });
  },

  removeModule: ({ commit }) => {
    // A message has been removed from the server, so dispatch a mutation to update our state/view
    services.moduleService.on("removed", (message) => {
      commit("REMOVE_WINDOW", message);
    });
  }
};

const mutations = {
  FETCH_MODULES(state, messages) {
    state.windows = messages;
  },

  ADD_WINDOW: (state, message) => {
    state.windows.push(message);
  },

  REMOVE_WINDOW: (state, window) => {
    // find the index of the window to remove from array
    let index = _.findIndex(state.windows, { _id: window._id });
    // remove the window at position [index] from array
    state.windows.splice(index, 1);
    // console.log(_.remove(state.windows, { _id: window._id }));
  },

  bringToFront: (state, index) => {
    var highestZ = 0;

    // loop through our windows and find the highest z-index
    for (var i = 0; i < state.windows.length; i++) {
      if (state.windows[i].z >= highestZ && i !== index) {
        highestZ = state.windows[i].z;
      }
    }

    // take the highest z-index and add 1
    state.windows[index].z = highestZ + 1;
  },

  checkIndexes: (state) => {
    var windowsToCheck = state.windows;

    windowsToCheck.sort((a, b) => a.z - b.z);

    for (var i = 0; i < windowsToCheck.length; i++) {
      state.windows[i].z = i;
      services.moduleService.update(state.windows[i]._id, state.windows[i]);
    }
  }
};

export default {
  state,
  actions,
  mutations
};
