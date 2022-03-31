import { createApp } from "vue";
import App from "./App.vue";
import router from "./routers";
const importedObj = require('./new.js');
console.log(importedObj);


createApp(App).use(router).mount("#app");
