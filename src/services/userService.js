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
export { handleLoginApi, getAllUser, createUser, delUser, editUserApi, getAllCodeApi };