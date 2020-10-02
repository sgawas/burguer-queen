import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-queen-1924f.firebaseio.com'
});

export default instance;