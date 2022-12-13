import './order.scss';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, myOrders } from '../../redux/actions/orderAction';
import Loader from '../../component/loader/Loader';
import { ORDER_CANCEL_FAIL, ORDER_CANCEL_REQUEST, ORDER_CANCEL_RESET, ORDER_CANCEL_SUCCESS } from '../../redux/constants/orderConstants';
import axios from 'axios';

function Order() {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { loading:loadingOrderCancel, error:errorOrderCancel, isCancel } = useSelector((state) => state.orderCancel);

  useEffect(() => {

    dispatch(myOrders()); 

    if (error || errorOrderCancel) {
      dispatch(clearErrors());
    }
    return () => {

      if (isCancel) {
        dispatch({ type: ORDER_CANCEL_RESET });
      }
    }
    // eslint-disable-next-line
  }, [dispatch, error, errorOrderCancel])


  function createData(orderId, status, itemsQty, amount, shippingAddress, orderItems) {

    const orderDetails = [];

    orderItems.forEach(order => {
      orderDetails.push(
        {
          productId: order.product,
          name: order.name,
          image: order.image,
          quantity: order.quantity,
          price: order.price,
        }
      )
    })

    return {
      orderId,
      status,
      itemsQty,
      amount,
      shippingAddress,
      orderDetails,
    };
  }
  const rows = orders && orders.slice(0).reverse().map((item) => (
    createData(item._id, item.orderStatus, item.orderItems.length, item.totalPrice, `${item.shippingInfo.address}, ${item.shippingInfo.city}, ${item.shippingInfo.state}, ${item.shippingInfo.country}`, item.orderItems)
  ));

  return (
    <div className='order'>
      <div className="order__heading heading txt-center">My Orders</div>
      {
        loading || loadingOrderCancel ? <Loader /> :
          rows?.length === 0 ?
          <>
            <div className="split"></div>
            <div className='order__no'>You didn't order anything yet</div>
          </> :
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Order ID</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Item Qty</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell align="right">Shipping Address</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <Row key={row.orderId} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      }
    </div>
  )
}

export default Order


function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleCancelOrder = async (id) => {
    
    try {
      dispatch({type: ORDER_CANCEL_REQUEST})

      const {data} = await axios.delete(`/api/v1/order/${id}`);

      dispatch({type: ORDER_CANCEL_SUCCESS, payload: data.success})

      dispatch(myOrders()); 

  } catch (error) {
      dispatch({
          type: ORDER_CANCEL_FAIL,
          payload: error.response.data.message
      })
  }
  }

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.orderId}
        </TableCell>
        <TableCell align="right"><div className={row.status === "Delivered" ? "order__status order__delivered" : "order__status order__processing"}>{row.status}</div></TableCell>
        <TableCell align="right">{row.itemsQty}</TableCell>
        <TableCell align="right">₹{row.amount}</TableCell>
        <TableCell align="right">{row.shippingAddress}</TableCell>
        <TableCell align="right"><button onClick={() => handleCancelOrder(row.orderId)} className="order__cancel">Cancel Order</button></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Order Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Total Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.orderDetails.map((item) => (
                    <TableRow key={item.productId}>
                      <TableCell component="th" scope="row">
                        {item.name}
                      </TableCell>
                      <TableCell><img src={item.image} alt="product img"/></TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">₹{item.price * item.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
