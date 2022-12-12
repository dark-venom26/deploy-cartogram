import './chart.scss';
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import { colors } from '../../constants';
import Loader from '../loader/Loader';
import { useSelector } from 'react-redux';


function Chart({title, subtitle}) {

  const { loading,  orders} = useSelector((state) => state.allTodaysOrders);

  var data = [];
  
  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  orders?.orders?.forEach((item)=>{
    data.push({
      name: formatAMPM(new Date(item.createdAt)),
      Total: item.totalPrice
    })
  })
  

  return (
    <div className='chart'>
      <div className="chart__title">{title}</div>
      <div className="chart__subtitle">{subtitle}</div>
          <div className="chart__graph">
          {
            loading ? <Loader/> : 
            <ResponsiveContainer aspect={2 / 1}>
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                      <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={colors.violet} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={colors.violet} stopOpacity={0}/>
                      </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke='gray' />
                  <CartesianGrid strokeDasharray="3 3" className='chart__graph__chartGrid' />
                  <Tooltip />
                  <Area type="monotone" dataKey="Total" stroke={colors.violet} fillOpacity={1} fill="url(#total)" />
              </AreaChart>
            </ResponsiveContainer>
          }
        </div>      
    </div>
  )
}

export default Chart