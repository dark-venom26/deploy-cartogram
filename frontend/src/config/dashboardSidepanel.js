import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import StoreMallDirectoryOutlinedIcon from '@mui/icons-material/StoreMallDirectoryOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

const dashboardSidepanel = [
    {
        link: '/admin',
        section: 'admin',
        icon: <GridViewOutlinedIcon className="dashboardSidepanel__switcher__link__icon"/>,
        text: 'Dashboard'
    },
    {
        link: '/admin/orders',
        section: 'orders',
        icon: <CreditCardOutlinedIcon className="dashboardSidepanel__switcher__link__icon"/>,
        text: 'Orders'
    },
    {
        link: '/admin/products',
        section: 'products',
        icon: <StoreMallDirectoryOutlinedIcon className="dashboardSidepanel__switcher__link__icon"/>,
        text: 'Products'
    },
    {
        link: '/admin/users',
        section: 'users',
        icon: <PersonOutlineOutlinedIcon className="dashboardSidepanel__switcher__link__icon"/>,
        text: 'Users'
    },
    {
        link: '/admin/reviews',
        section: 'reviews',
        icon: <RateReviewOutlinedIcon className="dashboardSidepanel__switcher__link__icon"/>,
        text: 'Reviews'
    },
]

export default dashboardSidepanel