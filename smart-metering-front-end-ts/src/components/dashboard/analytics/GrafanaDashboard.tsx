import classes from './GrafanaDashboard.module.css';

const GrafanaDashboard = () => {

  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0).getTime() ; // Convert milliseconds 
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999).getTime() ; // Convert milliseconds to nanoseconds

  const grafanaUrl = `http://localhost:3000/d/tu95axESz/namla?orgId=1&from=${startOfDay}&to=${endOfDay}&theme=light&viewPanel=2`
  return (
    <div className={classes.Dashboard}>
        <iframe
        src={grafanaUrl}
        width="100%"
        height="500px"
        title="Grafana Dashboard"
        />
    </div>
  );
};

export default GrafanaDashboard;