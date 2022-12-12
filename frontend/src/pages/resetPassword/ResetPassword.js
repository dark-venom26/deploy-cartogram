import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../../component/loader/Loader';
import { useState } from 'react';
import AlertBox from '../../component/alert-box/AlertBox';
import { clearErrors, resetPassword } from '../../redux/actions/userAction';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useParams } from "react-router-dom"

function ResetPassword() {

  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.password);
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [hidePasswords, setHidePasswords] = useState(true)
  const token = useParams().token;

  const handleUpdatePassword = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(token, myForm));

    setPassword("")
    setConfirmPassword("")

    if (error) {
      dispatch(clearErrors());
    }
  }

  const handleHidePasswords = () => {
    if (hidePasswords) {
      setHidePasswords(false)
    } else {
      setHidePasswords(true)
    }
  }

  return (
    <div className="wrapper">
      <div className="wrapper__title">
        <div className="wrapper__title__heading">Update Password</div>
      </div>
      {error && <AlertBox type="error" msg={error.data.message} />}
      {success && <AlertBox type="success" msg="Successfully! Password reset" />}
      <div className="wrapper__form">
        <form className="wrapper__form__container" onSubmit={handleUpdatePassword}>
          <div className="wrapper__form__container__input">
            <input type={hidePasswords ? "password" : "text"} value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="New password" required />
            <span className="wrapper__form__container__input__display" onClick={handleHidePasswords}>
              {hidePasswords ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
            </span>
          </div>
          <div className="wrapper__form__container__input">
            <input type={hidePasswords ? "password" : "text"} value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} placeholder="Confirm password" required />
            <span className="wrapper__form__container__input__display" onClick={handleHidePasswords}>
              {hidePasswords ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
            </span>
          </div>
          <div className="wrapper__form__container__btn">
            <button className="wrapper__form__container__btn__button" disabled={loading}>{loading ? <Loader small={true} /> :
              "Reset Password"}</button>
          </div>
          <div className="wrapper__form__container__bottom">
            <p className="wrapper__form__container__bottom__title"><div>Already know password?</div><Link to="/signup" className='wrapper__form__container__bottom__title__link'>Sign up</Link></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword