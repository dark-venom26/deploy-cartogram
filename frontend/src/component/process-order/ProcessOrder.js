import DashboardWrapper from '../dashboard-wrapper/DashboardWrapper';
import './process-order.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { clearErrors, getOrderDetails, updateOrder } from '../../redux/actions/orderAction';
import Loader from '../loader/Loader';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import {
    UPDATE_ORDER_RESET
} from '../../redux/constants/orderConstants';

function ProcessOrder() {
    const { loading, error, order } = useSelector((state) => state.orderDetails);
    const { loading: updateLoading, error: updateError, isUpdated } = useSelector((state) => state.order);
    const { orderId } = useParams();
    const dispatch = useDispatch();
    const [status, setStatus] = useState("");

    useEffect(() => {
        if (error) {
            dispatch(clearErrors())
        }

        if (updateError) {
            dispatch(clearErrors())
        }

        if (isUpdated) {
            dispatch({ type: UPDATE_ORDER_RESET })
        }

        dispatch(getOrderDetails(orderId))

    }, [dispatch, error, orderId, isUpdated, updateError])


    const handleProcessOrder = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("status", status);

        dispatch(updateOrder(orderId, myForm))
        setStatus("")
    }

    return (
        <DashboardWrapper>
            <div className="processOrder">
                {
                    loading ? <Loader /> :
                        <div className="processOrder__wrapper">
                            <div className={order?.orderStatus === "Delivered" ? "processOrder__wrapper__shippingDetails flex" : "processOrder__wrapper__shippingDetails"}>
                                <div className="processOrder__wrapper__shippingDetails__top">
                                    <div className="processOrder__wrapper__shippingDetails__top__heading heading">Shipping Info</div>
                                    <div className="processOrder__wrapper__shippingDetails__top__container">
                                        <div className="processOrder__wrapper__shippingDetails__top__container__block">
                                            <div className="processOrder__wrapper__shippingDetails__top__container__block__label">
                                                Name:
                                            </div>
                                            <div className="processOrder__wrapper__shippingDetails__top__container__block__value">
                                                {order?.user && order.user.name}
                                            </div>
                                        </div>
                                        <div className="processOrder__wrapper__shippingDetails__top__container__block">
                                            <div className="processOrder__wrapper__shippingDetails__top__container__block__label">
                                                Phone:
                                            </div>
                                            <div className="processOrder__wrapper__shippingDetails__top__container__block__value">
                                                {order?.shippingInfo && order.shippingInfo.phoneNo}
                                            </div>
                                        </div>
                                        <div className="processOrder__wrapper__shippingDetails__top__container__block">
                                            <div className="processOrder__wrapper__shippingDetails__top__container__block__label">
                                                Address:
                                            </div>
                                            <div className="processOrder__wrapper__shippingDetails__top__container__block__value">
                                                {order?.shippingInfo && `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="split"></div>
                                <div className="processOrder__wrapper__shippingDetails__middle">
                                    <div className="processOrder__wrapper__shippingDetails__middle__heading heading">Payment</div>
                                    <div className="processOrder__wrapper__shippingDetails__middle__container">
                                        <div className="processOrder__wrapper__shippingDetails__middle__container__block">
                                            <div className="processOrder__wrapper__shippingDetails__middle__container__block__label">
                                                Status
                                            </div>
                                            <div className={order?.paymentInfo && order.paymentInfo.status === "succeeded" ? "processOrder__wrapper__shippingDetails__middle__container__block__value green" : "processOrder__wrapper__shippingDetails__middle__container__block__value yellow"}>
                                                {order?.paymentInfo && order.paymentInfo.status === "succeeded" ? "PAID" : "NOT PAID"}
                                            </div>
                                        </div>
                                        <div className="processOrder__wrapper__shippingDetails__middle__container__block">
                                            <div className="processOrder__wrapper__shippingDetails__middle__container__block__label">
                                                Amount
                                            </div>
                                            <div className="processOrder__wrapper__shippingDetails__middle__container__block__value">
                                                ₹{order?.totalPrice}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="split"></div>
                                <div className="processOrder__wrapper__shippingDetails__middle">
                                    <div className="processOrder__wrapper__shippingDetails__middle__heading heading">Order</div>
                                    <div className="processOrder__wrapper__shippingDetails__middle__container">
                                        <div className="processOrder__wrapper__shippingDetails__middle__container__block">
                                            <div className="processOrder__wrapper__shippingDetails__middle__container__block__label">
                                                Status
                                            </div>
                                            <div className={order?.orderStatus === "Delivered" ? "processOrder__wrapper__shippingDetails__middle__container__block__value green" : "processOrder__wrapper__shippingDetails__middle__container__block__value yellow"}>
                                                {order?.orderStatus}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="split"></div>
                                <div className="processOrder__wrapper__shippingDetails__bottom">
                                    <div className="processOrder__wrapper__shippingDetails__bottom__heading heading">Cart Items</div>
                                    <div className="processOrder__wrapper__shippingDetails__bottom__container">
                                        {order?.orderItems && order.orderItems.map((item) => (
                                            <div key={item.product} className="processOrder__wrapper__shippingDetails__bottom__container__row">
                                                <div className="processOrder__wrapper__shippingDetails__bottom__container__row__img"><img src={item.image} alt="Product img" /></div>
                                                <div className="processOrder__wrapper__shippingDetails__bottom__container__row__name">{item.name}</div>
                                                <div className="processOrder__wrapper__shippingDetails__bottom__container__row__price">{item.quantity} X ₹{item.price} = <b>₹{item.price * item.quantity}</b></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {
                                order?.orderStatus !== "Delivered" &&
                                <>
                                    <div className="split-vertical"></div>
                                    <div className="processOrder__wrapper__processContainer">
                                        <div className="wrapper">
                                            <div>
                                                <div className="heading">Process Order</div>
                                            </div>
                                            <div className="wrapper__form">
                                                <form onSubmit={handleProcessOrder} className="wrapper__form__container">
                                                    <div className="wrapper__form__container__input">
                                                        <div className="wrapper__form__container__input__icon"><CategoryOutlinedIcon /></div>
                                                        <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                                                            <option value="">Choose Category</option>
                                                            {order?.orderStatus === "Processing" && (
                                                                <option value="Shipped">Shipped</option>
                                                            )}
                                                            {order?.orderStatus === "Shipped" && (
                                                                <option value="Delivered">Delivered</option>
                                                            )}
                                                        </select>
                                                    </div>

                                                    <div className="wrapper__form__container__btn">
                                                        <button className="wrapper__form__container__btn__button" disabled={loading || status === "" ? true : false}>
                                                            Process {updateLoading ? <Loader small={true} /> : <ArrowForwardOutlinedIcon className="wrapper__form__container__btn__button__icon" />}
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                }
            </div>
        </DashboardWrapper>
    )
}

export default ProcessOrder