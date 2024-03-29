import axios from "axios";

const api = axios.create({
  baseURL: "https://my-game-reviews.herokuapp.com/api/",
});

export function getCategories() {
  return api.get("/categories").then((res) => res.data.categories);
}

export function getReviews(category, sort_by) {
  const params = {
    sort_by,
    order: "desc",
    category,
  };
  return api.get(`/reviews/`, { params }).then((res) => res.data.reviews);
}

export function getReviewById(review_id) {
  return api.get(`/reviews/${review_id}`).then((res) => res.data.review);
}

export function getUser(username) {
  return api.get(`/users/${username}`).then((res) => res.data.user);
}

export function getCommentsByReviewId(review_id) {
  return api
    .get(`/reviews/${review_id}/comments`)
    .then((result) => result.data.comments);
}

export function voteReview(review_id) {
  return api
    .patch(`/reviews/${review_id}/`, { inc_votes: 1 })
    .then((res) => res.data.review);
}

export function voteComment(comment_id) {
  return api
    .patch(`/comments/${comment_id}/`, { inc_votes: 1 })
    .then((res) => res.data.comment);
}

export function postComment(review_id, comment) {
  return api
    .post(`/reviews/${review_id}/comments`, comment)
    .then((res) => res.data.comments);
}

export function deleteComment(comment_id) {
  return api.delete(`/comments/${comment_id}`);
}
