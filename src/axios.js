import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-burger-app-94e8d.firebaseio.com/'
});

export default instance;