import { config } from "./config.js";

export async function fetchJson(originUrl, maxPage) {
  let database = [];

  for (let i = 1; i < maxPage; i++) {
    const requestURL = `${config.proxyUrl}${originUrl}?page=${i}&pageunit=10`;
    const response = await fetch(requestURL);
    const jsonData = await response.json();
    console.log(response);
    for (let i = 0; i < jsonData.results.length; i++) {
      database.push(jsonData.results[i]);
    }
  }

  return database;
}
