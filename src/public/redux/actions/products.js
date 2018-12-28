import axios from 'axios';

const IP = 'http://192.168.0.16:3000/products';

export const fetch = () => {
    return {
        type: "FETCH_PRODUCT",
        payload: axios.get(IP)
    }
}

export const fetchMyProducts = (id) => {
    return {
        type: "FETCH_MY_PRODUCT",
        payload: axios.get(IP + '/search?user=' + id)
    }
}

export const addProduct = (data, token) => {
    return {
        type: "ADD_PRODUCT",
        payload: axios.post(IP, data, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
    }
}

export const editProduct = (id, data, token) => {
    return {
        type: "EDIT_PRODUCT",
        payload: axios.put(`${IP}/${id}`, data, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
    }
}

export const removeProduct = (id, token) => {
    return {
        type: "REMOVE_PRODUCT",
        payload: axios.delete(`${IP}/${id}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
    }
}

// export const removeAllProducts = () => {
//     return {
//         type: "REMOVE_ALL_PRODUCTS",
//         payload: axios.delete(IP)
//     }
// }

// export const toggleGrid = () => ({ type: "TOGGLE_GRID" })