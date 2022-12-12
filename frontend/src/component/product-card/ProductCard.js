import { Link } from 'react-router-dom'
import './product-card.scss'
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

function ProductCard({product}) {
  return (
    <div className='product-card'>
        <Link to={`/product/${product._id}`}>
            <img src={product.images[0]?.url} alt={product.name} />
            <div className="product-card__details">
                <p>{product.name}</p>
                <div className="product-card__details__ratings">
                    <Stack spacing={1}>
                        <Rating defaultValue={product.ratings} precision={0.1} readOnly/>
                    </Stack>
                    <span className='product-card__details__ratings__reviews'>({product.numOfReviews} Reviews)</span>
                </div>

                <span className='product-card__details__price'>{`₹${product.price}`}</span>
            </div>
        </Link>
    </div>
  )
}

export default ProductCard