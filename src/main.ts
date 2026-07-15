import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import { ConvexHttpClient } from "convex/browser";

const app = createApp(App);

const convex = new ConvexHttpClient(
  import.meta.env.VITE_CONVEX_URL
);

app.use(createPinia());
app.use(router);

app.mount("#app");

//convexVuePlugins to run the (query) and (mutations), 