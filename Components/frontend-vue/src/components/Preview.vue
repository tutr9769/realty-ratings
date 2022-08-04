<template>
  <div id="preview-container">
    <img :src="imageUrl" alt="property preview" />
    <div id="preview-info">
      <strong>{{ title }}</strong>
      <span>{{ streetAddress }}</span>
      <span id="rent">${{ rent }} /month</span>
      <rating :stars="rating" :empty="reviewCount == 0" />
      <small>{{ reviewCount }} reviews</small>
    </div>
  </div>
</template>

<script>
import Rating from "./Rating.vue";
export default {
  components: {
    rating: Rating,
  },
  props: {
    title: String,
    streetAddress: String,
    rating: Number,
    rent: Number,
    reviewCount: Number,
    imageUrl: String,
  },
};
</script>

<style scoped>
#preview-container {
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 0.3rem;
  /* width: 35rem; */
  margin: 0.5rem;
  box-shadow: 0px 0px 18px -8px #ccc;
}
#preview-container:hover {
  background-color: rgba(239, 249, 252, 0.3);
  transition: 200ms;
}
#preview-container img {
  height: 12rem;
  width: 16rem;
  border-top-right-radius: 0.3rem;
  border-top-left-radius: 0.3rem;
}
#preview-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.5rem;
  font-weight: 400;
}
#rent {
  color: green;
}
</style>
