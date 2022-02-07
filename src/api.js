import axios from "axios";

const api = axios.create({
  baseURL: "https://my-game-reviews.herokuapp.com/api/",
});

export function getCategories() {
  return api.get("/categories").then((res) => res.data.categories);
}
