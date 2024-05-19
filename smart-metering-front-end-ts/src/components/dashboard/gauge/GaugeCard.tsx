import { Gauge } from '@mui/x-charts/Gauge';
import classes from "./GaugeCard.module.css"
export default function GaugeCard() {
  return <div className={classes.gaugeCard}>
      <Gauge width={300} height={200} value={60} startAngle={-90} endAngle={90} />
    </div>
}
