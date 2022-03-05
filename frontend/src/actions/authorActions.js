import axios from 'axios';

import {
    ALL_AUTHORS_REQUEST,
    ALL_AUTHORS_SUCCESS,
    ALL_AUTHORS_FAIL ,
    AUTHOR_DETAILS_REQUEST,
    AUTHOR_DETAILS_SUCCESS,
    AUTHOR_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/authorConstants'

export const getAuthors = (keyword = '' ,currentPage = 1,category) => async (dispatch) => {
    try {
        dispatch({type: ALL_AUTHORS_REQUEST })
        let link = `/api/v1/authors?keyword=${keyword}&page=${currentPage}`
        if ( category ){
             link = `/api/v1/authors?keyword=${keyword}&page=${currentPage}&category=${category}`
        }else {

        }
        const {data} = await axios.get(link)
        dispatch({
            type: ALL_AUTHORS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALL_AUTHORS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getAuthorDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: AUTHOR_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/v1/author/${id}`)
        dispatch({
            type: AUTHOR_DETAILS_SUCCESS,
            payload: data.author
        })
    } catch (error) {
        dispatch({
            type: AUTHOR_DETAILS_FAIL,
            payload: error.response.data.message,
        })
        console.log(error);
    }
}
//clear errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}