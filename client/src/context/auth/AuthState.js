import React, {useReducer} from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthtoken from '../../utils/setAuthtoken'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL ,
    LOGIN_SUCCESS ,
    LOGIN_FAIL ,
    USER_LOADED ,
    LOGOUT ,
    AUTH_ERROR ,
    CLEAR_ERROR
} from '../types';

const AuthState = (props) =>{
    const initialState = {
       token : localStorage.getItem('token'),
       isAuthenticated : false,
       loading : true,
       user : null,
       error :  null
    };


    const [state, dispatch] = useReducer(authReducer, initialState);


    //LOAD USER
    const loadUser = async () => {
        //load token
        if(localStorage.token){
            setAuthtoken(localStorage.token);
        }

        try {
            const res = await axios.get('api/auth');

            dispatch({
                type: USER_LOADED,
                payload: res.data
            })

        } catch (error) {
            dispatch({
                type: AUTH_ERROR
            })
        }
    }


    //REGISTER USER
    const register = async (formData) => {
        let config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        try {
            const res = await axios.post('api/users', formData, config);

            //Dispatch & get Token from backend
            dispatch({
                type: REGISTER_SUCCESS, 
                payload: res.data
            })

            loadUser();
        } catch (error) {
            dispatch({
                type: REGISTER_FAIL, 
                payload: error.response.data.msg
            })
        }
    }


    //LOGIN USER
    const login = async (formData) => {
        let config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        try {
            const res = await axios.post('api/auth', formData, config);

            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })

            loadUser();
        } catch (error) {
            dispatch({
                type: LOGIN_FAIL, 
                payload: error.response.data.msg
            })
        }
    }


    //LOGOUT
    const logout = () => {
        dispatch({
            type: LOGOUT
        })
    }


   //CLEAR ERRORS
    const clearError = () => {
        dispatch({type: CLEAR_ERROR});
    }

    return (
        <AuthContext.Provider
        value={{
            token : state.token,
            isAuthenticated : state.isAuthenticated,
            user : state.user,
            loading : state.loading,
            error :  state.error,
            loadUser, register, login, logout, clearError
        }}>
            {props.children}
        </AuthContext.Provider>
    )
};

export default AuthState;