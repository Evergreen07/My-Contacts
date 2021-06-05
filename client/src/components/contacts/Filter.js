import React, { useContext, useEffect, useRef } from 'react'
import ContactContext from '../../context/contact/contactContext'

const Filter = () => {
    const contactContext = useContext(ContactContext);
    const {filtered, filterContact, clearFilter} = contactContext;

    //const [text, setText] = useState('');
    const text = useRef('');

    useEffect(() => {
        if(filtered === null){
            text.current.value = '';
        }
    })

    // const onFilter = (e) => {
    //     filterContact(e.target.value);
    // }

    const onFilter = (e) => {
        if(text.current.value !== ''){
            filterContact(e.target.value.toLowerCase()); 
        }else{
            clearFilter();
        }   
    }

    return (
        <form className="filter">
            <span className="fas fa-search fa-lg"></span>
            <input type="text" ref={text} placeholder="Filter contacts..." onChange={onFilter}/>
        </form>
    )
}
 
export default Filter
