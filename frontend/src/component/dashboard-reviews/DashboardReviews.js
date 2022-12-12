import DashboardWrapper from '../dashboard-wrapper/DashboardWrapper';
import './dashboard-reviews.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../loader/Loader';
import AlertBox from '../alert-box/AlertBox';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { clearErrors, getAllReviews } from '../../redux/actions/productAction';
import {
  DELETE_REVIEW_RESET,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  ALL_REVIEW_RESET, 
} from '../../redux/constants/productConstants';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

function DashboardReviews() {
  const dispatch = useDispatch();
  const { error: deleteError, loading: deleteLoading, isDeleted } = useSelector((state) => state.reviews);
  const { loading, error, reviews } = useSelector((state) => state.allReviews);
  const [productId, setProductId] = useState("")

  useEffect(() => {

    if (deleteError) {
      dispatch(clearErrors())
    }
    return () => {
      if (isDeleted) {
        dispatch({ type: DELETE_REVIEW_RESET });
      }

      dispatch({type: ALL_REVIEW_RESET})
    }
  }, [dispatch, deleteError, isDeleted])

  const handleReviewProduct = (e) => {
    setProductId(e.target.value)
    dispatch(getAllReviews(e.target.value))
  }


  
  const handleDeleteReview = async(id) => {
    try {
      dispatch({
          type: DELETE_REVIEW_REQUEST
      });

      const {data} = await axios.delete(`/api/v1/reviews?id=${id}&productId=${productId}`);

      dispatch({
          type: DELETE_REVIEW_SUCCESS,
          payload: data.success
      })

      dispatch(getAllReviews())

      setProductId("");
  } catch (error) {
      dispatch({
          type: DELETE_REVIEW_FAIL,
          payload: error.response
      })
  }
}



const columns = [
  { field: 'id', headerName: 'Review ID', width: 250 },
  { field: 'user', headerName: 'User', width: 200 },
  { field: 'comment', headerName: 'Comment', type: 'number', width: 250 },
  { field: 'rating', headerName: 'Rating', type: 'number', width: 120, renderCell: (params) => {
    return (
      <div className={params.row.rating >= 3 ? "dashboardWrapper__table__rating dashboardWrapper__table__high" : "dashboardWrapper__table__rating dashboardWrapper__table__low"}>{params.row.rating}</div>
    )
  }},
  { field: 'actions', headerName: 'Actions', type: 'number', sortable: false, width: 150, renderCell: (params)=> {
    return (
      <>
        <div className="dashboardWrapper__table__btns">
          <button className='dashboardWrapper__table__btns__btn' onClick={()=>handleDeleteReview(params.row.id)}><DeleteOutlineOutlinedIcon/></button>
        </div>
      </>
    )
  }},
];

let rows = [];

reviews && reviews.forEach((item) => {
  rows.push({
    id: item._id,
    user: item.name,
    comment: item.comment,
    rating: item.rating,
  })
})


  return (
    <DashboardWrapper>
      <div className='dashboardReviews'>

        <div className="wrapper">
          <div className="wrapper__title">
            <div className="wrapper__title__heading heading">Product</div>
          </div>
          {deleteError && <AlertBox type="error" msg={deleteError.data.message} />}
          {isDeleted && <AlertBox type="success" msg="Successfully! Review Deleted" />}
          {error && <AlertBox type="error" msg="Sorry! Product not found" />}

          <div className="wrapper__form">
            <form className="wrapper__form__container">
              <div className="wrapper__form__container__input">
                <div className="wrapper__form__container__input__icon"><AddShoppingCartOutlinedIcon /></div>
                <input className='padding-left' type="text" placeholder="Product ID" autoComplete="off" value={productId} onChange={handleReviewProduct} required />
              </div>
            </form>
          </div>
        </div>
        <div className="dashboardWrapper">
              <div className="dashboardWrapper__header">
                <div className="dashboardWrapper__header__heading heading">Reviews</div>
              </div>
              <div className="dashboardWrapper__table">
                {
                  loading || deleteLoading ? <Loader /> :
                    reviews?.length > 0 ?
                      <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={8}
                        autoHeight
                        disableSelectionOnClick
                        rowsPerPageOptions={[8]}
                      />
                    : <div>No reviews found</div>
                }
              </div>
            </div>
      </div>
    </DashboardWrapper>
  )
}

export default DashboardReviews