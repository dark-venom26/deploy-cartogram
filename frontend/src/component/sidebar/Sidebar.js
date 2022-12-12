import './sidebar.scss';
import { useDispatch, useSelector } from 'react-redux';
import { closeSidebar } from '../../redux/actions/toggleSidebarAction';

function Sidebar(props) {
  const {sidebar} = useSelector((state)=> state.sidebar)
  const dispatch = useDispatch();

  const handleSidebar = () => {
    dispatch(closeSidebar())
  }

  
  return (
    <>
      <div className={`sidebar ${sidebar && 'open'}`}>
        <div className="sidebar__handle">
          <div className="sidebar__handle__bar" onClick={handleSidebar}></div>
        </div>
        {props.children}
      </div>
      <div className="sidebar-background" onClick={handleSidebar}>
        <div className={`sidebar-background__blur ${sidebar && 'open'}`}></div>
      </div>
    </>
  )
}

export default Sidebar