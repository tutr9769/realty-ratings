import { createRouter, createWebHistory } from "vue-router";
import Index from "../views/Index.vue";
import Profile from "../views/Profile.vue";
import Review from "../views/Review.vue";
import Property from "../views/Property.vue";
import SubmitProperty from "../views/SubmitProperty.vue";
import NotFound from "../views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/properties/:id",
    name: "Property",
    component: Property,
  },
  {
    path: "/properties/:id/review",
    name: "Review",
    component: Review,
  },
  {
    path: "/submit-property",
    name: "Submit Property",
    component: SubmitProperty,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "Not Found",
    component: NotFound,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
