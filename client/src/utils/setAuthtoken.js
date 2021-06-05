import axios from 'axios'

const setAuthtoken = (token) => {
    if(token){
        axios.defaults.headers.common['x-auth-token'] = token;
    } else{
        delete axios.defaults.headers.common['x-auth-token'];
    }
}

export default setAuthtoken