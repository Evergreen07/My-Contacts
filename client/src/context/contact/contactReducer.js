import {
    GET_CONTACT ,
    ADD_CONTACT ,
    DELETE_CONTACT ,
    SET_CURRENT ,
    CLEAR_CURRENT ,
    UPDATE_CONTACT ,
    CONTACT_ERROR,
    FILTER_CONTACT ,
    CLEAR_FILTER ,
    CLEAR_CONTACT
} from '../types';

const contactReducer = (state, action) => {
    switch (action.type) {
        case GET_CONTACT:
            return {
                ...state,
                contacts : action.payload,
                loading: false
            };
        
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [action.payload, ...state.contacts],
                loading: false
            };

        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(i => i._id !== action.payload),
                loading: false
            };
    
    
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(i => i._id === action.payload._id ? action.payload : i),
                loading: false
            };


        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            };  


        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            };
        

        case FILTER_CONTACT:
            return {
                ...state,
                filtered: state.contacts.filter((i) => {
                    if(i.name.toLowerCase().includes(action.payload) || 
                       i.email.toLowerCase().includes(action.payload)){
                        return i;
                    }
                    return false;
                })
            };        
        
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            };
            
        case CLEAR_CONTACT:
            return {
                ...state,
                contacts: null
            }; 
            
        case CONTACT_ERROR:
            return {
                ...state,
                error : action.payload
            };

        default:
           return state;
    }
}

export default contactReducer