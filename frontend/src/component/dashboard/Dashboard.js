import DashboardWrapper from '../dashboard-wrapper/DashboardWrapper';
import SummaryBox from '../summary-box/SummaryBox';
import './dashboard.scss';
import { getAdminProduct } from '../../redux/actions/productAction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { colors } from '../../constants';
import Loader from '../loader/Loader';
import Chart from '../chart/Chart';
import { getAllOrders, getAllTodaysOrders } from '../../redux/actions/orderAction';
import { getAllTodaysUsers, getAllUsers } from '../../redux/actions/userAction';

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const dispatch = useDispatch();

  const { loading, products} = useSelector((state) => state.products);
  const { loading:allOrdersLoading, orders:allOrders} = useSelector((state) => state.allOrders);
  const { loading:allTodaysOrdersLoading, orders:allTodaysOrders } = useSelector((state) => state.allTodaysOrders);
  const { loading:allLoadingUsers, users:allUsers } = useSelector((state) => state.allUsers);
  const { loading:allLoadingTodaysUsers, users:allTodaysUsers } = useSelector((state) => state.allTodaysUsers);

  useEffect(() => {

    dispatch(getAdminProduct());
    dispatch(getAllTodaysOrders());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
    dispatch(getAllTodaysUsers());
    // eslint-disable-next-line
  }, [])

  let outOfStock = 0;

  products && products.forEach((item) => {
    if(item.stock === 0){
      outOfStock += 1;
    }
  })

  const doughnutData = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: [colors.purple, colors.violet],
        hoverBackgroundColor: [colors.red, colors.green],
        data: [outOfStock, products.length - outOfStock]
      }
    ]
  }

  const options = {
    plugins: {
      legend: {
          display: false
      },
    }
  }

  return (
    <DashboardWrapper>
      <div className='dashboard'>
        <div className="dashboard__heading heading">Dashboard</div>
        <div className="dashboard__container">
          <div className="dashboard__container__row">
            <div className="dashboard__container__row__summary">
              {allTodaysOrdersLoading ? <Loader/> : <SummaryBox title="Profits" subtitle="Today's profit" graph={false} value={`₹${allTodaysOrders?.totalAmount / 10}`} />}
            </div>
            <div className="dashboard__container__row__summary">
              {allTodaysOrdersLoading ? <Loader/> : <SummaryBox title="Sales" subtitle="Today's sales" graph={false} value={`₹${allTodaysOrders?.totalAmount}`} />}
            </div>
          
            <div className="dashboard__container__row__summary">
              {allLoadingUsers && allLoadingTodaysUsers ? <Loader/> :<SummaryBox title="Users" subtitle="Today's new users" graph={true} value={allTodaysUsers.length} percent={parseInt((allTodaysUsers.length / allUsers.length) * 100) } />}
            </div>
            <div className="dashboard__container__row__summary">
              {allOrdersLoading && allTodaysOrdersLoading ? <Loader/> : <SummaryBox title="Orders" subtitle="Today's orders" graph={true} percent={parseInt((allTodaysOrders?.orders?.length / allOrders?.orders?.length) * 100)} value={allTodaysOrders?.orders?.length} />}
            </div>
          </div>
          <div className="dashboard__container__row">
            <div className="dashboard__container__row__charts">
              <div className="dashboard__container__row__charts__doughnutChartBlock">
                <div className="dashboard__container__row__charts__doughnutChartBlock__title">Stocks</div>
                  <div className="dashboard__container__row__charts__doughnutChartBlock__doughnutChart">
                    {
                      loading ? <Loader/> : <Doughnut className='dashboard__container__row__charts__doughnutChartBlock__doughnutChart__doughnut' data={doughnutData} options={options} />
                    }
                  </div>
              </div>
              <div className="dashboard__container__row__charts__rechart">
                <Chart title="Earnings" subtitle="Today's earnings"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardWrapper>
  )
}

export default Dashboard