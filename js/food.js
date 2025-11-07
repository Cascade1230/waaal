import { config } from "./config.js";
import { fetchJson } from "./data.js";

let restourangData = [];

window.onload = async () => {
    restourangData = await fetchJson(config.originUrl.restaurant, 110);
    console.log(restourangData);
}

