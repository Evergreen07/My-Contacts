import React, { useState, useContext, useEffect} from 'react';
import AlertContext from '../../context/alert/alertContext';
import ContactContext from '../../context/contact/contactContext'
import Alerts from '../layouts/Alerts'


const ContactForm = () => {
    const contactContext = useContext(ContactContext);
    const alertContext = useContext(AlertContext);

    const {setAlert} = alertContext;
    const {addContact, updateContact, current, clearCurrent} = contactContext;

    const [contact, setContact] = useState({
        name : '',
        email : '',
        phone : '',
        type : 'personal'
    });

    const {name, email, phone, type} = contact;

    const onChange = (e) => setContact({ ...contact , [e.target.name] : e.target.value});
    //Copy whatever the current state is & update the changes

    const onSubmit = (e) => {
        e.preventDefault();
        if(current){
            updateContact(contact);  
            onClear(); 
        }else{
            if(email === '' && phone === ''){
                setAlert('Please enter Email / Phone No.', 'danger');
            } else {
                addContact(contact);
                onClear();
            }
        } 
    }

    const onClear = () => {
        clearCurrent();
    }

    useEffect(() => {
       if(current){
            setContact(current);
       }else{
            setContact({
                name : '',
                email : '',
                phone : '',
                type : 'personal' 
            })
       }
    }, [contactContext, current])

    return (
        <form onSubmit = {onSubmit} className="form-container">
                <h2 >{current ? 'Update ' : 'Add '}<span style={{color: 'cyan'}}>Contact</span></h2>

                <div className="form-group">
                        <span className="fas fa-user fa-lg"></span>
                        <input type="text" name="name" placeholder="Enter Name" value={name} onChange={onChange} required/>
                </div>

                <div className="form-group">
                        <span className="fas fa-envelope fa-lg"></span>
                        <input type="email" name="email" placeholder="Enter e-mail" value={email} onChange={onChange}/>
                </div>
                
                <div className="form-group">
                        <span className="fas fa-phone-alt fa-lg"></span>
                        <input type="text" name="phone" placeholder="Enter Phone Number" value={phone} onChange={onChange}/>
                </div>

                
                <h3>Contact <span style={{color: 'cyan'}}>Type</span></h3>
                <div className="radio">
                    <input type="radio" name="type" value='personal' checked={type === 'personal'} onChange={onChange}/>&nbsp;Personal&ensp;&ensp;
                    <input type="radio" name="type" value='professional' checked={type === 'professional'} onChange={onChange}/>&nbsp;Professional
                </div>
                <Alerts/>
                <div>
                    <input type="submit" value="Save Contact" className="btn btn-primary btn-block"/>
                </div>
                {current && <div>
                    <button className="btn btn-light btn-block clear" onClick={onClear}> Clear </button>
                </div> }
        </form> 
    )
}

export default ContactForm
