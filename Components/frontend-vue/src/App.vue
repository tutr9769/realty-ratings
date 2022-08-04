<template>
  <div>
    <login
      v-if="showLogin"
      :loginType="loginType"
      @cancel="showLogin = false"
      @showLogin="loginType = 0"
      @showRegister="loginType = 1"
      @login="handleLogin"
    />
    <error :msg="errorMsg" v-if="errorMsg" />
    <top-bar
      :loggedIn="loggedIn"
      :username="user.username"
      :avatar="user.avatar"
      @showLogin="
        showLogin = true;
        loginType = 0;
      "
      @showRegister="
        showLogin = true;
        loginType = 1;
      "
    />
    <router-view
      :user="user"
      :username="user.username"
      :avatar="user.avatar"
      :email="user.email"
      :created="user.created"
      :jwt="user.jwt"
      @logout="handleLogout"
      @error="handleError"
    />
  </div>
</template>

<script>
import ErrorAlert from "./components/ErrorAlert.vue";
import Login from "./components/Login.vue";
import Topbar from "./components/Topbar.vue";
import { profile } from "./requester.js";
export default {
  components: {
    "top-bar": Topbar,
    login: Login,
    error: ErrorAlert,
  },
  data() {
    return {
      showLogin: false,
      loginType: 0,
      loggedIn: false,
      user: {
        jwt: "",
        username: "",
        avatar: "",
        email: "",
        created: "",
      },
      errorMsg: "",
    };
  },
  methods: {
    async handleLogin(jwt, username) {
      let res = await profile(jwt);
      if (res.success) {
        this.user.jwt = jwt;
        this.user.username = username;
        this.user.avatar = res.avatar;
        this.user.email = res.email;
        this.user.created = res.created;
        this.loggedIn = true;
        this.showLogin = false;
      } else {
        alert("login authenticated but failed\n" + res.msg);
      }
    },
    handleLogout() {
      this.user.jwt = "";
      this.user.username = "";
      this.user.avatar = "";
      this.user.email = "";
      this.user.created = "";
      this.loggedIn = false;
      this.$router.push("/");
    },
    handleError(msg) {
      this.errorMsg = msg;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap');
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto:wght@100;400&display=swap");
body {
  margin: 0;
  background-color: #fff;
  overflow-x: hidden;
}
button {
  /* font-family: "Open Sans", sans-serif; */
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 700;
  font-size: 1.2rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.2rem;
  font-weight: 500;
  border: none;
}
button:hover {
  transition: 200ms;
  cursor: pointer;
}
input,
select {
  font-family: "Open Sans", sans-serif;
  font-size: 1.2rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.2rem;
  font-weight: 500;
  border-width: 0;
  border-bottom: 2px solid black;
  margin-bottom: 1rem;
  background-color: #e9e9ed;
}
h1, h2, h3, h4, h5 {
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 700;
}
a, a:hover {
  color: #659DBD;
  font-weight: bold;
  text-decoration: none;
}
</style>
