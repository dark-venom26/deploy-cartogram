import Sidebar from '../sidebar/Sidebar';
import './home-wrapper.scss';

function HomeWrapper(props) {
  return (
    <div className='home-wrapper'>
        {props.children}
    </div>
  )
}

export default HomeWrapper

export const HomeWrapperSidebar = (props) => {
    return (
        <div className="home-wrapper__sidebar">
            <Sidebar>
                {props.children}
            </Sidebar>
        </div>
    )
}

export const HomeWrapperMain = (props) => {
    return (
        <div className="home-wrapper__main">
            {props.children}
        </div>
    )
}