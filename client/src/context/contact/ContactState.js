import React, {useReducer} from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    GET_CONTACT ,
    ADD_CONTACT ,
    DELETE_CONTACT ,
    SET_CURRENT ,
    CLEAR_CURRENT ,
    UPDATE_CONTACT ,
    FILTER_CONTACT ,
    CONTACT_ERROR,
    CLEAR_FILTER ,
    CLEAR_CONTACT
} from '../types';

const ContactState = (props) =>{
    const initialState = {
        contacts : null,
        current : null,
        filtered : null,
        error : null
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    //Get Contact
    const getContact = async () => {
       try {
            const res = await axios.get('api/contacts');

            dispatch({
                type : GET_CONTACT,
                payload : res.data
            })
         
        } catch (error) {
            dispatch({ type: CONTACT_ERROR, payload: error});
        }
    }


    //Add Contact
    const addContact = async (contact) => {
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        try {
            const res = await axios.post('api/contacts', contact, config);

            dispatch({ type: ADD_CONTACT, payload: res.data });
        } catch (error) {
            console.error(error);
            dispatch({ type: CONTACT_ERROR, payload: error})
        }
        
    }


    //Update contacts
        const updateContact = async (contact) => {
            const config = {
                headers: {
                    'Content-Type' : 'application/json'
                }
            }
    
            try {
                const res = await axios.put(`api/contacts/${contact._id}`, contact, config);
    
                dispatch({ type: UPDATE_CONTACT, payload: res.data });
            } catch (error) {
                dispatch({ type: CONTACT_ERROR, payload: error})
            }

        }


    //Delete Contact
    const deleteContact = async (id) => {
        try {
            await axios.delete(`api/contacts/${id}`,{
                headers : {
                    'Content-Type' : 'application/json'
                }
            })

            dispatch({
                type : DELETE_CONTACT,
                payload : id
            })
         
        } catch (error) {
            dispatch({ type: CONTACT_ERROR, payload: error.response.msg});
        }
    }

    //Set current contact : EDIT
    const setCurrent = (contact) => {
        dispatch({ type: SET_CURRENT, payload: contact });
    }

    //Clear current contact : EDIT
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    }

    

    //Filter contacts
    const filterContact = (text) => {
        dispatch({type: FILTER_CONTACT, payload: text });
    }

    //Clear filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    }

    //Clear Contacts
    const clearContacts = () => {
        dispatch({ type: CLEAR_CONTACT });
    }

    return (
        <ContactContext.Provider
        value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            getContact,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContact,
            clearFilter,
            clearContacts
        }}
        >
            {props.children}
        </ContactContext.Provider>
    )
};

export default ContactState;