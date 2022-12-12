import './profile.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../../component/loader/Loader';
import { useState } from 'react';
import { updateProfile, clearErrors } from '../../redux/actions/profileAction';
import AlertBox from '../../component/alert-box/AlertBox';
import { UPDATE_PROFILE_RESET } from '../../redux/constants/profileConstants';
import { loadUser } from '../../redux/actions/userAction';



function Profile() {
  const dispatch = useDispatch();
  const { loading, user } = useSelector((state) => state.user);
  const { updating, isUpdated, error } = useSelector((state) => state.profile);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState()

  const [toggleProfile, setToggleProfile] = useState(true)

  const handleEditProfile = () => {
    if (toggleProfile) {
      setToggleProfile(false)
    } else {
      setToggleProfile(true)
    }
  }

  const handleSaveChanges = () => {
    setToggleProfile(true)

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    if (avatar) {
      myForm.set("avatar", avatar);
    }
    dispatch({ type: UPDATE_PROFILE_RESET });
    dispatch(updateProfile(myForm));
    dispatch(loadUser(true))

    if (error) {
      dispatch(clearErrors());
    }
  }

  const changeImg = (e) => {
    const file = e.target.files[0]

    if (file) {
      setAvatar(file);
      setToggleProfile(false)
    } else {
      setAvatar();
    }
  }

  return (
    loading ? <Loader /> :
      <div className="profile">
        <div className="profile__left">
          <div className="profile__left__container">
            <div className="profile__left__container__img">
              <img src={avatar ? URL.createObjectURL(avatar) : user.avatar.url} alt="Avatar" />
              <label htmlFor="profileImg" className='profile__left__container__img__btn'>Choose Image</label>
              <input type="file" accept="image/*" id='profileImg' onChange={changeImg} className="profile__left__container__img__inp" />
            </div>
          </div>
          <div className="profile__left__edit">
            {
              toggleProfile ?
                <button onClick={handleEditProfile}>Edit profile</button> :
                <button onClick={handleSaveChanges}>Save Changes</button>
            }
          </div>
        </div>
        <div className="profile__right">
          <div className="profile__right__header">
            <div className="profile__right__header__heading">Profile</div>
            <div className="profile__right__header__user-id">User ID #{user._id}</div>
          </div>
          <div className="split"></div>
          {error && <AlertBox type="error" msg={error.data.message} />}
          {isUpdated && <AlertBox type="success" msg="Successfully! Profile updated" />}
          {
            updating ? <Loader /> :
              <div className="profile__right__container">
                <div className="profile__right__container__block">
                  <div className="profile__right__container__block__label">Name</div>
                  <input type="text" className={toggleProfile ? "profile__right__container__block__value" : "profile__right__container__block__value active"} onChange={(e) => setName(e.target.value)} value={name} disabled={toggleProfile} />
                </div>
                <div className="profile__right__container__block">
                  <div className="profile__right__container__block__label">Email</div>
                  <input type="text" className={toggleProfile ? "profile__right__container__block__value" : "profile__right__container__block__value active"} onChange={(e) => setEmail(e.target.value)} value={email} disabled={toggleProfile} />
                </div>
                <div className="profile__right__container__block">
                  <div className="profile__right__container__block__label">Joined on</div>
                  <div className="profile__right__container__block__value">{String(user.createdAt).slice(0, 10)}</div>
                </div>
              </div>
          }
          <div className="profile__right__bottom">
            <div className="profile__right__bottom__btn">
              <Link to="/orders">My orders</Link>
            </div>
            <div className="profile__right__bottom__btn">
              <Link to="/password/update">Change Password</Link>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Profile
