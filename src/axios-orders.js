import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-my-burger-ed689-default-rtdb.firebaseio.com/' 
})

export default instance