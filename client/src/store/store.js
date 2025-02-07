











import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth-slice'
import adminProductReducer from'./admin/products-slice'
import adminReviewReducer from'./admin/admin-reviewSlice'
import adminOrderSlice from'./admin/order-slice'
import shoppingProductsReducer from'./shop/products-slice'
import shoppingCartReducer from'./shop/cart-slice'
import addressReducer from'./shop/address-slice'
import commonReducer from './common'
import shoppingOrderReducer from'./shop/order-slice'
import shoppingSearchReducer from'./shop/search-slice'
import shoppingReviewReducer from'./shop/review-slice'
const store = configureStore({
    reducer:{
        auth: authReducer,
        adminProducts:adminProductReducer,
        shoppingProducts:shoppingProductsReducer,
        shoppingCart:shoppingCartReducer,
        address:addressReducer,
        common:commonReducer,
        shoppingOrder:shoppingOrderReducer,
        adminOrder:adminOrderSlice,
        searchSlice:shoppingSearchReducer,
        reviewSlice:shoppingReviewReducer,
        adminReviewSlice   :adminReviewReducer,

    },

});

export default store