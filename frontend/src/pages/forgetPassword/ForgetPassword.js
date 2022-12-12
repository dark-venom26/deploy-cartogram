import './forgetPassword.scss'
import { Link } from "react-router-dom";
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import Loader from '../../component/loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../../redux/actions/profileAction';
import { forgetPassword } from '../../redux/actions/userAction';
import AlertBox from '../../component/alert-box/AlertBox';
import { useState } from 'react';

function ForgetPassword() {
    const {error, loading, message} = useSelector((state) => state.password);
    const dispatch = useDispatch();
    const [email, setEmail] = useState("")

    const handleForgetPassword = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("email", email);

        dispatch(clearErrors())
        dispatch(forgetPassword(myForm))
        setEmail("")
    }

    return (
        <div className="wrapper">
            <div className="wrapper__title">
                <div className="wrapper__title__heading">Forget Password</div>
            </div>
            {error && <AlertBox type="error" msg={error.data.message} />}
            {message && <AlertBox type="success" msg={message} />}
            <div className="wrapper__form">
                <form onSubmit={handleForgetPassword} className="wrapper__form__container">
                    <div className="wrapper__form__container__input">
                        <input type="email" value={email} onChange={(e)=> {setEmail(e.target.value)}} placeholder="Email Address" required />
                    </div>
                    <div className="wrapper__form__container__btn">
                        <button className="wrapper__form__container__btn__button" disabled={loading}>
                            Request Login Link { loading ? <Loader small={true}/> : <EastRoundedIcon className="wrapper__form__container__btn__button__icon" /> }
                        </button>
                    </div>
                    <div className="wrapper__form__container__bottom">
                        <p className="wrapper__form__container__bottom__title"><span>Already know password?</span><Link to="/signup" className='wrapper__form__container__bottom__title__link'>Signup</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgetPassword