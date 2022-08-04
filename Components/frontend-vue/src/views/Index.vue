<template>
  <div id="container-index">
    <div style="margin-right: 2rem">
      <div id="container-filter">
        <label for="sort">Sort By</label>
        <select name="sort" id="sort" v-model="order" @change="filter">
          <option value="0">Rent: Highest to Lowest</option>
          <option value="1">Rent: Lowest to Highest</option>
          <option value="2">Rating: Highest to Lowest</option>
          <option value="3">Rating: Lowest to Highest</option>
        </select>
        <label for="minRating">Minimum Rating</label>
        <div class="star-option">
          <input
            type="radio"
            id="1star"
            name="minRating"
            value="1"
            v-model="minRating"
            @change="filter"
            checked
          />
          <rating :stars="1" />
        </div>
        <div class="star-option">
          <input
            type="radio"
            id="2star"
            name="minRating"
            value="2"
            v-model="minRating"
            @change="filter"
          />
          <rating :stars="2" />
        </div>
        <div class="star-option">
          <input
            type="radio"
            id="3star"
            name="minRating"
            value="3"
            v-model="minRating"
            @change="filter"
          />
          <rating :stars="3" />
        </div>
        <div class="star-option">
          <input
            type="radio"
            id="4star"
            name="minRating"
            value="4"
            v-model="minRating"
            @change="filter"
          />
          <rating :stars="4" />
        </div>
        <div class="star-option">
          <input
            type="radio"
            id="5star"
            name="minRating"
            value="5"
            v-model="minRating"
            @change="filter"
          />
          <rating :stars="5" />
        </div>
        <label for="minRent">Minimum Rent</label>
        <input type="number" name="minRent" min="0" :max="maxRent" step="100" v-model="minRent" @change="filter"/>
        <label for="maxRent">Maximum Rent</label>
        <input type="number" name="maxRent" :min="minRent" max="100000" step="100" v-model="maxRent" @change="filter"/>
        <div style="text-align: center">
          loaded {{ properties.length }} properties
        </div>
      </div>
    </div>
    <div id="search-container">
      <div v-if="properties.length == 0" class="no-result">no results :(</div>
      <router-link
        v-for="(property, index) in properties"
        :to="'/properties/' + property.id"
        :key="index"
      >
        <preview
          :title="property.title"
          :streetAddress="property.street_address"
          :rating="property.rating"
          :rent="property.rent"
          :reviewCount="property.review_count"
          :imageUrl="property.image_url"
        />
      </router-link>
      <div v-if="endOfResults" style="margin: 0.5rem">end of results</div>
    </div>
  </div>
</template>

<script>
import Rating from "../components/Rating.vue";
import Preview from "../components/Preview.vue";
import { search } from "../requester.js";
export default {
  components: {
    preview: Preview,
    rating: Rating,
  },
  data() {
    return {
      properties: [],
      limit: 8,
      page: 0,
      order: 0,
      minRating: 1,
      minRent: 0,
      maxRent: 100000,
      endOfResults: false,
    };
  },
  methods: {
    async filter() {
      this.page = 0;
      if(this.maxRent < this.minRent){ this.maxRent = this.minRent; }
      let res = await search(
        this.limit,
        this.page,
        this.order,
        this.minRating,
        this.minRent,
        this.maxRent
      );
      if (res.success) {
        this.properties = res.properties;
      } else {
        this.$emit("error", res.msg);
      }
      this.endOfResults = this.properties.length < this.limit && this.properties.length > 0;
    },
    async loadMore() {
      this.page++;
      let res = await search(
        this.limit,
        this.page,
        this.order,
        this.minRating,
        this.minRent,
        this.maxRent
      );
      if (res.success) {
        if (res.properties.length == 0) {
          this.endOfResults = true;
        } else {
          this.properties = this.properties.concat(res.properties);
        }
        console.log(this.properties);
      } else {
        this.$emit("error", res.msg);
      }
    },
    onScroll() {
      if (
        Math.ceil(window.innerHeight + window.scrollY + 100) >=
          document.body.scrollHeight &&
        !this.endOfResults
      ) {
        this.loadMore();
      }
    },
  },
  async mounted() {
    await this.filter();
    document.addEventListener("scroll", this.onScroll);
  },
  unmounted() {
    document.removeEventListener("scroll", this.onScroll);
  },
};
</script>

<style scoped>
#container-index {
  display: flex;
  flex-direction: row;
  justify-content: center;
  min-height: 90%;
}
#container-filter {
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: space-between;
  position: sticky;
  top: 100px;
}
/* input,
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
} */
a {
  text-decoration: none;
  color: inherit;
}
.star-option {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
}
.star-option div {
  margin-top: -1rem;
}
.no-result {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  width: 35rem;
}
#search-container {
  display: flex;
  flex-direction: row;
  justify-content: left;
  flex-wrap: wrap;
  max-width: 600px;
}
</style>
