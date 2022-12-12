import './dashboard-wrapper.scss';
import Sidebar from '../sidebar/Sidebar';

function DashboardWrapper(props) {
  return (
    <div>{props.children}</div>
  )
}

export default DashboardWrapper

export const DashboardWrapperSidebar = (props) => {
    return (
        <div className="dashboard-wrapper__sidebar">
            <Sidebar>
                {props.children}
            </Sidebar>
        </div>
    )
}
