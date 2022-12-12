import './alert-box.scss';
import Alert from '@mui/material/Alert';

function AlertBox({type, msg}) {
  return (
    <div className='alert'>
        <Alert severity={`${type}`}>{msg}</Alert>
    </div>
  )
}

export default AlertBox