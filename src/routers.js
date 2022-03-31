import Home from "./components/Home.vue";
import SignUp from "./components/SignUp.vue";
import { createRouter, createWebHistory } from "vue-router";
import Login from './components/Login.vue'

// import Index from './src/index.js'

const routes = [
  {
    name: "Home",
    component: Home,
    path: "/",
  },
  {
    name: "SignUp",
    component: SignUp,
    path: "/sign-up",
  },
  {
    name: "Login",
    component: Login,
    path: "/login",
  },
  
  // {
  //   name: "Index",
  //   component: Index,
  //   path: "/Index",
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
