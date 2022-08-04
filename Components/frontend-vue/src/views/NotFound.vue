<template>
  <div id="container">
    <h1>404 - page not found</h1>
    <p>Would you like to <router-link to="/">return home</router-link>?</p>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
}
</style>
