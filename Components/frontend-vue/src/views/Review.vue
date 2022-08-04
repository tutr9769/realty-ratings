<template>
  <div id="container">
    <div id="card">
      <h2>{{ title }} </h2>
      <img style= "max-width: 600px;" :src= "imageURL"/>
      <p>
        You are reviewing <b>{{ streetAddress }} {{ title }}</b
        >.
      </p>
      <div class="star-option">
        <input
          type="radio"
          id="1star"
          name="rating"
          value="1"
          v-model="stars"
        />
        <rating :stars="1" />
      </div>
      <div class="star-option">
        <input
          type="radio"
          id="2star"
          name="rating"
          value="2"
          v-model="stars"
        />
        <rating :stars="2" />
      </div>
      <div class="star-option">
        <input
          type="radio"
          id="3star"
          name="rating"
          value="3"
          v-model="stars"
        />
        <rating :stars="3" />
      </div>
      <div class="star-option">
        <input
          type="radio"
          id="4star"
          name="rating"
          value="4"
          v-model="stars"
        />
        <rating :stars="4" />
      </div>
      <div class="star-option">
        <input
          type="radio"
          id="5star"
          name="rating"
          value="5"
          v-model="stars"
          checked
        />
        <rating :stars="5" />
      </div>
      <textarea
        name="review"
        id=""
        cols="30"
        rows="10"
        v-model="txt"
      ></textarea>
      <button @click="postReview">Post Review</button>
    </div>
  </div>
</template>

<script>
import Rating from "../components/Rating.vue";
import { getProperty, createReview } from "../requester.js";
export default {
  components: {
    rating: Rating,
  },
  props: {
    jwt: String,
  },
  data() {
    return {
      stars: 5,
      title: "",
      streetAddress: "",
      txt: "",
      imageURL: ""
    };
  },
  methods: {
    async postReview() {
      if (this.jwt.length == 0) {
        alert("You must login to review.");
        return;
      }
      let res = await createReview(
        this.jwt,
        this.$route.params.id,
        this.stars,
        this.txt
      );
      if (res.success) {
        this.$router.push("/properties/" + this.$route.params.id);
      } else {
        alert(res);
      }
    },
  },
  async mounted() {
    let res = await getProperty(this.$route.params.id);
    if (res.success) {
      this.imageURL = res.image_url;
      this.title = res.title;
      this.streetAddress = res.street_address;
    } else {
      this.$router.push("/");
      this.$emit("error", res.msg);
    }
    console.log(res);
  },
};
</script>

<style scoped>
#container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#card {
  border-radius: 0.3rem;
  background-color: white;
  border-radius: 0.3rem;
  padding: 1rem;
  margin: 1rem;
  box-shadow: 0px 0px 18px -8px rgb(150, 150, 150);
  display: flex;
  flex-direction: column;
  min-width: 35rem;
}
input,
select,
textarea {
  font-family: "Open Sans", sans-serif;
  font-size: 1.2rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.2rem;
  font-weight: 500;
  border: 1px solid black;
  margin-bottom: 1rem;
}
.star-option {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
}
.star-option div {
  margin-top: -1.2rem;
}
</style>
