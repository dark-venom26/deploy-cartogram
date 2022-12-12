import './product.scss';
import Carousel from 'react-material-ui-carousel'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { clearErrors, getProductDetails, newReview } from '../../redux/actions/productAction';
import { useParams } from 'react-router-dom';
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import AlertBox from '../../component/alert-box/AlertBox';
import Loader from '../../component/loader/Loader';
import ReviewCard from '../../component/review-card/ReviewCard';
import { addItemsToCart } from '../../redux/actions/cartAction';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { NEW_REVIEW_RESET } from '../../redux/constants/productConstants';

const Product = () => {

  const { loading, error, product } = useSelector((state) => state.productDetails);
  const { loading: reviewLoading, error: reviewError,  success } = useSelector((state) => state.newReview);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1)
  const [cartSuccess, setCartSuccess] = useState(false)
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0)
  const [reviewDescription, setReviewDescription] = useState("")
  const { productId } = useParams();

  useEffect(() => {
    if(error){
      dispatch(clearErrors());
    }

    if(reviewError){
      dispatch(clearErrors());
    }

    if(success){
      dispatch({type: NEW_REVIEW_RESET})
    }

    dispatch(getProductDetails(productId));
  }, [dispatch, error, productId, success, reviewError])

  const carouselOptions = {
    indicators: false,
    animation: "slide",
  }

  const increaseQuantity = (e) => {
    if(product.stock <= quantity)
      return;
    const qty = quantity + 1;
    setQuantity(qty);
    setCartSuccess(false);
  }

  const decreaseQuantity = (e) => {
    if(quantity <= 1)
      return;
    const qty = quantity - 1;
    setQuantity(qty);
    setCartSuccess(false);
  }

  const handleAddToCart = (e) => {
    dispatch(addItemsToCart(productId, quantity))
    setCartSuccess(true)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReviewSubmit = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", reviewDescription);
    myForm.set("productId", productId);

    dispatch(newReview(myForm));
    handleClose()
  }

  return (
    <>
      {
          <div className="product">
            {error && <AlertBox type="error" msg={error.statusText} />}
            {
              loading ? <Loader /> : product && <>
              <div className="product__top">
                <div className="product__top__left">
                  <div className="product__top__left__container">
                    <div className="product__top__left__container__carousel">
                      <Carousel {...carouselOptions}>
                        {
                          product.images && product.images.map((item, i) =>
                            <img key={item.url} className="product__top__left__container__carousel__img" src={item.url} alt={`${i} slide`} />
                          )
                        }
                      </Carousel>
                    </div>
                  </div>
                </div>
                <div className="product__top__right">
                {success && <AlertBox type="success" msg="Successfully! Reviewed Item" />}
                  <div className="product__top__right__info">
                    <div className="product__top__right__info__1">
                      <div className="product__top__right__info__1__name">{product.name}</div>
                      <p className="product__top__right__info__1__id">Product Id #{product._id}</p>
                    </div>
        
                    <div className="product__top__right__info__2">
                      <Stack spacing={1}>
                        <Rating value={product.ratings} precision={0.1} readOnly/>
                      </Stack>
                      <button onClick={handleClickOpen} className="product__top__right__info__2__btn" >Review</button>
                      <span className="product__top__right__info__2__reviews">({product.numOfReviews} Reviews)</span>
                    </div>
        
                    <div className="product__top__right__info__3">
                      <div className="product__top__right__info__3__price">₹{product.price}</div>
                      <div className="product__top__right__info__3__cart">
                        <div className="product__top__right__info__3__cart__button">
                          <button className="product__top__right__info__3__cart__button__left" onClick={decreaseQuantity}>-</button>
                          <input value={quantity} type="number" className='product__top__right__info__3__cart__button__input' readOnly/>
                          <button className="product__top__right__info__3__cart__button__right" onClick={increaseQuantity}>+</button>
                        </div>
                        {cartSuccess ? <button className="product__top__right__info__3__cart__add">Product Added</button> : <button disabled={product.stock < 1 ? true : false} onClick={handleAddToCart} className="product__top__right__info__3__cart__add">Add to Cart</button>}
                      </div>
                    </div>
        
                    <div className="product__top__right__info__4">
                      <div className="product__top__right__info__4__status">
                        Status: <span className={`product__top__right__info__4__status__value ${product.stock < 1 ? "txt-danger" : "txt-success"}`}>{product.stock < 1 ? "Out of stock" : "In stock"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Review</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Please give this product rating and tell us about your experience with this product.
                  </DialogContentText>
                  <div className="ratingBtn">
                    <Stack spacing={1}>
                          <Rating value={rating} onChange={(e)=> setRating(parseFloat(e.target.value))} precision={0.1} />
                    </Stack>
                  </div>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Tell us your experience"
                    type="text"
                    fullWidth
                    value={reviewDescription}
                    onChange={(e)=> setReviewDescription(e.target.value)}
                    variant="standard"
                  />
                </DialogContent>
                <DialogActions>
                  <div className="dialogActions">
                    <button className="dialogActions__btn" onClick={handleClose}>Cancel</button>
                    <button disabled={reviewLoading} className="dialogActions__btn" onClick={handleReviewSubmit}>{reviewLoading ? <Loader small={true}/> : "Submit Review"}</button>
                  </div>
                </DialogActions>
              </Dialog>
              <div className="product__bottom">
                <div className="product__bottom__heading">Description</div>
                <div className="product__bottom__description">{product.description}</div>
                <div className="product__bottom__reviews">
                  <h2 className='product__bottom__reviews__heading'>Reviews</h2>
                {
                  product.numOfReviews >= 1 ? (
                    product.reviews.map((review) => 
                    <div key={review._id} className="product__bottom__reviews__slider">
                      <ReviewCard review={review}/>
                    </div>
                    )) : (
                    <p className="product__bottom__reviews__no-reviews">No reviews yet</p>
                  )
                }
                  
                </div>
              </div>
        
            </>
            }
          </div>
      }

    </>
  )
}

export default Product
