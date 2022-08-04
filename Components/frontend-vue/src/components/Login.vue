<template>
  <div id="bg">
    <div class="card" v-if="loginType == 0">
      <h1>login</h1>
      <label for="usernameInput">Username</label>
      <input type="text" id="usernameInput" v-model="username" />
      <label for="passwordInput">Password</label>
      <input type="password" id="passwordInput" v-model="password" />
      <small>{{ loginFeedback }}</small>
      <div style="padding-top: 1rem; padding-bottom: 1rem">
        <button class="login" @click="handleLogin" :disabled="loading">
          Login
        </button>
        <button class="cancel" @click="$emit('cancel')">Cancel</button>
      </div>
      <div>
        Don't have an account?
        <a href="#" @click="$emit('showRegister')">Register</a>
      </div>
    </div>
    <div class="card" v-else>
      <h1>register</h1>
      <label for="usernameInput">Username</label>
      <input type="text" id="usernameInput" v-model="username" />
      <small>{{ usernameFeedback }}</small>
      <label for="emailInput">Email</label>
      <input type="text" id="emailInput" v-model="email" />
      <small>{{ emailFeedback }}</small>
      <label for="passwordInput">Password</label>
      <input type="password" id="passwordInput" v-model="password" />
      <small>{{ passwordFeedback }}</small>
      <label for="confirmPasswordInput">Confirm Password</label>
      <input
        type="password"
        id="confirmPasswordInput"
        v-model="confirmPassword"
      />
      <small>{{ confirmPasswordFeedback }}</small>
      <small>{{ registerFeedback }}</small>
      <div style="padding-top: 1rem; padding-bottom: 1rem">
        <button
          class="login"
          :disabled="registerDisabled"
          @click="handleRegister"
        >
          Register
        </button>
        <button class="cancel" @click="$emit('cancel')">Cancel</button>
      </div>
      <div>
        Already have an account?
        <a href="#" @click="$emit('showLogin')">Login</a>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from "../requester.js";
export default {
  props: {
    loginType: Number,
  },
  data() {
    return {
      loading: false,
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      loginFeedback: "",
      registerFeedback: "",
    };
  },
  computed: {
    usernameFeedback() {
      if (
        this.username.length > 0 &&
        (this.username.length < 5 || this.username.length > 30)
      ) {
        return "Username must be between 5 and 30 chars!";
      } else if (
        this.username.length > 0 &&
        !this.username.match(/^[A-Za-z0-9_]+$/)
      ) {
        return "Username must be alphanumeric";
      }
      return " ";
    },
    emailFeedback() {
      if (
        this.email.length > 0 &&
        !this.email.match(/^[A-Za-z0-9.]{4,}@colorado.edu$/)
      ) {
        return "Email must be a valid colorado.edu email address!";
      }
      return " ";
    },
    passwordFeedback() {
      if (this.password.length > 0 && this.password.length < 12) {
        return "Password must be at least 12 chars!";
      }
      return " ";
    },
    confirmPasswordFeedback() {
      if (
        this.confirmPassword.length > 0 &&
        this.confirmPassword != this.password
      ) {
        return "Password does not match!";
      }
      return " ";
    },
    registerDisabled() {
      return !(
        this.username.length > 4 &&
        this.username.length < 31 &&
        this.username.match(/^[A-Za-z0-9_]+$/) &&
        this.email.match(/^[A-Za-z0-9.]{4,}@colorado.edu$/) &&
        this.password.length >= 12 &&
        this.confirmPassword == this.password &&
        !this.loading
      );
    },
  },
  methods: {
    async handleRegister() {
      this.loading = true;
      let res = await register(this.username, this.email, this.password);
      if (res.success) {
        alert("Account created!\nyou can now login");
        this.$emit("cancel");
        console.log(res);
      } else {
        this.registerFeedback = res.msg;
      }
      this.loading = false;
    },
    async handleLogin() {
      this.loading = true;
      let res = await login(this.username, this.password);
      if (res.success) {
        this.$emit("login", res.jwt, res.username);
        console.log(res);
      } else {
        this.loginFeedback = "Login failed: " + res.msg + ".";
      }
      this.loading = false;
    },
  },
};
</script>

<style scoped>
#bg {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.card {
  border-radius: 0.3rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  box-shadow: 0px 0px 18px -8px rgb(185, 218, 241);
}

.login {
  font-weight: bold;
  color: white;
  background-color: #483d3f;
}
.login:hover {
  background-color: #3f3f53;
}
.login:disabled {
  opacity: 0.5;
}

.cancel {
  background-color: transparent;
}

.cancel:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

small {
  color: red;
  font-weight: bold;
}
</style>
