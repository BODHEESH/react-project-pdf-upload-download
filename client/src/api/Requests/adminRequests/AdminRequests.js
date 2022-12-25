import Axios from "../../Axios";

export const postAdminLogin = (AdminData) => Axios.post('/admin-login' , AdminData)









// export const postAdminLogin = (adminInformatins) => Axios.post('/admin/adiminlogin',adminInformatins)

// export const getUserDetails = () => Axios.get('/admin/userDetails')

// export const changeUserStatus = (userId) => Axios.put('/admin/changeStatus',{userId})

// export const deleteUser = (userId) => Axios.put('/admin/userDelete',{userId})

// export const deleteAllUser = () => Axios.put('/admin/deleteAllUsers')
