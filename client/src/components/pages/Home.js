import React, { useEffect, useContext} from 'react'
import Contacts from '../contacts/Contacts'
import ContactForm from '../contacts/ContactForm'
import Filter from '../contacts/Filter'
import AuthContext from '../../context/auth/authContext'

const Home = () => {
    const authContext = useContext(AuthContext);
    
    useEffect(() => {
       authContext.loadUser();
    });
    
    return (
        <div className="home">
            <div>
                <Filter/>
                <Contacts/>
            </div>
            <div className="crudform">
                <ContactForm/>
            </div>
        </div>
    )
}

export default Home
