import './update-user.scss';
import { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../loader/Loader';
import AlertBox from '../alert-box/AlertBox';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import {
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    UPDATE_USER_RESET
} from '../../redux/constants/userConstants';
import axios from 'axios';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import { clearErrors, updateUser } from '../../redux/actions/userAction';

function UpdateUser() {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const { error: updateError, loading: updateLoading, isUpdated } = useSelector((state) => state.updateUser);
    const { loading } = useSelector((state) => state.userDetails);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("");

    useEffect(() => {

        const fetchUserDetails = async () => {
            try {
                dispatch({
                    type: USER_DETAILS_REQUEST
                });

                const {data} = await axios.get(`/api/v1/admin/user/${userId}`)

                dispatch({
                    type: USER_DETAILS_SUCCESS,
                    payload: data.user
                })

                setName(data.user.name);
                setEmail(data.user.email);
                setRole(data.user.role);

            } catch (error) {
                dispatch({
                    type: USER_DETAILS_FAIL,
                    payload: error.response
                })
            }
        }

        fetchUserDetails()

        if (updateError) {
            dispatch(clearErrors())
        }
        return () => {
            if (isUpdated) {
                dispatch({ type: UPDATE_USER_RESET });
            }
        }
    }, [dispatch, updateError, isUpdated, userId])

    const handleProductSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("role", role);

        dispatch(updateUser(userId, myForm))
    }


    return (
        <div className='updateUser'>
            <div className="wrapper">
                <div className="wrapper__title">
                    <div className="wrapper__title__heading">Update user</div>
                </div>
                {updateError && <AlertBox type="error" msg={updateError.data.message} />}
                {isUpdated && <AlertBox type="success" msg="Successfully! User Updated" />}
                {loading ? <Loader /> :
                    <div className="wrapper__form">
                        <form onSubmit={handleProductSubmit} className="wrapper__form__container">
                            <div className="wrapper__form__container__input">
                                <div className="wrapper__form__container__input__icon"><PersonOutlineOutlinedIcon /></div>
                                <input className='padding-left' type="text" placeholder="Name" autoComplete="off" value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>
                            <div className="wrapper__form__container__input">
                                <div className="wrapper__form__container__input__icon"><MailOutlinedIcon /></div>
                                <input className='padding-left' type="email" placeholder="Email" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>

                            <div className="wrapper__form__container__input">
                                <div className="wrapper__form__container__input__icon"><VerifiedUserOutlinedIcon /></div>
                                <select value={role} onChange={(e) => setRole(e.target.value)} required>
                                    <option value="">Choose role</option>
                                    <option value="Admin">Admin</option>
                                    <option value="User">User</option>
                                </select>
                            </div>
                            <div className="wrapper__form__container__btn">
                                <button className="wrapper__form__container__btn__button" disabled={loading || role === "" ? true : false}>
                                    Update {updateLoading ? <Loader small={true} /> : <CheckOutlinedIcon className="wrapper__form__container__btn__button__icon" />}
                                </button>
                            </div>
                            <div className="wrapper__form__container__bottom">
                                <p className="wrapper__form__container__bottom__title"><div>View Users</div><Link to="/admin/users" className='wrapper__form__container__bottom__title__link'><ArrowForwardOutlinedIcon className='wrapper__form__container__bottom__title__link__icon' /></Link></p>
                            </div>
                        </form>
                    </div>
                }
            </div>

        </div>
    )
}

export default UpdateUser