<template>
  <div id="container">
    <div id="container-info">
      <img :src="avatar" alt="avatar" />
      <h2>
        Hello <span id="username">{{ username }}</span>
      </h2>

      <dl>
        <dt>Email</dt>
        <dd>{{ email }}</dd>
        <dt>Joined</dt>
        <dd>{{ created }}</dd>
      </dl>

      <button onclick="document.getElementById('avatarInput').click()">
        Change Profile Picture
      </button>

      <button @click="$emit('logout')">Logout</button>

      <router-link to="/">
        <button>Find A Property</button>
      </router-link>
      <button @click="deleteProfile()">Delete Account</button>
    </div>
    <div id="container-reviews">
      <h4>Your reviews ({{ reviews.length }})</h4>
      <div class="card" v-for="review in reviews" :key="'review_' + review.id">
        <b>{{ review.author }}</b>
        <rating :stars="review.rating" />
        <p>{{ review.txt }}</p>
        <router-link :to="`/properties/${review.property}`">
          View This Property
        </router-link>
      </div>
    </div>
    <input
      ref="avatarFile"
      id="avatarInput"
      type="file"
      style="display: none"
      v-on:change="changeAvatar()"
    />
  </div>
</template>

<script>
import Rating from "../components/Rating.vue";
import { profile, upload, updateAvatar, deleteUser } from "../requester.js";
export default {
  props: {
    jwt: String,
  },
  components: {
    rating: Rating,
  },
  data() {
    return {
      avatar: "",
      username: "",
      email: "",
      created: "",
      reviews: [],
    };
  },
  methods: {
    async deleteProfile() {
      // Method
      // to do
      let res = await deleteUser(this.jwt);
      if (res.success) {
        alert("Account Has been deleted");
      } else {
        alert("error");
      }
      this.$emit("logout");
      console.log(res);
    },
    async changeAvatar() {
      let avatarFile = this.$refs.avatarFile.files[0];
      console.log(avatarFile);
      let res = await upload(avatarFile);
      if (res.success) {
        //todo
        this.avatar = res.url;
        alert(res.url);
      } else {
        alert("error\n" + res.msg);
      }
      console.log(res);
      res = await updateAvatar(this.jwt, this.avatar);
      if (res.success) {
        alert("changed avatar");
      } else {
        alert("error\n" + res.msg);
      }
    },
  },
  async mounted() {
    console.log(this.jwt);
    if (this.jwt.length == null || this.jwt.length == 0) {
      this.$router.push("/");
      return;
    }
    let res = await profile(this.jwt);
    if (res.success) {
      this.avatar = res.avatar;
      this.username = res.username;
      this.email = res.email;
      this.created = res.created;
      this.reviews = res.reviews;
    } else {
      this.$emit("error", res.msg);
    }
    console.log(res);
  },
};
</script>

<style scoped>
#container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
#container-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  gap: 10px;
}
#container-reviews {
  display: flex;
  flex-direction: column;
  min-width: 500px;
  align-items: center;
  padding: 2rem;
}
img {
  height: 12rem;
  width: 12rem;
  border-radius: 100%;
  margin-top: 2rem;
}
.card {
  /* font-family: "Bebas Neue", cursive; */
  font-family: "Roboto Condensed", sans-serif;
  font-size: 1.5rem;
  border-radius: 0.3rem;
  background-color: white;
  border-radius: 0.3rem;
  padding: 1rem;
  margin-top: 1rem;
  color: #50514f;
  width: 500px;
  box-shadow: 0px 0px 18px -8px rgb(150, 150, 150);
}

button {
  /* font-family: "Bebas Neue", cursive; */
  /* font-family: "Roboto", sans-serif; */
  font-weight: 400;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* width: 12rem;
  padding: 0.5rem;
  margin-top: 0.5rem; */
  /* margin-left: 0rem; */
  /* background-color: #483d3f;
  color: #f5f5f5;
  font-size: 17px; */

  width: 100%;
  font-weight: bold;
  color: white;
  background-color: #483d3f;
}

h2 {
  /* font-family: "Bebas Neue", cursive; */
  font-family: "Roboto Condensed", sans-serif;
  font-weight: 700;
  font-size: 2rem;
  color: #483d3f;
}

#username {
  color: #659dbd;
}

h1 {
  /* font-family: "Bebas Neue", cursive; */
  /* font-family: 'Roboto Condensed', sans-serif;
  font-weight: 700;
  font-size: 3rem;
  color: #483d3f;
  display: flex;
  flex-direction: center;
  align-items: center; */
}
h4 {
  /* font-family: 'Roboto Condensed', sans-serif; */
}
</style>
