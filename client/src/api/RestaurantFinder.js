import axios from 'axios';

// NODE_ENV = 'development'
// NODE_ENV = 'production'

const baseURL = process.env.NODE_ENV === 'production' ? 'api/v1/restaurants' : 'http://localhost:3006/api/v1/restaurants'

export default axios.create({
    baseURL: baseURL,
});