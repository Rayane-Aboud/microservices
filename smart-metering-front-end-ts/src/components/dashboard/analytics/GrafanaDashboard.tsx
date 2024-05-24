import classes from './GrafanaDashboard.module.css';
const GrafanaDashboard = () => {
  return (
    <div className={classes.Dashboard}>
        <iframe
        src="http://localhost:3000/d/tu95axESz/namla?orgId=1&from=1716479404496&to=1716501004496&theme=light&viewPanel=2"
        width="100%"
        height="700px"
        title="Grafana Dashboard"
        />
    </div>
  );
};

export default GrafanaDashboard;