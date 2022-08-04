<template>
  <div id="container">
    <div id="card">
      <h1>Submit a property</h1>
      <label for="title">Title (optional)</label>
      <input type="text" name="title" v-model="title"/>
      <label for="title">Street Address</label>
      <input type="text" name="title" v-model="streetAddress"/>
      <label for="title">City</label>
      <select name="city" id="city" v-model="city">
        <option value="Boulder">Boulder</option>
        <option value="Broomfield">Broomfield</option>
      </select>
      <label for="zip">Zip Code</label>
      <select name="zip" v-model="zip">
        <option value="80301">80301</option>
        <option value="80302">80302</option>
        <option value="80303">80303</option>
        <option value="80304">80304</option>
        <option value="80305">80305</option>
        <option value="80306">80306</option>
        <option value="80307">80307</option>
        <option value="80308">80308</option>
        <option value="80309">80309</option>
      </select>
      <label for="unit">Unit (optional)</label>
      <input type="text" name="unit" v-model="unit"/>
      <label for="dispImg">Display Image</label>
      <input type="file" name="dispImg" ref="dispImg"/>
      <label for="rent">Rent (per month)</label>
      <input type="number" name="rent" v-model="rent"/>
      <label for="rent"># of Bedrooms</label>
      <input type="number" name="bedrooms" v-model="bedrooms"/>
      <label for="rent"># of Bathrooms</label>
      <input type="number" name="bathrooms" v-model="bathrooms"/>
      <label for="leasing_company">Property Manager</label>
      <input type="text" name="leasing_company" v-model="leasing_company"/> <!-- Need to implement in backend -->
      <button @click="submit">Submit</button>
    </div>
  </div>
</template>

<script>
import { upload, createProperty } from "../requester.js";
export default {
  props: {
    jwt: String,
  },
  data() {
    return {
      title: "",
      streetAddress: "",
      city: "",
      zip: "",
      unit: "",
      imageUrl: "",
      rent: 1000,
      bathrooms: 1,
      bedrooms: 1,
      leasing_company: "",
    }
  },
  methods: {
    async submit(){
      if(this.bedrooms < 1){
        alert("must have a bedroom")
        return
      }
      if(this.bathrooms < 1){
        alert("must have a bathroom")
        return
      }
      if(this.streetAddress.length < 10 || this.streetAddress.length > 100){
        alert("adress must be between 10 and 100 chars")
        return
      }
      if(this.rent < 0 || this.rent > 100000){
        alert("rent must be bewteen 0 and 100000")
        return
      }
      let res = await upload(this.$refs.dispImg.files[0]);
      if(res.success){
        this.imageUrl = res.url;
      } else {
        this.$emit("error", res.msg)
      }
      console.log(res)
      res = await createProperty(this.jwt, this.imageUrl, this.title, this.city, this.zip, this.streetAddress, this.unit, this.rent, this.bathrooms, this.bedrooms, this.leasing_company);
      if(res.success){
        alert("property created");
        this.$router.push("/");
      } else {
        this.$emit("error", res.msg)
      }
      console.log(res)
    }
  },
  mounted() {
    if (this.jwt.length == null || this.jwt.length == 0) {
      this.$router.push("/");
      return;
    }
  }
};
</script>

<style scoped>
/* @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;400&display=swap"); */
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto:wght@100;400&display=swap");
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
/* input,
select,
textarea {
  font-family: 'Roboto', sans-serif;
  font-size: 1.2rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.2rem;
  font-weight: 500;
  border: 1px solid black;
  margin-bottom: 1rem;
} */

h1{
  /* font-family: "Bebas Neue", cursive; */
  font-size: 3.2rem;
  color: #483D3F;
  font-weight: 800;
}

label{
  font-family: 'Roboto', sans-serif;
  font-size: 1.2rem;
}

button{
  /* font-family: 'Roboto', sans-serif; */
  font-weight: bold;
  color: white;
  background-color: #483d3f;
}
</style>
