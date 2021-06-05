import React, {useState, useContext, useEffect} from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import Alerts from '../layouts/Alerts';

const Login = (props) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    
    const [user, setUser] = useState({
        email : '',
        password : ''
    })

    const { email, password } = user;
    const { login, error, isAuthenticated } = authContext;
    const { setAlert } = alertContext;

    useEffect(() => {
        if(isAuthenticated){
            props.history.push('/')
        }

        if(error){
            setAlert(error, 'danger');
        }

        //eslint-disable-next-line
    }, [error, isAuthenticated, props.history])

    const onChange = (e) => {
        setUser({...user, [e.target.name] : e.target.value})
    }

    const onSubmit = (e) => {
        e.preventDefault();
        //console.log('Logged In',user);
        
        login(user);
        
        setUser({
            email : '',
            password : ''
        })
    }

    return (
        <div className="sideform">
            <div className="quote"> 
                <h1>No matter where we are,</h1>
                <h1>Let's always keep in touch. . .</h1>
            </div>

            <div className="form-container">
                <h1>Account <span style={{color: 'cyan'}}>Login</span></h1>
                <form action="" onSubmit={onSubmit}>
                    <div className="form-group">
                        <span className="fas fa-user fa-lg"></span>
                        <input type="text" name='email' value={email} placeholder="Enter Email" onChange={onChange} required/>
                    </div>
                    

                    <div className="form-group">
                        <span className="fas fa-lock fa-lg"></span>
                        <input type="password" name='password' value={password} placeholder="Enter Password" onChange={onChange} required/>
                    </div>
                    <Alerts/>
                    <input type="submit" value="LOGIN" className="btn btn-block"/>
                </form>
            </div>
        </div>
    )
}

export default Login
