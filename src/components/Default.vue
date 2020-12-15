<template>
  <div>No module is mounted to this window.
    <br>
    {{ cKey }}
  </div>
</template>

<script>
export default {
  name: "Default",
  props: ["cKey"]
};
</script>