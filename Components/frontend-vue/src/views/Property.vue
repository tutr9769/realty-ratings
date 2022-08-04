<template>

  <!-- <div id="container">
    <div class="card">
      <span id="title">{{ title }}</span>
      <rating :stars="rating" />
      <span id="price">Rent: ${{rent}} / month. </span>
      <dl>
        <dt>Street Address</dt>
        <dd>{{ streetAddress }}</dd>
        <dt>City</dt>
        <dd>{{ city }}</dd>
        <dt>Zip</dt>
        <dd>{{ zip }}</dd>
        <dt>Unit</dt>
        <dd>{{ unit == null ? "N/A" : unit }}</dd>
      </dl>
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <a href="#">Contact Property Owner</a>
        <router-link :to="'/properties/' + $route.params.id + '/review'">
          <button>Write Review</button>
        </router-link>
      </div>
    </div>
    <div class="card" v-for="review in reviews" :key="'review_' + review.id">
      <b>{{ review.author }}</b>
      <rating :stars="review.rating" />
      <p>{{ review.txt }}</p>
    </div>
  </div> -->

  <!-- <div class="container" id="unga" style="margin:10px 15px; max-width:100%">
    <div class = "row">
      <div class="col-1" style="margin:-2rem">
      </div>
      <div class="col-4" id="leftCol">
        <div class="row" style="margin-bottom: 10px; margin-left: 0px; margin-right:0px">
          <img id="propImage" :src="image_url">
        </div>
        <div class="row" style="background-color: white;">
          <div class="col" id="addressCol">
            <h1>{{title}}</h1>
            <h2 id="address">{{streetAddress}}</h2> 
            <a id="google" target="_blank" :href="google_url"><p>View Property on Google Maps</p></a>
            <router-link :to="'/properties/' + $route.params.id + '/review'">
              <button>Write Review</button>
            </router-link>
          </div>
        </div>
        <div class="row" style="background-color:white;margin-top:10px;margin-bottom: 10px;">
          <div class="col">
            <div class="row" style="padding-left:10px">
              <rating :stars="rating" />
              <h3 style="padding:10px">{{rating}} stars</h3>
            </div>
            <h4 style="margin-top:-20px">Based on {{reviews.length}} reviews</h4>
          </div>
        </div>
        <div class="row">
          <div class="col" id="miscCol" style="background-color: white;">
            <h3 id="rent">${{rent}} per month</h3>
            <h3>{{bedrooms}} Bedrooms, {{bathrooms}} Bathrooms</h3>
            <h4>Property Manager: {{leasing_company}}</h4>
          </div>
        </div>
      </div>
      <div class="col-6" style="background-color:white;overflow-y:auto; height:850px; font-size: large;" id="reviewList">
        <div class="cardl" v-for="review in reviews" :key="'review_' + review.id">
          <b>{{ review.author }}</b>
          <rating :stars="review.rating" />
          <p>{{ review.txt }}</p>
        </div>
      </div>
      <div class="col-1" style="margin:-1rem">
      </div>
    </div>
  </div> -->

  <div id="container">
    <div class="card">
      <img id="propImage" :src="image_url">
      <div style="padding: 1rem;">
        <h4>{{ title }}</h4>
        <rating :stars="rating" />
        <small>Based on {{ reviews.length }} reviews</small>
        <dl>
          <dt>Rent</dt>
          <dd id="price">${{rent}} / month. </dd>
          <dt>Street Address</dt>
          <dd>{{ streetAddress }}</dd>
          <dt>City</dt>
          <dd>{{ city }}</dd>
          <dt>Zip</dt>
          <dd>{{ zip }}</dd>
          <dt>Unit</dt>
          <dd>{{ unit == null ? "N/A" : unit }}</dd>
          <dt>Bedrooms</dt>
          <dd>{{ bedrooms }}</dd>
          <dt>Bathrooms</dt>
          <dd>{{ bathrooms }}</dd>
          <dt>Leasing Company</dt>
          <dd>{{ leasing_company }}</dd>
        </dl>
        <a id="google" target="_blank" :href="google_url"><p>View Property on Google Maps</p></a>
        <router-link :to="'/properties/' + $route.params.id + '/review'">
          <button>Write A Review</button>
        </router-link>
      </div>
    </div>
    <div>
      <div class="card" style="width: 30rem;padding: 1rem;text-align:center;" v-if="!reviews.length">
        <b>no reviews yet...</b>
      </div>
      <div class="card" style="width: 30rem;padding: 1rem;" v-for="review in reviews" :key="'review_' + review.id">
        <b>{{ review.author }}</b>
        <rating :stars="review.rating" />
        <p>{{ review.txt }}</p>
      </div>
    </div>
  </div>

</template>

<script>
import Rating from "../components/Rating.vue";
import { getProperty } from "../requester.js";
export default {
  components: {
    rating: Rating,
  },
  data() {
    return {
      rent: 0,
      title: "",
      rating: 0,
      streetAddress: "",
      city: "",
      zip: "",
      unit: null,
      reviews: [],
      leasing_company: "",
      image_url: "",
      google_url: "", //this creates the google maps url for the address
      bathrooms: 0,
      bedrooms: 0,
    };
  },
  async mounted() {
    let res = await getProperty(this.$route.params.id);
    if (res.success) {
      this.rent = res.rent;
      this.title = res.title;
      this.rating = res.rating;
      this.streetAddress = res.street_address;
      this.city = res.city;
      this.zip = res.zip;
      this.unit = res.unit;
      this.reviews = res.reviews;
      this.leasing_company = res.leasing_company;
      this.image_url = res.image_url;
      this.google_url = "https://www.google.com/maps/place/" + this.streetAddress + "," + this.zip;
      this.bathrooms = res.bathrooms;
      this.bedrooms = res.bedrooms;
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
  margin: auto;
  gap: 1rem;
}
.card {
  border-radius: 0.3rem;
  background-color: white;
  border-radius: 0.3rem;
  margin-top: 1rem;
  box-shadow: 0px 0px 18px -8px rgb(150, 150, 150);
}
#title {
  font-size: 3rem;
  font-weight: thin;
}
#price {
  color: green;
  font-weight: bold;
}
a {
  text-decoration: none;
  font-weight: bold;
}
#propImage{
  width:400px;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
}
template{
  overflow-x:hidden;
}
#leftCol{
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
#reviewList{
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
</style>
