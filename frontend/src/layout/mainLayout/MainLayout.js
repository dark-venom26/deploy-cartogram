import './main-layout.scss';
import Navbar from '../../component/navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../../component/footer/Footer';
import Banner from '../../component/banner/Banner';
import { useSelector } from 'react-redux';

function MainLayout() {
  const {isAuthenticated, user} = useSelector((state) => state.user);

  return (
    <>
        <Navbar user={isAuthenticated && user} isAuthenticated={isAuthenticated}/>
        <Banner/>
        <div className="main">
            <div className="main__content">
                <Outlet/>
            </div>
        </div>
        <Footer/>
    </>
  )
}

export default MainLayout