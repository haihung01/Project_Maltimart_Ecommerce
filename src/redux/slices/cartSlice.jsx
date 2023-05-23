import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    cartItems: [],
    totalAmount: 0,
    totalQuantity: 0
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, { payload }) => {
            // console.log(state.cartItems)
            // console.log(parseInt(payload.price.replace(/\D/g, '')))

            const newItem = payload;

            const existingItem = state.cartItems.find(
                (item) => item.id === newItem.id
            );
            const existItemIndex = state.cartItems.findIndex(
                (item) => item.id === newItem.id
            );
            console.log(existItemIndex, "index")


            state.totalQuantity++;

            if (!existingItem) {
                state.cartItems = [...state.cartItems, {
                    id: newItem.id,
                    productName: newItem.productName,
                    imgUrl: newItem.imgUrl,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: parseInt(newItem.price.replace(/\D/g, '')),
                }]
                console.log(state.cartItems, "old");
            }

            else {
                existingItem.quantity++;
                existingItem.totalPrice = parseInt(existingItem.totalPrice) + parseInt(newItem.price.replace(/\D/g, ''))

                console.log(state.cartItems, "cai co roi")

            }

            state.totalAmount = state.cartItems.reduce(
                (total, item) => total + Number(item.price) * Number(item.quantity), 0
            );

        },
        deleteItem: (state, action) => {
            const id = action.payload
            const existingItem = state.cartItems.find(item => item.id === id)

            if (existingItem) {
                state.cartItems = state.cartItems.filter(item => item.id !== id)
                state.totalQuantity = state.totalQuantity - existingItem.quantity
            }

            state.totalAmount = state.cartItems.reduce(
                (total, item) => total + Number(item.price) * Number(item.quantity), 0
            );
        },
    },
})

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;