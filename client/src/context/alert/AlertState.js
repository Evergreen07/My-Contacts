import React,{ useReducer } from 'react'
import AlertContext from './alertContext'
import alertReducer from './alertReducer'
import {v4 as uuid} from 'uuid'
import {
    SET_ALERT,
    REMOVE_ALERT
} from '../types';

const AlertState = (props) => {
    const initialState = []

    const [state, dispatch] = useReducer(alertReducer, initialState);


    //Set Alert 
    const setAlert = (msg, type, timeout = 2000) => {
        const id = uuid();
        dispatch({type : SET_ALERT, payload : {id, msg, type}});

        setTimeout(() => dispatch({type: REMOVE_ALERT, payload: id}), timeout);
    }


    return (
        <AlertContext.Provider
            value = {{
                alerts : state,
                setAlert
            }}
        >
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState;