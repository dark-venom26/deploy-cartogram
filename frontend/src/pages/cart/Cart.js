import { useSelector } from 'react-redux';
import CartItem from '../../component/cart-item/CartItem';
import './cart.scss';
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const handleGrossPayment = () => {
    return cartItems.reduce((acc, item)=>
      acc + item.price * item.quantity, 0
      )
  }

  const handleCheckout = () => {
    navigate('/signup?redirect=shipping')
  }

  return (
    <div className="cart">
      <div className="cart__heading heading">
        Cart
      </div>
      {
        cartItems.length === 0 ? 
        <>
          <div className="split"></div>
          <p className="cart__no-product">You don't have any product in cart</p> 
        </>:
          <div className="cart__container">
            <div className='cart__container__item'>
              <table className="cart__container__item__table">
                <thead className="cart__container__item__table__thead">
                  <tr>
                    <th>Product Name</th>
                    <th>Image</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Sub Total</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                {
                  cartItems.map((item) => {
                    return <CartItem key={item.product} product={item} />
                  })
                }
                <tbody className='tbody'>
                <tr>
                    <th colSpan={4}>Gross Payment</th>
                    <td colSpan={1}>₹{handleGrossPayment()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="cart__container__checkout">
              <button onClick={handleCheckout} className="cart__container__checkout__btn">Checkout <EastRoundedIcon className="cart__container__checkout__btn__icon"/></button>
            </div>
          </div>
      }
    </div>
  )
}

export default Cart