function drawCartPage() {
        let products = JSON.parse(localStorage.getItem('products'))
        if(products){
            products = products.filter(e => e.itemsCount)

            cart__tableBody.innerHTML = ''
            
            products.forEach(e => {
                cart__tableBody.innerHTML += `
                    <tr>
                        <td class="flex">
                            <div class="cart__prodImg">
                                <img src=${e.img} alt="img">
                            </div>
                            <div class="cart__productInfo">
                                <p class="productTitle">${e.title}</p>
                                <p class="cart__category">category: ${e.category}</p>
                            </div>
                        </td>
                        <td class="cart__productPrice">${e.cartPrice.toFixed(2)} $</td>
                        <td>
                            <div class="productCount">
                                <span class="minus cart__counter" onclick="changeProductCount(event,${e.id})"><i class="fa-solid fa-square-minus"></i></span>
                                <span class="itemCount">${e.itemsCount}</span>
                                <span class="plus cart__counter" onclick="changeProductCount(event,${e.id})"><i class="fa-solid fa-square-plus"></i></span>
                            </div>
                        </td>
                        <td><span class="remove" id="remove" onclick="removeItem(${e.id})" id><i class="fa-solid fa-trash"></i></span></td>
                    </tr>
                `
            })
        }
}

function changeProductCount(event, id){
    let products = JSON.parse(localStorage.getItem('products'))
    let product = products.find(e => e.id == id)
    if (event.target.closest('.cart__counter').classList.contains('plus')) {
        ++product.itemsCount
    } else {
        product.itemsCount > 1 && --product.itemsCount
    }
    product.cartPrice = product.discountedPrice ? product.itemsCount * product.discountedPrice : product.itemsCount * product.price
    localStorage.setItem('products', JSON.stringify(products))
    drawCartPage()
    totalPrice()

}

function removeItem(id) {
    let products = JSON.parse(localStorage.getItem('products'))
    let product = products.find(e => e.id == id)
    delete product.itemsCount
    delete product.cartPrice
    localStorage.setItem('products', JSON.stringify(products))
    drawCartPage()
    getCartElCount()
    totalPrice()
}


function totalPrice() {
    if (JSON.parse(localStorage.getItem('products')).some(e => e.cartPrice)) {
        let products = JSON.parse(localStorage.getItem('products'))
        let filtered = products.filter(e=>e.cartPrice)
        let totalPrice = filtered.reduce((e, acc) => e + acc.cartPrice, 0).toFixed(2)
        total.innerText = '$' + totalPrice
    } else {
        total.innerText = '$' + 0
    }
}

function getCartElCount() {
    if (JSON.parse(localStorage.getItem('products'))) {
        let products = JSON.parse(localStorage.getItem('products'))
        cart__itemsCount.innerText = `${products.length} items in your cart`
    }
}

getCartElCount()
totalPrice()
drawCartPage()