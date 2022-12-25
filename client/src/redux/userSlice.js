import { createSlice } from '@reduxjs/toolkit'
const defaultUser = JSON.parse(localStorage.getItem('user'))

console.log(defaultUser)




if(defaultUser){
    var { _id, name, email, isBlocked} = defaultUser
}


const userSlice = createSlice({
    name:'user',
    initialState:{
        _id, name, email, isBlocked
    },
    reducers:{
        login:(state,action)=>{
            state._id = action.payload._id
            state.name = action.payload.name
            state.email = action.payload.email
            state.isBlocked = action.payload.isBlocked
        }, 
        logout:(state) => {state ={} }
    },
});


export const {login, logout} = userSlice.actions;
export default userSlice.reducer;