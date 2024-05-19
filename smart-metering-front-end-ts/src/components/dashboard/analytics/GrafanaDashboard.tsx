import classes from './GrafanaDashboard.module.css';
const GrafanaDashboard = () => {
  return (
    <div className={classes.Dashboard}>
        <iframe
        src="http://localhost:3000/d/RluH3vESk/all-graphs?orgId=1&from=1716080813791&to=1716081306837&theme=light&viewPanel=2"
        width="100%"
        height="600"
        title="Grafana Dashboard"
        />
    </div>
  );
};

export default GrafanaDashboard;