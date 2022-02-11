import Comment from "./Comment";
import { useState, useEffect } from "react";
import { getCommentsByReviewId } from "../api";
import AddComment from "./AddComment";

export default function Comments({ review_id }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getCommentsByReviewId(review_id).then((commentsFromApi) => {
      setComments(commentsFromApi);
    });
  }, [review_id]);

  return (
    <div className="Comments">
      <h3>Comments</h3>
      {comments.map((comment) => {
        return <Comment key={comment.comment_id} comment={comment}></Comment>;
      })}
      <AddComment setComments={setComments} />
    </div>
  );
}
