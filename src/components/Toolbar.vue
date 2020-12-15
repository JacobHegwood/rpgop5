<template>
  <div class="toolbar">
    <button @click="tryAddModule(1)">New Counter Module</button>
    <button @click="tryAddModule(2)">New Empty Module</button>
    <button @click="tryRemoveAllModules">Remove All Module</button>
    <button @click="removeOne">Remove One</button>
    <input v-model="id" />
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import app, { moduleService } from "../services";

export default {
  name: "Toolbar",
  data() {
    return { id: 0 };
  },
  methods: {
    tryAddModule(id) {
      moduleService.create({ name: "Window example", z: 0, moduleId: id });
    },

    tryRemoveAllModules() {
      this.$store.state.window.windows.forEach((window) =>
        moduleService.remove(window._id)
      );
    },

    removeOne() {
      moduleService.remove(this.id);
    },

    logout() {
      app.logout();
    },
  },
};
</script>

<style lang="scss" scoped>
.toolbar {
  position: absolute;
  background: linear-gradient(rgba(#aaa, 0.6), rgba(#ccc, 0.6));
  bottom: 0;
  width: calc(100% - 40px);
  border-radius: 5px;
  left: 0;
  margin: 20px;
  z-index: 3000;
  box-shadow: 0px 0px 5px rgba(#eee, 0.2) ;
}

button {
  background-color: rgba(#eee, 0.8);
  border: 0px;
  min-height: 30px;
  margin: 3px;
  border-radius: 4px;
  transition: all 0.2s;
  outline: 0px;

  &:hover {
    background-color: rgba(#ddd, 0.7);
  }

  &:active {
    border: 0px;
    background-color: rgba(#ccc, 0.7);
  }
}
</style>
