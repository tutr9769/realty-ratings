<template>
  <div id="top-bar">
    <div id="left">
      <img
        src="@/assets/logo.svg"
        alt="logo"
        style="height: 3.5rem; margin-right: 0.1rem"
      />
      <router-link to="/">
        <button class="nav-btn">Home</button>
      </router-link>
      <router-link to="/submit-property">
        <button class="nav-btn">Submit A Property</button>
      </router-link>
    </div>
    <div id="middle">
      <!-- not in use -->
    </div>
    <div id="right">
      <button class="nav-btn" @click="$emit('showLogin')" v-if="!loggedIn">
        Login
      </button>
      <button class="nav-btn" @click="$emit('showRegister')" v-if="!loggedIn">
        Register
      </button>
      <router-link to="/profile" v-else>
        <div id="profile-bar">
          <img :src="avatar" alt="user avatar" />
          <span>{{ username }}</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loggedIn: Boolean,
    username: String,
    avatar: String,
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto:wght@100;400&display=swap");
a {
  text-decoration: none;
}

#profile-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: transparent;
  color: #F5f5f5;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 0.2rem;
  font-family: 'Roboto Condensed', sans-serif;
}

#profile-bar:hover {
  background-color: #76b6db;
  transition: 200ms;
}

#profile-bar img {
  height: 3rem;
  width: 3rem;
  border-radius: 0.2rem;
}

#profile-bar span {
  padding-right: 0.75rem;
  padding-left: 0.75rem;
}

#top-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #ccc;
  justify-content: space-between;
  background-color: #659DBD;
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 0.5rem;
}
#left {
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
}
#middle {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  text-decoration: none;
}
#right {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.nav-btn {
  /* font-family: "Bebas Neue", cursive;
  font-size: 1.5rem; */
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 800;
  color: #F5f5f5;
  background-color: transparent;
}

.nav-btn:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
