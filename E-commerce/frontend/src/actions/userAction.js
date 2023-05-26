import axios from 'axios'
import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_REQUEST,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_DETAILS_RESET
} from '../constants/userConstants'
import { ORDER_LIST_MY_RESET } from '../constants/orderConstant'


//logout action
export const logout = () => dispatch => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_DETAILS_RESET })
    dispatch({ type: ORDER_LIST_MY_RESET })
}

//login action
//axios for network request for login using login routes
export const login = (email, password) => async dispatch => {
    // dispatch = useDispatch()
    try {
        dispatch({ type: USER_LOGIN_REQUEST })
        const config = { headers: { 'content-type': 'application/json' } }
        const { data } = await axios.post(
            '/api/users/login',
            { email, password },
            config
        )//we pass email pass as argument as we get from user
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

//register action(register user)
//axios for network request for register user 
export const register = (name, email, password) => async dispatch => {
    // dispatch = useDispatch()
    try {
        dispatch({ type: USER_REGISTER_REQUEST })
        const config = { headers: { 'content-type': 'application/json' } }
        const { data } = await axios.post(
            '/api/users',
            { name, email, password },
            config
        )//we pass email pass as argument as we get from user
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data,
        })
        //if user sucessfully registered then user automatcially logged in
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

//getting user details
export const getUserDetails = (id) => async (dispatch, getState) => {//if user have id already then use getstate to get it
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })
        const { userLogin: { userInfo }, } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        const { data } = await axios.get(`/api/users/${id}`, config)
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data,
        });

    }
    catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
}

//update logged in user details
export const updateUserProfile = (user) => async (dispatch, getstate) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })
        const { userLogin: { userInfo } } = getstate()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        const { data } = await axios.put('/api/users/profile', user, config)
        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

