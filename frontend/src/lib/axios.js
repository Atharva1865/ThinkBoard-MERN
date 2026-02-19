import axios from "axios";

const api = axios.create({ // we created an axios Instance named api
    baseURL: "http://localhost:5001/api"  // This will be prefixed automatically now
})

export default api