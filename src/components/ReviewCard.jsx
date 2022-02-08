export default function ReviewCard({review}) {
    const {title, category, owner, review_body, review_img_url} = review;
    return (
        <div className="ReviewCard">
            <div className="ReviewCard__category">{category}</div>
            <h2 className="ReviewCard__title">{title}</h2>
            <img alt={title} src={review_img_url} className="ReviewCard__image"></img>
            {/* <div className="ReviewCard__owner">{owner}</div> */}

            <div className="ReviewCard__body">{review_body}</div>
        </div>
    );
}