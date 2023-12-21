export const addDecimals =(num)=>{
    return (Math.round(num*100)/100).toFixed(2)
}

export const updateCart = (state) => {
    // Calculate Items Price
    state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc+item.price * item.qty,0));

    // Calculate Shipping Price
    // Yes = 0 , No = 10
    state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 5);

    // Calculate Tax Price (7%tax)
    state.taxPrice = addDecimals(Number((0.07*state.itemsPrice + 0.07*state.shippingPrice).toFixed(2)))

    // Total Price
    state.totalPrice = (Number(state.itemsPrice) + Number(state.taxPrice) + Number(state.shippingPrice)).toFixed(2)
}