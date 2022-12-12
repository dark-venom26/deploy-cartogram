import { DashboardWrapperSidebar } from '../dashboard-wrapper/DashboardWrapper';
import './dashboard-sidepanel.scss';
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import dashboardSidepanel from '../../config/dashboardSidepanel';

function DashboardSidepanel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const location = useLocation()

  useEffect(()=>{

    if(location.pathname.split('/').length <= 2){
      var curPath = location.pathname.split('/')[1]
    }else{
      curPath = location.pathname.split('/')[2]
    }
    
    const activeItem = dashboardSidepanel.findIndex(item => item.section === curPath)
    setActiveIndex(curPath.length === 0 ? 0 : activeItem)
  }, [setActiveIndex, location])


  return (
    <DashboardWrapperSidebar>
      <div className="dashboardSidepanel">
        <div className="dashboardSidepanel__companyLogo txt-center">Cartogram</div>
        <div className="dashboardSidepanel__switcher">
          
          {
            dashboardSidepanel.map((nav, index) => (
              <Link to={nav.link} key={`nav-${index}`} className={`dashboardSidepanel__switcher__link ${activeIndex === index && 'active'}`}>
                {nav.icon}<p>{nav.text}</p>
              </Link>
            ))
          }
        </div>
      </div>
    </DashboardWrapperSidebar>
  )
}

export default DashboardSidepanel