import React from 'react';
import Alert from '@material-ui/lab/Alert';
import { clearAllSessions } from 'utility/sessions';
const host = process.env.REACT_APP_HOST;

type Props = {
    severity?: any | 'success'|'info'|'error'|'warning';
    message?: string;
}

const Notification:React.FC<Props> = ({
    severity='info',
    message='',
}) => {
    if (message === "Request failed with status code 401") {
        clearAllSessions();
        window.location.href = `${host}`;
    }
    return message !== "" ? <Alert severity={severity}>{message}</Alert> : <></>
}
export default React.memo(Notification);