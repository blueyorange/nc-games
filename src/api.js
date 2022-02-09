import axios from "axios";

const api = axios.create({
  baseURL: "https://my-game-reviews.herokuapp.com/api/",
});

export function getCategories() {
  return api.get("/categories").then((res) => res.data.categories);
}

export function getReviews(category) {
  const params = {
    sort_by: "votes",
    order: "desc",
    category,
  };
  return api.get(`/reviews/`, { params }).then((res) => res.data.reviews);
}
