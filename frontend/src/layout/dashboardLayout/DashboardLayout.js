import './dashboard-layout.scss';
import { Outlet } from 'react-router-dom'
import Navbar from '../../component/navbar/Navbar';
import Footer from '../../component/footer/Footer';
import { useSelector } from 'react-redux';
import DashboardSidepanel from '../../component/dashboard-sidepanel/DashboardSidepanel';

function DashboardLayout() {
  const {isAuthenticated, user} = useSelector((state) => state.user);

  return (
    <>
      <Navbar user={isAuthenticated && user} isAuthenticated={isAuthenticated}/>
      <div className='dashboardLayout'>
          <div className='dashboardLayout__sidePanel'>
            <DashboardSidepanel/>
          </div>
          <div className="dashboardLayout__mainPanel">
              <Outlet/>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default DashboardLayout