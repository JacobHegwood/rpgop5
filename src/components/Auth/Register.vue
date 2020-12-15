<template>
  <div class="register">
    <h2>Or create a user:</h2>
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
import { userService } from "../../services";

export default {
  name: "Register",

  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    checkForm: function () {
      userService
        .create({
          strategy: "local",
          email: this.email,
          password: this.password,
        })
        .then(function (returned) {
          console.log(returned);
        });
    },
  },
};
</script>

<style>
</style>