import React, { useContext } from 'react'
import ContactContext from '../../context/contact/contactContext'

const ContactItem = ({ contact }) => {
    const contactContext = useContext(ContactContext);
    const { setCurrent, clearCurrent, deleteContact } = contactContext; 
    const { _id, name, email, phone, type } = contact;
    
    const onDelete = () => {
        deleteContact(_id);
        clearCurrent();
    }

    const onEdit = () => {
        setCurrent(contact);
        // console.log(current);
    }

    return (
        <div className="card bg-light">
            <h3 className="text-primary text-left">
                {name}{'  '} <span style={{float:'right'}} className={'badge ' + (type === 'professional' ? 'badge-success':'badge-primary')}>
                    {type.charAt(0).toUpperCase()+type.slice(1)}
                </span>
            </h3>
            <ul>
                {email && (
                    <li>
                        <i className="fas fa-envelope"></i>&ensp;{email}
                    </li>
                )}
                {phone && (
                    <li>
                        <i className="fas fa-phone"></i>&ensp;{phone}
                    </li>
                )}
            </ul>
            <button className="btn btn-dark btn-sm" style={{borderRadius:'100%'}} onClick={onEdit}> <i className="fas fa-edit"></i></button> &nbsp;
            <button className="btn btn-danger btn-sm" style={{borderRadius:'100%'}} onClick={onDelete}> <i className="fas fa-trash"></i></button>
        </div>
    )
}

export default ContactItem
