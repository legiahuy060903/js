const count = () => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    const sl = document.getElementById('LengthCart');
    let qty = 0
    if (cart) {
        cart.forEach(e => {
            qty += e.quantity;
        });
    }
    sl.innerHTML = qty;
}
count();


