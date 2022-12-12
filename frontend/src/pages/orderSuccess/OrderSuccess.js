import './orderSuccess.scss';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { emptyCart } from '../../redux/actions/cartAction';

function OrderSuccess() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(emptyCart());
    sessionStorage.setItem("orderInfo", "");
  })
  
  return (
    <div className='orderSuccess'>
        <div>
            <CheckCircleOutlinedIcon className="orderSuccess__icon" />
        </div>
        <div className='orderSuccess__title'>Your order has been placed successfully!</div>
        <Link to="/orders" className="orderSuccess__btn">View Order</Link>
    </div>
  )
}

export default OrderSuccess