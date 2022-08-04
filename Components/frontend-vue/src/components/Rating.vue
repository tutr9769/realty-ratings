<template>
  <div id="rating-container">
    <div
      v-for="index in Math.round(stars)"
      :style="'color: ' + (empty ? '#ccc' : 'gold') + ';'"
      :key="index"
    >
      &#9733;
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stars: Number,
    empty: { type: Boolean, default: false },
  },
};
</script>

<style scoped>
#rating-container {
  display: flex;
  flex-direction: row;
  font-size: 2rem;
  color: gold;
}
</style>
