import { useEffect, useState } from 'react';
import './signup.scss';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import { Link, useLocation, useNavigate } from "react-router-dom";
import images from '../../constants/images';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, login, raiseErrors, register } from '../../redux/actions/userAction';
import Loader from '../../component/loader/Loader';
import AlertBox from '../../component/alert-box/AlertBox';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

function Signup() {
    const dispatch = useDispatch();
    const {error, loading, isAuthenticated} = useSelector((state) => state.user);

    const [slider, setSlider] = useState("active")
    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [avatar, setAvatar] = useState("")
    const [avatarPreview, setAvatarPreview] = useState(images.avt)
    const [hideLoginPassword, setHideLoginPassword] = useState(true)
    const [hideRegisterPassword, setHideRegisterPassword] = useState(true)
    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const {name, email, password, confirmPassword} = user;

    const loginSlider = () => {
        setSlider("")
    }

    const registerSlider = () => {
        setSlider("active")
    }

    const redirect = location.search ? `/${location.search.split("=")[1]}` : "/"
    useEffect(() => {
      if(isAuthenticated){
        navigate(redirect)
      }
    }, [isAuthenticated, navigate, redirect])

    const handleHideLoginPassword = () => {
        if(hideLoginPassword){
            setHideLoginPassword(false)
        }else{
            setHideLoginPassword(true)
        }
    }

    const handleHideRegisterPassword = () => {
        if(hideRegisterPassword){
            setHideRegisterPassword(false)
        }else{
            setHideRegisterPassword(true)
        }
    }
    

    const handleLoginSubmit = (e)=> {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword))
        setLoginEmail("")
        setLoginPassword("")
        
        if(error){
            dispatch(clearErrors());
        }
    }

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        
        if(password === confirmPassword){

            const myForm = {
                "name": name,
                "email": email,
                "password": password,
                "avatar": avatar,
            }
            
            dispatch(register(myForm));

            setUser({
                name: "",
                email: "",
                password: "",
                confirmPassword: ""
            })
            
            setAvatarPreview(images.avt);
            setAvatar("");
            
            if(error){
                dispatch(clearErrors());
            }
        }else{
            const error = {
                data: {
                    success: false,
                    message: "Password doesn't matched!"
                }
            }
            dispatch(raiseErrors(error))
        }
    }

    const registerDataChange = (e)=> {
        if(e.target.name === "avatar"){
            const file = e.target.files[0]
            if(file){
                const reader = new FileReader();
                reader.readAsDataURL(file);

                reader.onloadend = () => {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            }else{
                setAvatarPreview(images.avt);
                setAvatar("");
            }
        }else{
            setUser({...user, [e.target.name]: e.target.value});
        }
    }


  return (
    <div className="wrapper">
        <div className="wrapper__title">
            <div className={`${slider} wrapper__title__heading-login`}>Login</div>
            <div className={`${slider} wrapper__title__heading-register`}>Register</div>
        </div>
        <div className="wrapper__slider">
            <input type="radio" name="slider" id="login" defaultChecked/>
            <input type="radio" name="slider" id="register" />
            <label htmlFor="login" className={`${slider} wrapper__slider__label__login`} onClick={loginSlider}>Login</label>
            <label htmlFor="register" className= {`${slider} wrapper__slider__label__register`} onClick={registerSlider}>Register</label>
            <div className={`${slider} wrapper__slider__tab`} ></div>
        </div>
        {error && <AlertBox type="error" msg={error.data.message}/>}
        {isAuthenticated && <AlertBox type="success" msg="Successfully! logged in"/>}
        <div className="wrapper__form">
            <form onSubmit={handleLoginSubmit} className={`${slider} wrapper__form__container login`}>
                <div className="wrapper__form__container__input">
                    <input type="email" name="loginEmail" placeholder="Email Address" autoComplete="off" value={loginEmail} onChange={(e)=> setLoginEmail(e.target.value)} required />
                </div>
                <div className="wrapper__form__container__input">
                    <input type={hideLoginPassword ? "password": "text"} name="loginPassword" placeholder="Password" autoComplete="off" value={loginPassword} onChange={(e)=> setLoginPassword(e.target.value)} required />
                    <span className="wrapper__form__container__input__display" onClick={handleHideLoginPassword}>
                        {hideLoginPassword ? <VisibilityOutlinedIcon/> : <VisibilityOffOutlinedIcon/>}
                    </span>
                </div>
                <div className="wrapper__form__container__btn">
                    <button className="wrapper__form__container__btn__button" disabled={loading}>
                        Login {loading ? <Loader small={true}/> : <VpnKeyRoundedIcon className="wrapper__form__container__btn__button__icon"/>}
                    </button>
                </div>
                <div className="wrapper__form__container__bottom">
                    <p className="wrapper__form__container__bottom__title"><span>Forget Password?</span><Link to="/password/forget" className='wrapper__form__container__bottom__title__link'>Click me</Link></p>
                </div>
            </form>
            <form onSubmit={handleRegisterSubmit} className={`${slider} wrapper__form__container register`}>
                <div className="wrapper__form__container__input">
                    <input type="text" name='name' placeholder="Name" autoComplete="off" value={name} onChange={registerDataChange} required/>
                </div>
                <div className="wrapper__form__container__input">
                    <input type="email" name='email' placeholder="Email Address" autoComplete="off" value={email} onChange={registerDataChange} required/>
                </div>
                <div className="wrapper__form__container__input">
                    <input type={hideRegisterPassword ? "password": "text"} name='password' placeholder="Password" autoComplete="off" value={password} onChange={registerDataChange} minLength="6" required />
                    <span className="wrapper__form__container__input__display" onClick={handleHideRegisterPassword}>
                        {hideRegisterPassword ? <VisibilityOutlinedIcon/> : <VisibilityOffOutlinedIcon/>}
                    </span>
                </div>
                <div className="wrapper__form__container__input">
                    <input type={hideRegisterPassword ? "password": "text"} name='confirmPassword' placeholder="Confirm password" autoComplete="off" value={confirmPassword} onChange={registerDataChange} minLength="6" required />
                    <span className="wrapper__form__container__input__display" onClick={handleHideRegisterPassword}>
                        {hideRegisterPassword ? <VisibilityOutlinedIcon/> : <VisibilityOffOutlinedIcon/>}
                    </span>
                </div>
                <div className="wrapper__form__container__input">
                    <img className={avatarPreview === images.avt ? 'wrapper__form__container__input__avatar-preview' : 'wrapper__form__container__input__avatar-preview active'} src={avatarPreview} alt="Avatar Preview" />
                    <input type="file" name="avatar" accept="image/*" className='wrapper__form__container__input__avatar' onChange={registerDataChange} required />
                </div>

                <div className="wrapper__form__container__btn">
                    <button className="wrapper__form__container__btn__button">
                        Register {loading ? <Loader small={true}/> : <LockOpenOutlinedIcon className="wrapper__form__container__btn__button__icon"/>}
                    </button>
                </div>
                <div className="wrapper__form__container__bottom">
                    <p className="wrapper__form__container__bottom__title"><span>Already signup?</span><span className='wrapper__form__container__bottom__title__link' onClick={loginSlider}>Login</span></p>
                </div>
            </form>
        </div>

</div>
  )
}

export default Signup