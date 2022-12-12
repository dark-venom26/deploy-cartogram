import { 
    ALL_PRODUCT_REQUEST, 
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_RESET,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_RESET,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_RESET,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_RESET,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    ALL_REVIEW_RESET,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_RESET,
    CLEAR_ERRORS 
} from "../constants/productConstants";

export const productsReducer = (state = {loading: true, products: [], productsCount: 0, resultPerPage: 0, error: null}, {type, payload})=> {

    switch (type) {
        case ALL_PRODUCT_REQUEST:
        case ADMIN_PRODUCT_REQUEST:
            return {
                loading: true,
                products: [],
                productsCount: 0,
                resultPerPage: 0,
                error: null
            };
        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: payload.products,
                productsCount: payload.productsCount,
                resultPerPage: payload.resultPerPage,
                error: null
            };
        case ADMIN_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: payload
            };
        case ALL_PRODUCT_FAIL:
        case ADMIN_PRODUCT_FAIL:
            return {
                loading: false,
                products: [],
                productsCount: 0,
                resultPerPage: 0,
                error: payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
    
        default:
            return state;
    }
};

export const productDetailsReducer = (state = {product: []}, {type, payload})=> {

    switch (type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                product: []
            };
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: payload,
            };
        case PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
    
        default:
            return state;
    }
};

export const newReviewReducer = (state = {}, {type, payload})=> {

    switch (type) {
        case NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: payload
            };
        case NEW_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            };
        case NEW_REVIEW_RESET:
            return {
                ...state,
                success: false
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};

export const newProductReducer = (state = {product: {}}, {type, payload})=> {

    switch (type) {
        case NEW_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: payload.success,
                product: payload.product
            };
        case NEW_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            };
        case NEW_PRODUCT_RESET:
            return {
                ...state,
                success: false
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};

export const productReducer = (state = {}, {type, payload})=> {

    switch (type) {
        case DELETE_PRODUCT_REQUEST:
        case UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: payload
            };
        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: payload
            };
        case DELETE_PRODUCT_FAIL:
        case UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            };
        case DELETE_PRODUCT_RESET:
            return {
                ...state,
                isDeleted: false
            };
        case UPDATE_PRODUCT_RESET:
            return {
                ...state,
                isUpdated: false
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};

export const allReviewsReducer = (state = {reviews: []}, {type, payload})=> {

    switch (type) {
        case ALL_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ALL_REVIEW_SUCCESS:
            return {
                loading: false,
                reviews: payload,
            };
        case ALL_REVIEW_FAIL:
            return {
                loading: false,
                error: payload
            };
        case ALL_REVIEW_RESET:
            return {
                loading: false,
                reviews: [],
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};

export const reviewsReducer = (state = {}, {type, payload})=> {

    switch (type) {
        case DELETE_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_REVIEW_SUCCESS:
            return {
                loading: false,
                isDeleted: payload
            };
        case DELETE_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            };
        case DELETE_REVIEW_RESET:
            return {
                ...state,
                isDeleted: false
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};
