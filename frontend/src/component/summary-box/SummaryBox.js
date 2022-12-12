import { buildStyles, CircularProgressbarWithChildren } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { InView } from 'react-intersection-observer';
import { colors } from '../../constants';
import './summary-box.scss';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function SummaryBox({ title, subtitle, percent:ptg, value, graph }) {
    if(ptg){
        var percent = ptg
    }else{
        percent = 0;
    }
    return (
        <div className='summary-box'>
            <div className={graph ? "summary-box__info" : "summary-box__info widthFull"}>
                <div>
                    <div className="summary-box__info__title">{title}</div>
                    <span className="summary-box__info__subtitle">{subtitle}</span>
                </div>
                <div className="summary-box__info__value">
                    {value}
                </div>
            </div>
            {
                graph &&
                <div className="summary-box__chart">
                    <InView>
                        {({ inView, ref }) => {

                            let percentage = inView ? percent : 0;

                            return (

                                <div ref={ref}>
                                    <CircularProgressbarWithChildren value={percentage} strokeWidth={10} styles={
                                        buildStyles({
                                            pathColor: percentage < 50 ? colors.red : colors.violet,
                                            trailColor: 'transparent',
                                            strokeLinecap: 'round'
                                        })
                                    }>
                                        <div className="summary-box__chart__value">{percentage}%</div>
                                    </CircularProgressbarWithChildren>
                                </div>
                            );
                        }}
                    </InView>
                </div>
            }

        </div>
    )
}

export default SummaryBox