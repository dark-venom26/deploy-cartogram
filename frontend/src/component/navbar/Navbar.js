import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import topNav from '../../config/topNav';
import './navbar.scss';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/userAction';
import { openSidebar } from '../../redux/actions/toggleSidebarAction';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'; import { useDetectClickOutside } from 'react-detect-click-outside';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

function Navbar({user , isAuthenticated}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();
  const [navDropdown, setNavDropdown] = useState(false)
  const [menu, setMenu] = useState(false)
  const profile = useRef()
  const dispatch = useDispatch();

  const toggleMenu = () => {
    if (!menu) {
      setMenu(true);
    } else {
      setMenu(false);
    }
  }

  useEffect(() => {
    const curPath = location.pathname.split('/')[1];
    const activeItem = topNav.findIndex(item => item.section === curPath)

    setActiveIndex(curPath.length === 0 ? 0 : activeItem);

  }, [setActiveIndex, location])

  // Handle Dropdown
  const handleDropdown = () => {
    setNavDropdown(false)
  }

  // Handle Logout
  const handleLogout = () => {
    dispatch(logout())
    setNavDropdown(false)
  }

  const handleSidebar = () => {
    setNavDropdown(false)
    dispatch(openSidebar())
  }


  // Profile Dropdown 
  const profileDropdownOption = [
    {authentication: true, link: "/cart", name: "Cart", classes: "menu-profile__dropdown__option", icon: <ShoppingCartOutlinedIcon />, func: handleDropdown },
    {authentication: !isAuthenticated, link: "/signup", name: "Signup", classes: "menu-profile__dropdown__option", icon: <HowToRegOutlinedIcon />, func: handleDropdown },
    {authentication: true, link: location.pathname, name: "Drawer", classes: "menu-profile__dropdown__option hide", icon: <MenuOpenOutlinedIcon />, func: handleSidebar },
    {authentication: isAuthenticated, link: "/account", name: "Profile", classes: "menu-profile__dropdown__option", icon: <AccountCircleOutlinedIcon />, func: handleDropdown },
    {authentication: isAuthenticated, link: "", name: "Logout", classes: "menu-profile__dropdown__option", icon: <LogoutIcon />, func: handleLogout },
  ]

  if(isAuthenticated && user.role === 'admin'){
    profileDropdownOption.unshift(
      {authentication: isAuthenticated, link: "/admin", name: "Dashboard", classes: "menu-profile__dropdown__option", icon: <DashboardOutlinedIcon />, func: handleDropdown }
    );
  }

  const handleProfileDropdown = (ref) => {
    if (navDropdown) {
      setNavDropdown(false)
    } else {
      setNavDropdown(true)
    }
  }
  function closeDropdown(event) {
    if (profile.current && !profile.current.contains(event.target)) {
      setNavDropdown(false)
    }
  }

  const profileDropdown = useDetectClickOutside({ onTriggered: closeDropdown });



  return (
    <header>
      <div className="menu-profile">
        <div ref={profile} className="menu-profile__icon" onClick={handleProfileDropdown}>
          <p className="menu-profile__icon__user">{user ? <img src={user.avatar.url} alt="avatar" className="menu-profile__icon__user__avatar" /> : <MoreVertOutlinedIcon/>}</p>
        </div>

        <div ref={profileDropdown} className={navDropdown ? "menu-profile__dropdown active" : "menu-profile__dropdown"}>

          {
            profileDropdownOption.map((item)=>(
              item.authentication &&
              <Link key={item.name} to={item.link} className={item.classes} onClick={item.func}>
                <span className="menu-profile__dropdown__option__icon">{item.icon}</span>
                <span className="menu-profile__dropdown__option__name">{item.name}</span>
              </Link>
            ))
          }

        </div>
      </div>
      <div className='menu-btn' onClick={toggleMenu}>
        <span className={`menu-btn__burger ${menu && "open"}`}></span>
      </div>

      <nav className={`nav ${menu && "open"}`}>
        <ul className={`menu-nav ${menu && "open"}`}>
          {
            topNav.map((nav, index) => (
              <li key={`nav-${index}`} className={`menu-nav__item ${(menu && "open") || (activeIndex === index && 'active')}`}>
                <Link to={nav.link} className="menu-nav__link" onClick={toggleMenu}><div className="menu-nav__link__icon">{nav.icon}</div><span className="menu-nav__link__text">{nav.text}</span></Link>
              </li>
            ))

          }
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
