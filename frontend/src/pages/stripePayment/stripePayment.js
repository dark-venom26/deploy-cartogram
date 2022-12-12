import './stripePayment.scss';
import CheckoutSteps from '../../component/checkout-steps/CheckoutSteps';
import {CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements} from '@stripe/react-stripe-js';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import AlertBox from '../../component/alert-box/AlertBox';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import EventIcon from '@mui/icons-material/Event';
import { useEffect, useState } from 'react';
import Loader from '../../component/loader/Loader';
import { useNavigate } from "react-router-dom";
import { clearErrors, createOrder  } from '../../redux/actions/orderAction';

function StripePayment() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [raiseError, setRaiseError] = useState(null);

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const stripe = useStripe();
  const elements = useElements();

  const {shippingInfo, cartItems} = useSelector((state) => state.cart);
  const {user} = useSelector((state)=> state.user);
  const {error} = useSelector((state)=> state.newOrder);

  useEffect(() => {
    if(error){
      dispatch(clearErrors());
    }
  }, [error, dispatch])
  
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100)
  }

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subTotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice
  }

  const handleStripePayment = async(e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const {data} = await axios.post("/api/v1/stripe/payment/process", paymentData, config);

      const client_secret = data.client_secret;

      if(!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if(result.error){
        setLoading(false);
        setRaiseError(result.error.message);
      }else{
        if(result.paymentIntent.status === "succeeded"){
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status
          }

          dispatch(createOrder(order))
          navigate("/success");
        }else{
          setRaiseError("There's some issue while processing payment")
        }
      }

    } catch (err) {
      setLoading(false);
      console.log(err)
      setRaiseError(err.response.data.message);
    }

  }

  return (
    <div className="stripePayment">
        <CheckoutSteps activeStep={2} />
        <div className="wrapper">
            <div className="wrapper__title">
                <div className="wrapper__title__heading txt-center">Card Info</div>
            </div>
            {raiseError && <AlertBox type="error" msg={raiseError}/>}
            <div className="wrapper__form">
                <form onSubmit={handleStripePayment} className="wrapper__form__container">
                    <div className="wrapper__form__container__input">
                      <div className="wrapper__form__container__input__icon"><CreditCardOutlinedIcon/></div>
                      <CardNumberElement className='wrapper__form__container__input__payment'/>
                    </div>
                    <div className="wrapper__form__container__input">
                      <div className="wrapper__form__container__input__icon"><EventIcon/></div>
                      <CardExpiryElement className='wrapper__form__container__input__payment'/>
                    </div>
                    <div className="wrapper__form__container__input">
                      <div className="wrapper__form__container__input__icon"><VpnKeyOutlinedIcon/></div>
                      <CardCvcElement className='wrapper__form__container__input__payment'/>
                    </div>
                    <div className="wrapper__form__container__btn">
                        <button className="wrapper__form__container__btn__button" disabled={loading}>
                          { loading ? <Loader small={true}/> : `Pay - ₹${orderInfo && orderInfo.totalPrice}` }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default StripePayment