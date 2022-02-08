import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {getReviews} from "../api"
import ReviewCard from "./ReviewCard";

export default function ReviewsList() {
    const [reviews, setReviews] = useState([]);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const category = searchParams.get('category');
        getReviews(category).then(({data}) => setReviews(data.reviews))
    }, [searchParams])

    return (<ul className="ReviewsList">
        {reviews.map((review)=>
        <li key={review.review_id} className="ReviewsList__item">
            <ReviewCard review={review}/>
        </li>)}
    </ul>)
    

}