import axios from "../axios"


const handleLoginApi = (email, password) => {
    return axios.post("/api/login", { email, password });
}
const getAllUser = (id) => {
    return axios.get(`/api/get-all-users?id=${id}`)
}
const createUser = (data) => {
    // console.log('>>>>>Check data from services: ', data)
    return axios.post('/api/create-user', data)
}
const delUser = (data) => {
    let uid = data.id;
    return axios.delete(`/api/del-user`, {
        data: {
            id: uid
        }
    })
}
const editUserApi = (user) => {
    return axios.put('/api/edit-user', {
        data: user
    })
}
const getAllCodeApi = (inputType) => {
    return axios.get(`/api/allcodes?type=${inputType}`)
}

const getTopDoctorHomeFromDB = (limit) => {
    return axios.get(`api/top-doctor-home?limit=${limit}`)
}
const getAllDoctorFromDB = () => {
    return axios.get('/api/all-doctor-edit-des')
}
const createInfoDoctorFromDB = (data) => {
    return axios.post("/api/save-info-edit-des", data)
}
const getInfoDoctorFromDB = (id) => {
    return axios.get(`/api/get-doctor-info-by-id?id=${id}`)
}
export {
    handleLoginApi, getAllUser, createUser, delUser,
    editUserApi, getAllCodeApi, getTopDoctorHomeFromDB,
    getAllDoctorFromDB, createInfoDoctorFromDB, getInfoDoctorFromDB
};