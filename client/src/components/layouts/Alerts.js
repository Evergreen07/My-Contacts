import React,{useContext} from 'react'
import AlertContext from '../../context/alert/alertContext';

const Alerts = () => {
    const alertContext = useContext(AlertContext);
    const {alerts} = alertContext;

    return (
        alerts && alerts.map((i) => (
            <div key={i.id} className="alt">
                <i className="fas fa-info-circle"></i> {i.msg}
            </div>
        ))
    )
}

export default Alerts
