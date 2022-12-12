import DashboardWrapper from '../dashboard-wrapper/DashboardWrapper';
import './dashboard-users.scss';
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import Loader from '../loader/Loader';
import axios from 'axios';
import {
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_RESET,
} from '../../redux/constants/userConstants';
import { clearErrors, getAllUsers } from '../../redux/actions/userAction';

function DashboardUsers() {
  const dispatch = useDispatch();
  const { error, loading, users } = useSelector((state) => state.allUsers);
  const { error: deleteError, loading: deleteLoading, isDeleted } = useSelector((state) => state.updateUser);

  useEffect(() => {

    dispatch(getAllUsers());
    return () => {

      if (error || deleteError) {
        dispatch(clearErrors());
      }

      if (isDeleted) {
        dispatch({ type: DELETE_USER_RESET });
      }
    }
    // eslint-disable-next-line
  }, [dispatch])

  const handleDeleteUser = async (id) => {
    try{
      dispatch({type: DELETE_USER_REQUEST});
      
      const {data} = await axios.delete(`/api/v1/admin/user/${id}`)

      dispatch({type: DELETE_USER_SUCCESS, payload: data})

      dispatch(getAllUsers());

    }catch(error){
        dispatch({type: DELETE_USER_FAIL, payload: error.response})
    }
  }



  const columns = [
    { field: 'id', headerName: 'User ID', width: 250 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'role', headerName: 'Role', width: 100, renderCell: (params) => {
      return (
        <div className={params.row.role === "admin" ? "dashboardWrapper__table__role dashboardWrapper__table__admin" : "dashboardWrapper__table__role dashboardWrapper__table__user"}>{params.row.role}</div>
      )
    }},
    {
      field: 'actions', headerName: 'Actions', sortable: false, type: 'number', width: 200, renderCell: (params) => {
        return (
          <>
            <div className="dashboardWrapper__table__btns">
              <Link className='dashboardWrapper__table__btns__btn' to={`/admin/user/${params.row.id}`}><EditOutlinedIcon /></Link>
              <button className='dashboardWrapper__table__btns__btn' onClick={() => handleDeleteUser(params.row.id)}><DeleteOutlineOutlinedIcon /></button>
            </div>
          </>
        )
      }
    },
  ];

  let rows = [];

  users && users.forEach((item) => {
    rows.push({
      id: item._id,
      email: item.email,
      name: item.name,
      role: item.role,
    })
  })

  return (
    <DashboardWrapper>
      <div className="dashboardWrapper">
        <div className="dashboardWrapper__header">
          <div className="dashboardWrapper__header__heading heading">Users</div>
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

export default DashboardUsers