<template>
  <Universe />
</template>

<script>
import Universe from "./components/Universe";

export default {
  name: "App",
  components: {
    Universe,
  },
};
</script>

<style>
/* begin basic css reset */
html {
  box-sizing: border-box;
  font-size: 16px;
  font-family: "David Libre";
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
ol,
ul {
  margin: 0;
  padding: 0;
  font-weight: normal;
}

ol,
ul {
  list-style: none;
}

img {
  max-width: 100%;
  height: auto;
}

/* end css reset */
</style>
