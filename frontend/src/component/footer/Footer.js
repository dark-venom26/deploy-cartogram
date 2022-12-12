import './footer.scss';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer'>
        <div className="footer__left">
            <div className="footer__left__copyright">Copyright &copy; 2022</div>
            <div className="footer__left__copyright-caption">All rights reserved</div>
        </div>
        <div className="footer__middle">
            <div className="footer__middle__company-name">Cartogram</div>
            <div className="footer__middle__owner-name">Mr. Aman Vishwakarma</div>
        </div>
        <div className="footer__right">
            Follow us on
            <div className="footer__right__follow-us">
                <Link to="#" className="footer__right__follow-us__icon"><FacebookOutlinedIcon/></Link>
                <Link to="#" className="footer__right__follow-us__icon"><TwitterIcon/></Link>
                <Link to="#" className="footer__right__follow-us__icon"><InstagramIcon/></Link>
                <Link to="#" className="footer__right__follow-us__icon"><LinkedInIcon/></Link>
            </div>
        </div>
    </div>
  )
}

export default Footer