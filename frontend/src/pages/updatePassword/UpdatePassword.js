import './updatePassword.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../../component/loader/Loader';
import { useState } from 'react';
import { updatePassword, clearErrors } from '../../redux/actions/profileAction';
import AlertBox from '../../component/alert-box/AlertBox';
import { loadUser } from '../../redux/actions/userAction';
import { UPDATE_PASSWORD_RESET } from '../../redux/constants/profileConstants';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

function UpdatePassword() {
  const dispatch = useDispatch();
  const { updating, isUpdated, error } = useSelector((state) => state.profile);
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [hidePasswords, setHidePasswords] = useState(true)
  const [hideNewPasswords, setHideNewPasswords] = useState(true)

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    
    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch({ type: UPDATE_PASSWORD_RESET });
    dispatch(updatePassword(myForm));
    dispatch(loadUser(true))

    setOldPassword("")
    setNewPassword("")
    setConfirmPassword("")

    if (error) {
      dispatch(clearErrors());
    }
  }
  
  const handleHidePasswords = () => {
    if(hidePasswords){
        setHidePasswords(false)
    }else{
        setHidePasswords(true)
    }
  }

  const handleHideNewPasswords = () => {
    if(hideNewPasswords){
      setHideNewPasswords(false)
    }else{
      setHideNewPasswords(true)
    }
  }


  return (
      <div className="wrapper">
        <div className="wrapper__title">
          <div className="wrapper__title__heading">Update Password</div>
        </div>
        {error && <AlertBox type="error" msg={error.data.message} />}
        {isUpdated && <AlertBox type="success" msg="Successfully! Profile updated" />}
        <div className="wrapper__form">
          <form className="wrapper__form__container" onSubmit={handleUpdatePassword}>
            <div className="wrapper__form__container__input">
              <input type={hidePasswords ? "password": "text"} value={oldPassword} onChange={(e) => { setOldPassword(e.target.value) }} placeholder="Old password" required/>
              <span className="wrapper__form__container__input__display" onClick={handleHidePasswords}>
                {hidePasswords ? <VisibilityOutlinedIcon/> : <VisibilityOffOutlinedIcon/>}
              </span>
            </div>
            <div className="wrapper__form__container__input">
              <input type={hideNewPasswords ? "password": "text"} value={newPassword} onChange={(e) => { setNewPassword(e.target.value) }} placeholder="New password" required/>
              <span className="wrapper__form__container__input__display" onClick={handleHideNewPasswords}>
                {hideNewPasswords ? <VisibilityOutlinedIcon/> : <VisibilityOffOutlinedIcon/>}
              </span>
            </div>
            <div className="wrapper__form__container__input">
              <input type={hideNewPasswords ? "password": "text"} value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} placeholder="Confirm password" required/>
              <span className="wrapper__form__container__input__display" onClick={handleHideNewPasswords}>
                {hideNewPasswords ? <VisibilityOutlinedIcon/> : <VisibilityOffOutlinedIcon/>}
              </span>
            </div>
            <div className="wrapper__form__container__btn">
              <button className="wrapper__form__container__btn__button" disabled={updating}>{updating ? <Loader small={true} /> : "Update Password"}</button>
            </div>
            <div className="wrapper__form__container__bottom">
              <p className="wrapper__form__container__bottom__title"><span>Already know password?</span><Link to="/account" className='wrapper__form__container__bottom__title__link'>View Profile</Link></p>
            </div>
          </form>
        </div>
      </div>
  )
}

export default UpdatePassword