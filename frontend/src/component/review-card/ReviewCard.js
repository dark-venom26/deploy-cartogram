import images from '../../constants/images';
import './review-card.scss';
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

function ReviewCard({review}) {


  return (
    <div className="review-card">
      <div className="review-card__user">
        <img src={review.avatar? review.avatar : images.avt} alt="avatar" className="review-card__user__img"></img>
        <div>
          <div className="review-card__user__name">{review.name}</div>
          <div className="review-card__user__rating">
            <Stack spacing={1}>
              <Rating defaultValue={review.rating} precision={0.1} readOnly/>
            </Stack>
          </div>
        </div>
      </div>
      <div className="review-card__comment">{review.comment}</div>
    </div>
  )
}

export default ReviewCard