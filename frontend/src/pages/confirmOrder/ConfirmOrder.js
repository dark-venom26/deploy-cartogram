import './confirmOrder.scss';
import CheckoutSteps from '../../component/checkout-steps/CheckoutSteps';
import { useSelector } from 'react-redux';
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import { useNavigate } from "react-router-dom";

function ConfirmOrder() {
    const { user } = useSelector((state) => state.user);
    const { cartItems, shippingInfo } = useSelector((state) => state.cart);
    const navigate = useNavigate();

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

    const subTotal = cartItems.reduce((acc, item)=>
        acc + item.price * item.quantity, 0
    )

    const tax = subTotal * 0.18;

    const shippingCharges = subTotal > 10000 ? 0 : 500;
    
    const totalPrice = subTotal + tax + shippingCharges;

    const handleProceedToPayment = () => {
        const data = {
            subTotal,
            shippingCharges,
            tax,
            totalPrice
        }

        sessionStorage.setItem("orderInfo", JSON.stringify(data));

        navigate("/process/stripe/payment")

    }

  return (
    <>
        <CheckoutSteps activeStep={1}/>
        <div className='confirmOrder'>
        <div className="confirmOrder__shippingDetails">
            <div className="confirmOrder__shippingDetails__top">
                <div className="confirmOrder__shippingDetails__top__heading heading">Shipping Info</div>
                <div className="confirmOrder__shippingDetails__top__container">
                    <div className="confirmOrder__shippingDetails__top__container__block">
                        <div className="confirmOrder__shippingDetails__top__container__block__label">
                            Name:
                        </div>
                        <div className="confirmOrder__shippingDetails__top__container__block__value">
                            {user.name}
                        </div>
                    </div>
                    <div className="confirmOrder__shippingDetails__top__container__block">
                        <div className="confirmOrder__shippingDetails__top__container__block__label">
                            Phone:
                        </div>
                        <div className="confirmOrder__shippingDetails__top__container__block__value">
                            {shippingInfo.phoneNo}
                        </div>
                    </div>
                    <div className="confirmOrder__shippingDetails__top__container__block">
                        <div className="confirmOrder__shippingDetails__top__container__block__label">
                            Address:
                        </div>
                        <div className="confirmOrder__shippingDetails__top__container__block__value">
                            {address}
                        </div>
                    </div>
                </div>
            </div>
            <div className="split"></div>
            <div className="confirmOrder__shippingDetails__bottom">
                <div className="confirmOrder__shippingDetails__bottom__heading heading">Your Cart Items</div>
                <div className="confirmOrder__shippingDetails__bottom__container">
                    {cartItems.map((item) => (
                        <div key={item.product} className="confirmOrder__shippingDetails__bottom__container__row">
                            <div className="confirmOrder__shippingDetails__bottom__container__row__img"><img src={item.image} alt="Product img" /></div>
                            <div className="confirmOrder__shippingDetails__bottom__container__row__name">{item.name}</div>
                            <div className="confirmOrder__shippingDetails__bottom__container__row__price">{item.quantity} X ₹{item.price} = <b>₹{item.price * item.quantity}</b></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <div className="split-vertical"></div>
        <div className="confirmOrder__orderSummary">
            <div className="confirmOrder__orderSummary__container">
                <div className="confirmOrder__orderSummary__container__heading heading txt-center">Order Summary</div>
                <div className="confirmOrder__orderSummary__container__details">
                    <div className="confirmOrder__orderSummary__container__details__block">
                        <div className="confirmOrder__orderSummary__container__details__block__label">Sub Total</div>
                        <div className="confirmOrder__orderSummary__container__details__block__value">₹{subTotal}</div>
                    </div>
                    <div className="confirmOrder__orderSummary__container__details__block">
                        <div className="confirmOrder__orderSummary__container__details__block__label">Shipping Charges</div>
                        <div className="confirmOrder__orderSummary__container__details__block__value">₹{shippingCharges}</div>
                    </div>
                    <div className="confirmOrder__orderSummary__container__details__block">
                        <div className="confirmOrder__orderSummary__container__details__block__label">Taxes(18% GST)</div>
                        <div className="confirmOrder__orderSummary__container__details__block__value">₹{tax}</div>
                    </div>
                    <div className="normal-split"></div>
                    <div className="confirmOrder__orderSummary__container__details__block">
                        <div className="confirmOrder__orderSummary__container__details__block__label">Total Payable Amount</div>
                        <div className="confirmOrder__orderSummary__container__details__block__value">₹{totalPrice}</div>
                    </div>
                </div>
                    <button onClick={handleProceedToPayment} className="confirmOrder__orderSummary__container__btn">Proceed To Payment <EastRoundedIcon className="confirmOrder__orderSummary__container__details__btn__icon"/> </button>

            </div>
        </div>
    </div>
    </>
    
  )
}

export default ConfirmOrder