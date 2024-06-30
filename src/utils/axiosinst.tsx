import axios from "axios";

const baseURL='https://upskilling-egypt.com:3005/api'
const staticURL='https://upskilling-egypt.com:3005'

//Without Token mostly for Auth
const apiPuplic=axios.create({
    baseURL,
})

//With Token mostly for Lists 3lshan el m7taga token
const apiToken=axios.create({
    baseURL
})

apiToken.interceptors.request.use((config)=>{
    const token = `Bearer ${localStorage.getItem('token')}`
    config.headers.Authorization=token
    return config
})

export{apiPuplic,apiToken,baseURL,staticURL}