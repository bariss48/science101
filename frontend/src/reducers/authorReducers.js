import {
    ALL_AUTHORS_REQUEST,
    ALL_AUTHORS_SUCCESS,
    ALL_AUTHORS_FAIL ,
    AUTHOR_DETAILS_REQUEST,
    AUTHOR_DETAILS_SUCCESS,
    AUTHOR_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/authorConstants'

export const authorsReducer = (state = {author:[] }, action) => {
    switch(action.type){
        case ALL_AUTHORS_REQUEST:
            return {
                loading: true,
                authors:[]            
            }
        case ALL_AUTHORS_SUCCESS:
            return {
                loading: false,
                authors: action.payload.authors,
                authorsCount: action.payload.authorsCount,            
                resPerPage: action.payload.resPerPage,
                filteredAuthorsCount: action.payload.filteredAuthorsCount            
            }
        case ALL_AUTHORS_FAIL:
            return {
                loading: false,
                error: action.payload
            }    
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const authorDetailsReducer = (state = {author: {} }, action) => {
    switch (action.type){
        case AUTHOR_DETAILS_REQUEST:
            return {
              ...state,
              loading: true
            }
        case AUTHOR_DETAILS_SUCCESS:
             return {
                 loading: false,
                 author: action.payload
             }
        case AUTHOR_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }     
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
             }
        default:
            return state
    }
}