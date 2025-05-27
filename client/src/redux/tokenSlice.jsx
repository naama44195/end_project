import { createSlice } from '@reduxjs/toolkit'
const i={
token:null,
user:{},
role:"",
city:""
,name:"",
active:false
}
const tokenSlice = createSlice({
    name: 'token',
    initialState: i,
    reducers: {
        setToken(state, action) {
            state.token = action.payload
        },
        setUser(state, action) {
            state.user = action.payload
        },
        setRole(state, action) {
            state.role = action.payload
        },
        setCity(state, action) {      
            state.city = action.payload
        },
        setName(state, action) {      
            state.name = action.payload
        },
        setActive(state, action) {      
            state.active = action.payload
        },
        logOut(state, action) {
            state.token = null;
            state.user = null;
            state.role = null;
            state.city = "";

        }
    }
})

export const { setToken, logOut,setUser,setRole,setCity,setActive,setName} = tokenSlice.actions
export default tokenSlice.reducer