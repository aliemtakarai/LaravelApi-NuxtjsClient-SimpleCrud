import axios from 'axios'
export default axios.create({
    baseURL: 'http://crud-server.test/api'
});