import {
    FETCH_PRODUCT_FULFILLED, FETCH_PRODUCT_PENDING, FETCH_PRODUCT_REJECTED,
    FETCH_MY_PRODUCT_FULFILLED, FETCH_MY_PRODUCT_PENDING, FETCH_MY_PRODUCT_REJECTED,
    ADD_PRODUCT_FULFILLED, ADD_PRODUCT_PENDING, ADD_PRODUCT_REJECTED,
    EDIT_PRODUCT_FULFILLED, EDIT_PRODUCT_PENDING, EDIT_PRODUCT_REJECTED,
    REMOVE_PRODUCT_PENDING, REMOVE_PRODUCT_REJECTED, REMOVE_PRODUCT_FULFILLED
} from '../../../constants/actionTypes';

const initialState = {
    products: [],
    myProducts: [],
    isLoading: false,
    isFinish: false,
    isError: false
    // isGrid: true
}

export default productsReducer = (state = initialState, action) => {
    switch (action.type) {
        /// FETCH PRODUCT ------------------
        case FETCH_PRODUCT_PENDING:
            return {
                ...state,
                isLoading: true
            }
        case FETCH_PRODUCT_FULFILLED:
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                products: action.payload.data.products
            }
        case FETCH_PRODUCT_REJECTED:
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        /// FETCH_MY_PRODUCTS ------------------
        case FETCH_MY_PRODUCT_PENDING:
            return {
                ...state,
                isLoading: true
            }
        case FETCH_MY_PRODUCT_FULFILLED:
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                myProducts: action.payload.data.products
            }
        case FETCH_MY_PRODUCT_REJECTED:
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        /// ADD PRODUCT ------------------
        case ADD_PRODUCT_PENDING:
            return {
                ...state,
                isLoading: true
            }
        case ADD_PRODUCT_FULFILLED:
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                products: [...state.products, action.payload.data.createdProduct]
            }
        case ADD_PRODUCT_REJECTED:
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        /// EDIT PRODUCT ------------------
        case EDIT_PRODUCT_PENDING:
            return {
                ...state,
                isLoading: true
            }
        case EDIT_PRODUCT_FULFILLED:
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                products: state.products.map(product =>
                    (product._id == action.payload.data.product._id) ?
                        { ...product, 
                            name: action.payload.data.product.name,
                            price: action.payload.data.product.price,
                            submitBy: action.payload.data.product.submitBy,
                        }
                         : product
                )
            }
        case EDIT_PRODUCT_REJECTED:
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        /// REMOVE PRODUCT ------------------
        case REMOVE_PRODUCT_PENDING:
            return {
                ...state,
                isLoading: true
            }
        case REMOVE_PRODUCT_FULFILLED:
            return {
                ...state,
                isLoading: false,
                isFinish: true,
                products: state.products.filter(product => product._id !== action.payload.data.id)
                // products: state.products.filter(product => product.id !== action.payload.data.products._id)
            }
        case REMOVE_PRODUCT_REJECTED:
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        // case TOGGLE_GRID:
        //     return {
        //         ...state,
        //         products: [...state.products],
        //         isGrid: !state.isGrid
        //     }

        default:
            return state;
    }
}