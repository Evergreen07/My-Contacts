import React, {useState, useContext, useEffect} from 'react';
import AuthContext from '../../context/auth/authContext'
import AlertContext from '../../context/alert/alertContext';
import Alerts from '../layouts/Alerts';

const Register = (props) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    const {setAlert} = alertContext;
    const {register, error, clearError, isAuthenticated } = authContext;

    useEffect(() => {
        if(isAuthenticated){
            props.history.push('/')
        }
        if(error){
            setAlert(error, 'danger');
            clearError();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history])

    const [user, setUser] = useState({
        name : '',
        email : '',
        password : '',
        cpassword : ''
    })

    const { name, email, password, cpassword } = user;

    const onChange = (e) => {
        setUser({...user, [e.target.name] : e.target.value})
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if(password !== cpassword){
            setAlert('Passwords do not match !!!', 'danger', 2000);
        } else{
            console.log('Registered', user);
            register({ name, email, password });

            setUser({
                name : '',
                email : '',
                password : '',
                cpassword : ''
            })
        }
    }

    return (
        <div className="sideform">
            <div className="quote"> 
                <h1>No matter where we are,</h1>
                <h1>Let's always keep in touch. . .</h1>
            </div>

            <div className="form-container">
                <h1>Account <span style={{color: 'cyan'}}>Register</span></h1>
                <form action="" onSubmit={onSubmit}>
                    <div className="form-group">
                        <span className="fas fa-user fa-lg"></span>
                        <input type="text" name='name' value={name} placeholder="Enter Name" onChange={onChange} autoComplete="off" required/>
                    </div>
                    
                    <div className="form-group">
                        <span className="fas fa-envelope fa-lg"></span>
                        <input type="text" name='email' value={email} placeholder="Enter Email" onChange={onChange} autoComplete="off" required/>
                    </div>
                    

                    <div className="form-group">
                        <span className="fas fa-lock fa-lg"></span>
                        <input type="password" name='password' value={password} placeholder="Enter Password" onChange={onChange} autoComplete="off" required minLength='6'/>
                    </div>
                    

                    <div className="form-group">
                        <span className="fas fa-lock fa-lg"></span>
                        <input type="password" name='cpassword' value={cpassword} placeholder="Re-Enter Password" autoComplete="off" onChange={onChange} required/>
                    </div>
                    <Alerts/>
                    <input type="submit" value="REGISTER" className="btn btn-block"/>
                </form>
            </div>
        </div>
    )
}

export default Register
