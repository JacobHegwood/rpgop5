<template>
  <div class="universe" v-if="this.$store.state.auth.status === 'logged in'">
    <!-- render our windows/modules -->
    <Window
      v-for="(theWindow, index) in this.$store.state.window.windows"
      :key="theWindow._id"
      :windowName="theWindow.name"
      :theZ="theWindow.z"
      :moduleId="theWindow.moduleId"
      :index="index"
    ></Window>

    <div class="bottom-text">PRESS SPACEBAR TO ACTIVATE/DEACTIVATE TOOLBAR</div>

    <!-- basic fade transition for toolbar -->
    <transition name="fade">
      <Toolbar v-if="game.showToolbar" />
    </transition>
  </div>

  <div class="auth" v-else>
    <Login></Login>
    <Register></Register>
  </div>
</template>

<script>
import Window from "./Window";
import Toolbar from "./Toolbar";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import app from "../services/";
import { moduleService } from "../services";

export default {
  name: "Universe",
  components: {
    Window,
    Toolbar,
    Login,
    Register,
  },

  data: function () {
    return {
      game: {
        name: "game1",
        players: [1, 2, 3, 4],
        showToolbar: false,
      },
    };
  },

  created() {
    this.$store.dispatch("fetchModules");
    this.$store.dispatch("addModule");
    this.$store.dispatch("removeModule");

    window.addEventListener("keypress", (space) => {
      this.game.showToolbar = !this.game.showToolbar;
    });
  },

  beforeCreate() {
    app
      .reAuthenticate()
      .then(() => {
        this.$store.state.auth.status = "logged in";
      })
      .catch(() => {});
  },

  methods: {
    tryAddModule() {
      moduleService.create({ name: "Window 33", z: 0, moduleId: 3 });
    },
  },
};
</script>

<style>
.universe {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: url("../assets/logo_transparent.png"),
    linear-gradient(to bottom right, #222, #333);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: top right;
  background-size: 150px, cover;
}

.bottom-text {
  position: fixed;
  color: rgba(255, 255, 255, 0.329);
  bottom: 100px;
  width: 100%;
  text-align: center;
}

.fade-enter-active {
  transition: all 0.2s;
}

.fade-leave-active {
  transition: all 0.1s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(20px);
}
</style>
