import './not-found.scss';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className='notFound'>
        <div>
            <ErrorOutlineOutlinedIcon className="notFound__icon" />
        </div>
        <div className='notFound__title'>Page Not Found!</div>
        <Link to="/" className="notFound__btn">Home</Link>
    </div>
  )
}

export default NotFound