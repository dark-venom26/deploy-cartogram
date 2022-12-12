import './cart-item.scss';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addItemsToCart, removeItemsFromCart } from '../../redux/actions/cartAction';

function CartItem({product}) {
    const dispatch = useDispatch();

    const [quantity, setQuantity] = useState(product.quantity)

    const productSubTotal = () => {
        return product.price * quantity;
    }

    const increaseQuantity = (e) => {
        if(product.stock <= quantity)
          return;
        const qty = quantity + 1;
        setQuantity(qty);
        dispatch(addItemsToCart(product.product, qty))
      }
    
    const decreaseQuantity = (e) => {
        if(quantity <= 1)
            return;
        const qty = quantity - 1;
        setQuantity(qty);
        dispatch(addItemsToCart(product.product, qty))
    }

    const handleRemoveCartItem = () => {
        dispatch(removeItemsFromCart(product.product))
    }

  return (
    <tbody className="tbody">
        <tr>
            <td>{product.name}</td>
            <td><img src={product.image} alt="product img" /></td>
            <td>{quantity}</td>
            <td>₹{product.price}</td>
            <td>₹{productSubTotal()}</td>
            <td>
                <div className="tbody__actions">
                    <span className='tbody__actions__qty'>
                        <button className="tbody__actions__qty__btn" onClick={decreaseQuantity}>-</button>
                        <input value={quantity} type="number" className='tbody__actions__qty__input' readOnly/>
                        <button className="tbody__actions__qty__btn" onClick={increaseQuantity}>+</button>
                    </span>
                    <button className="tbody__actions__remove" onClick={handleRemoveCartItem}>Remove</button>
                </div>
            </td>
        </tr>
    </tbody>
  )
}

export default CartItem