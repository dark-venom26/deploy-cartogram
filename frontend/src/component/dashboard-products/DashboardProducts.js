import DashboardWrapper from '../dashboard-wrapper/DashboardWrapper';
import './dashboard-products.scss';
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getAdminProduct } from '../../redux/actions/productAction';
import {Link} from "react-router-dom";
import Loader from '../loader/Loader';
import {
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_RESET
} from "../../redux/constants/productConstants";
import axios from 'axios';


function DashboardProducts() {
  const dispatch = useDispatch();
  const {error, loading, products} = useSelector((state) => state.products);
  const {error:deleteError, loading:deleteLoading, isDeleted} = useSelector((state) => state.product);

  useEffect(() => {

    dispatch(getAdminProduct());
    return () => {

      if(error || deleteError){
        dispatch(clearErrors());
      }

      if(isDeleted){
        dispatch({type: DELETE_PRODUCT_RESET});
      }
    }
    // eslint-disable-next-line
  }, [dispatch])

  const handleDeleteProduct = async(id) => {
      try {
          dispatch({
              type: DELETE_PRODUCT_REQUEST
          });
  
          const {data} = await axios.delete(`/api/v1/admin/product/${id}`);
  
          dispatch({
              type: DELETE_PRODUCT_SUCCESS,
              payload: data
          })

          dispatch(getAdminProduct());
  
      } catch (error) {
          dispatch({
              type: DELETE_PRODUCT_FAIL,
              payload: error.response
          })
      }
  }
  


  const columns = [
    { field: 'id', headerName: 'Product ID', width: 250 },
    { field: 'name', headerName: 'Name', width: 250 },
    { field: 'stock', headerName: 'Stock', type: 'number', width: 100 },
    { field: 'price', headerName: 'Price', type: 'number', width: 120 },
    { field: 'actions', headerName: 'Actions', type: 'number', sortable: false, width: 150, renderCell: (params)=> {
      return (
        <>
          <div className="dashboardWrapper__table__btns">
            <Link className='dashboardWrapper__table__btns__btn' to={`/admin/product/${params.row.id}`}><EditOutlinedIcon/></Link>
            <button className='dashboardWrapper__table__btns__btn' onClick={()=>handleDeleteProduct(params.row.id)}><DeleteOutlineOutlinedIcon/></button>
          </div>
        </>
      )
    }},
  ];
  
  let rows = [];

  products && products.forEach((item) => {
    rows.push({
      id: item._id,
      stock: item.stock,
      price: `₹${item.price}`,
      name: item.name,
    })
  })

  return (
    <DashboardWrapper>
        <div className="dashboardWrapper">
          <div className="dashboardWrapper__header space-around">
            <div className="dashboardWrapper__header__heading heading">Products</div>
            <Link to="/admin/product" className="dashboardWrapper__header__btn">Add Product</Link>
          </div>
          <div className="dashboardWrapper__table">
            {
              loading || deleteLoading ? <Loader/> : 
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

export default DashboardProducts