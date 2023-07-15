import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Trading from "./components/Trading.vue";
import Test from "./components/Test.vue";
import { createRouter, createWebHashHistory } from "vue-router";

createApp(App)
  .use(
    createRouter({
      history: createWebHashHistory(),
      routes: [
        { path: "/", component: () => Trading },
        { path: "/test", component: Test },
      ],
    })
  )
  .mount("#app");
