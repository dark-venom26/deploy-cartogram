import DashboardWrapper from '../dashboard-wrapper/DashboardWrapper';
import './dashboard-orders.scss';
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import Loader from '../loader/Loader';
import axios from 'axios';
import { clearErrors, getAllOrders } from '../../redux/actions/orderAction';
import {
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_RESET
} from '../../redux/constants/orderConstants';

function DashboardOrders() {
  const dispatch = useDispatch();
  const { error, loading, orders } = useSelector((state) => state.allOrders);
  const { error: deleteError, loading: deleteLoading, isDeleted } = useSelector((state) => state.order);

  useEffect(() => {

    dispatch(getAllOrders());
    return () => {

      if (error || deleteError) {
        dispatch(clearErrors());
      }

      if (isDeleted) {
        dispatch({ type: DELETE_ORDER_RESET });
      }
    }
    // eslint-disable-next-line
  }, [dispatch])

  const handleDeleteOrder = async (id) => {
    try {
      dispatch({ type: DELETE_ORDER_REQUEST })

      const { data } = await axios.delete(`/api/v1/admin/order/${id}`);

      dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success })

      dispatch(getAllOrders());

    } catch (error) {
      dispatch({
        type: DELETE_ORDER_FAIL,
        payload: error.response.data.message
      })
    }
  }



  const columns = [
    { field: 'id', headerName: 'Order ID', width: 250 },
    { field: 'status', headerName: 'Status', width: 150, renderCell: (params) => {
      return (
        <div className={params.row.status === "Delivered" ? "dashboardWrapper__table__status dashboardWrapper__table__delivered" : "dashboardWrapper__table__status dashboardWrapper__table__processing"}>{params.row.status}</div>
      )
    }},
    { field: 'itemsQty', headerName: 'Items Qty', type: 'number', width: 100 },
    { field: 'amount', headerName: 'Amount', type: 'number', width: 120 },
    {
      field: 'actions', headerName: 'Actions', type: 'number', sortable: false, width: 200, renderCell: (params) => {
        return (
          <>
            <div className="dashboardWrapper__table__btns">
              <Link className='dashboardWrapper__table__btns__btn' to={`/admin/order/${params.row.id}`}><EditOutlinedIcon /></Link>
              <button className='dashboardWrapper__table__btns__btn' onClick={() => handleDeleteOrder(params.row.id)}><DeleteOutlineOutlinedIcon /></button>
            </div>
          </>
        )
      }
    },
  ];

  let rows = [];

  orders?.orders?.forEach((item) => {
    rows.push({
      id: item._id,
      itemsQty: item.orderItems.length,
      amount: `₹${item.totalPrice}`,
      status: item.orderStatus,
    })
  })

  return (
    <DashboardWrapper>
      <div className="dashboardWrapper">
        <div className="dashboardWrapper__header">
          <div className="dashboardWrapper__header__heading heading">Orders</div>
        </div>
        <div className="dashboardWrapper__table">
          {
            loading || deleteLoading ? <Loader /> :
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={8}
                autoHeight
                disableSelectionOnClick
                rowsPerPageOptions={[8]}
              />
          }
        </div>
      </div>
    </DashboardWrapper>
  )
}

export default DashboardOrders