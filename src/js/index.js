import "../style/main.scss";
import "@babel/polyfill";
import App from "./app";

const $app = document.querySelector("#app");
new App($app);
