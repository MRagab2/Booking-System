
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../assets/Data"
import axios from "axios";
import Cookies from "js-cookie"

export const getReviews = createAsyncThunk(
    'userDetailsSlice/getReviews',
    async ({ pending }) => {
        const res = await axios.get(`${BaseUrl}/review/filter/${pending}`,
            {
                headers: {
                    authToken: Cookies.get("userToken")
                }
            })
        return res.data;


    }
)
export const sendReviews = createAsyncThunk(
    'userDetailsSlice/sendReviews',
    async ({ rate, content, userID }) => {
        const res = await axios.post(`${BaseUrl}/review`, { rate, content, userID },
            {
                headers: {
                    authToken: Cookies.get("userToken")
                }
            });
        return res.data;
    }
)
export const getUserDetails = createAsyncThunk(
    'userDetailsSlice/getUserDetails',
    async ({ userID }) => {
        const res = await axios.get(`${BaseUrl}/user/id/${userID}`,
            {
                headers: {
                    authToken: Cookies.get("userToken")
                }
            });
        return res.data;
    }
)
export const editProfile = createAsyncThunk(
    'userDetailsSlice/editProfile',
    async ({ userID, email, password, passwordConfirm, fullName, phone, avatar }) => {
        const res = await axios.put(`${BaseUrl}/user/${userID}`,
            { email, password, passwordConfirm, fullName, phone, avatar },
            {
                headers: {
                    authToken: Cookies.get("userToken")
                }
            });
        return res.data;
    }
)
export const reservationsDisplay = createAsyncThunk(
    'userDetailsSlice/reservationsDisplay',
    async () => {
        const res = await axios.get(`${BaseUrl}/request`,
            {
                headers: {
                    authToken: Cookies.get("userToken")
                }
            });
        return res.data;
    }
)
export const Login = createAsyncThunk(
    'userDetailsSlice/Login',
    async ({ email, password }) => {

        const res = await axios.post(`${BaseUrl}/login`, {
            email, password
        })

        return res.data;





    }
)


const userDetailsSlice = createSlice({
    name: "userDetailsSlice",
    initialState: {
        succsess: false,
        reviews: [],
        error: "",
        // loginError: "",
        userDetail: [],
        reservations: [],
        table: []
    },
    reducers: {
        register: (state, action) => {
            const fullName = action.payload.fullName
            const email = action.payload.email
            const password = action.payload.password
            const passwordConfirm = action.payload.passwordConfirm
            const phone = action.payload.phone
            axios.post(`${BaseUrl}/register`, { fullName, email, password, passwordConfirm, phone }
            )
                .then(res => {
                    Cookies.set("userToken", res.data.token)
                    Cookies.set("userRole", res.data.role)
                    Cookies.set("userName", res.data.fullName)
                    Cookies.set("userId", res.data._id)
                })
                .catch(err => {
                    console.log(err)
                })
        },
    },
    extraReducers: {
        [getReviews.pending]: (state) => {

        },
        [getReviews.fulfilled]: (state, { payload }) => {
            state.reviews = payload

        },
        [getReviews.rejected]: (state, action) => {
            state.error = action.error.message

        },
        [sendReviews.pending]: (state) => {

        },
        [sendReviews.fulfilled]: (state, action) => {
            window.location.assign("/e-learning")
        },
        [sendReviews.rejected]: (state, action) => {
            state.error = action.error.message
            console.log(action)

        },
        [getUserDetails.pending]: (state) => {

        },
        [getUserDetails.fulfilled]: (state, { payload }) => {
            state.userDetail = payload
        },
        [getUserDetails.rejected]: (state, action) => {
            state.error = action.error.message
            console.log(action)
        },
        [editProfile.pending]: (state) => {

        },
        [editProfile.fulfilled]: (state, action) => {
            console.log(action)
        },
        [editProfile.rejected]: (state, action) => {
            state.error = action.error.message
            console.log(action)
        },
        [reservationsDisplay.pending]: (state) => {

        },
        [reservationsDisplay.fulfilled]: (state, { payload }) => {
            state.reservations = payload
        },
        [reservationsDisplay.rejected]: (state, action) => {
            state.error = action.error.message
            console.log(action)
        },
        [Login.pending]: (state) => {

        },
        [Login.fulfilled]: (state, { payload }) => {
            Cookies.set("userToken", payload.token)
            Cookies.set("userRole", payload.role)
            Cookies.set("userId", payload.id)
            // state.loginError = "true"
            if (Cookies.get("userRole") == "admin") {
                window.location.assign("/Admin")
            }
            else {
                window.location.assign("/")
            }
        },
        [Login.rejected]: (state, error) => {
            // state.loginError = "false"
            console.log(error)
        },
    }
})
const { actions, reducer } = userDetailsSlice;
export const { register, login } = actions;
export default reducer