import axios from "axios"; 
// const dotenv = require('dotenv');

// dotenv.config();
 
export const url = 'http://localhost:4000/v1/book'; 

async function axiosTest() { 
    let promiseAxios = axios.get(url) 
 
    return await promiseAxios 
    .then(function (response) { 
        return response.data;}) 
} 
 
const dataApi = await axiosTest() 
 
export const listHits = dataApi;