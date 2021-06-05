import React,{Fragment, useContext} from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext'
import ContactContext from '../../context/contact/contactContext'

const Navbar = () => {
    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext);
    const {logout, isAuthenticated, user} = authContext;
    const {clearContacts} = contactContext;

    const onLogout = () => {
        window.location.reload();
        logout();
        clearContacts();
    }

    const authLinks = (
        <Fragment>
                <li>
                    <h3><Link to='/about'> <span style={{color:'cyan'}}>A</span>bout</Link></h3>
                </li>

                <li>
                    <h3 style={{fontStyle:'italic' }}><Link to='/'>{user && user.name}</Link></h3>
                </li>
                
                <li>
                    <h3><Link to='/login' onClick={onLogout}><span style={{color:'cyan'}}>L</span>ogout</Link> </h3>    
                </li>
        </Fragment>
    )
    
    const guestLinks = (
        <Fragment>
                <li>
                    <h3><Link to='/about'> <span style={{color:'cyan'}}>A</span>bout </Link></h3>
                </li>

                <li>
                    <h3><Link to='/register'> <span style={{color:'cyan'}}>R</span>egister </Link></h3>
                </li>
                
                <li>
                    <h3><Link to='/login'> <span style={{color:'cyan'}}>L</span>ogin </Link></h3>
                </li>
        </Fragment>
    )

    
    return (
        <div className="navbar">
            <h1 className="m"><i className="fas fa-address-card micon"></i>&nbsp; <span style={{color:'cyan'}}>M</span>y <span style={{color:'cyan'}}>C</span>ontacts</h1>
            <ul >
                {isAuthenticated ? authLinks : guestLinks}
            </ul>
        </div>
    )
}

export default Navbar
