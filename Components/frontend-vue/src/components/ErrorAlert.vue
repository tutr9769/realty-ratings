<template>
  <div id="container-error">
    <p>Error - {{ msg }}</p>
  </div>
</template>

<script>
export default {
  props: {
    msg: String,
  },
};
</script>

<style scoped>
#container-error {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0.25rem;
  color: rgb(0, 0, 0);
  background-color: rgb(255, 56, 56);
  width: 100%;
  font-weight: bold;
}
</style>
