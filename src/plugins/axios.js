
import axios from "axios";

// For common config
axios.defaults.headers.post["Content-Type"] = "application/json";

const secureAxios = axios.create({
    baseURL: 'http://localhost:3000/backoffice'
});

const baseAxios = axios.create({
    baseURL: 'http://localhost:3000'

});


export {
    secureAxios,
    baseAxios
};