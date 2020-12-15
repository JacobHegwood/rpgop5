<template>
  <div class="login">
    <h1>Please Login</h1>
    <p>{{ errors.toString() }}</p>
    <form @submit.prevent="checkForm">
      <p>
        <label for="email">Email</label>
        <input id="email" v-model="email" type="email" name="email" />
      </p>

      <p>
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          name="password"
        />
      </p>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import app from "../../services/";

export default {
  name: "Login",

  data() {
    return { errors: [], password: "", email: "" };
  },

  methods: {
    checkForm: function () {
      this.errors = [];

      if (!this.email) {
        this.errors.push("Email required.");
      }

      if (!this.password) {
        this.errors.push("Password required.");
      } else {
        if (this.errors.length < 1) {
          console.log("logging in");

          // Authenticate with the local email/password strategy
          app
            .reAuthenticate()
            .then(() => {
              this.$store.state.auth.status = "logged in";
            })
            .catch((e) => {
              console.error(e);
              app
                .authenticate({
                  strategy: "local",
                  email: this.email,
                  password: this.password,
                })
                .then((e) => {
                  // Logged in
                  this.$store.state.auth.status = "logged in";
                  console.log(e);
                })
                .catch((e) => {
                  // Did not authenticate, show error message
                  console.log("error");
                  console.error("Authentication error", e);
                });
            });
        }
      }
    },
  },
};
</script>

<style>
</style>