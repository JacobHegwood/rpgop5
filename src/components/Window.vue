<template>
  <div
    ref="draggableContainer"
    id="draggable-container"
    @click="bringToFront"
    :style="cssProps"
  >
    <div id="draggable-header" @mousedown="dragMouseDown">
      <span>{{ windowName }}</span>
    </div>
    <component v-bind:is="this.theBody" :cKey="this.$vnode.key"></component>
  </div>
</template>

<script>
import Default from "./Default";
import Counter from "./Counter";

export default {
  name: "Window",

  components: {
    Default,
    Counter,
  },

  data: function () {
    return {
      positions: {
        clientX: undefined,
        clientY: undefined,
        movementX: 0,
        movementY: 0,
      },
      theBody: "Default",
    };
  },

  props: ["index", "windowName", "theZ", "moduleId"],

  computed: {
    cssProps() {
      return {
        "--window-z": this.theZ,
      };
    },
  },

  created: function () {
    var moduleName = this.grabModule(this.moduleId);
    this.theBody = moduleName;
  },

  methods: {
    grabModule: function (moduleId) {
      const theModule = this.$store.state.moduleList.find((obj) => {
        return obj.id === moduleId;
      });

      return theModule ? theModule.name : "Default";
    },

    bringToFront: function (event) {
      this.$store.commit("bringToFront", this.index);
      this.$store.commit("checkIndexes");
    },

    dragMouseDown: function (event) {
      event.preventDefault();
      // get the mouse cursor position at startup:
      this.positions.clientX = event.clientX;
      this.positions.clientY = event.clientY;

      document.onmousemove = this.elementDrag;

      document.onmouseup = this.closeDragElement;

      // bring this window to the top of the stack
      this.bringToFront();
    },

    elementDrag: function (event) {
      event.preventDefault();
      this.positions.movementX = this.positions.clientX - event.clientX;
      this.positions.movementY = this.positions.clientY - event.clientY;
      this.positions.clientX = event.clientX;
      this.positions.clientY = event.clientY;
      // set the element's new position:
      this.$refs.draggableContainer.style.top =
        this.$refs.draggableContainer.offsetTop -
        this.positions.movementY +
        "px";
      this.$refs.draggableContainer.style.left =
        this.$refs.draggableContainer.offsetLeft -
        this.positions.movementX +
        "px";
    },

    closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    },
  },
};
</script>

<style lang="scss" scoped>
#draggable-container {
  position: absolute;
  z-index: var(--window-z);
  top: 20px;
  left: 40px;
  min-width: 200px;
  min-height: 200px;
  border: 1px solid #aaa;
  background-color: rgba(#eee, 0.9);
  color: #777;
  box-shadow: 0px 0px 30px 0px rgba(#2bd1fc, 0.55);
  resize: both;
  overflow: auto;
  padding: 0px;
  margin: 0px;

  &:active,
  &:target,
  &:focus {
    outline: 1px solid lime;
  }
}

#draggable-header {
  padding: 1px 2px;
  background: linear-gradient(#ccc, #bbb);
  border-bottom: 1px inset #bbb;
  color: #555;
  cursor: move;

  & span {
    cursor: auto;
  }
}

.full {
  width: 200px;
}
</style>
