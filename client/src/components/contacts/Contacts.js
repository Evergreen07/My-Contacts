import React,{Fragment, useContext, useEffect } from 'react';
import ContactItem from './ContactItem'
import Spinner from '../layouts/Spinner'
import ContactContext from '../../context/contact/contactContext'


const Contacts = () => {
    const contactContext = useContext(ContactContext);
    const {contacts, filtered, getContact, loading} = contactContext;
    

    useEffect(() => {
        getContact();
        //eslint-disable-next-line
    }, [])

    if ( contacts !== null && contacts.length === 0 && !loading) {
        return <h2 style={{color:'white', letterSpacing:'1.5px'}}>Please add a contact...</h2>;
      }

    return (
        <Fragment>
            {contacts !== null && !loading ? (filtered !== null ? 
            (filtered.map((i) => (<ContactItem key={i._id} contact={i}/>)))
            : (contacts.map((i) => (<ContactItem key={i._id} contact={i}/>))))
            : ( <Spinner/> ) }
            
        </Fragment>
    )
}

export default Contacts
