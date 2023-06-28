if (localStorage.getItem('categories')) {
    let categories = JSON.parse(localStorage.getItem('categories'))
    let products = JSON.parse(localStorage.getItem('products'))
    menu.innerHTML += `<li class="menu__item menu__item--active all">All</li>`
    categories.forEach(e => {
        menu.innerHTML += `<li class="menu__item">${e.name}</li>`
    });
    menu.addEventListener('click', function (e) {
        if (e.target.classList.contains('menu__item')) {
            document.querySelectorAll('.menu__item').forEach(e => {
                e.classList.remove('menu__item--active')
            })
            e.target.classList.add('menu__item--active')
        }
        if (e.target.classList.contains('menu__item')) {
            let filteredProducts = products.filter(a => e.target.innerText.toLowerCase() == a.category.toLowerCase())
            product_list.innerHTML = ''
            e.target.classList.contains('all') && updateAll(e)
            filteredProducts.forEach(e => {
                drawElements(e)
            })
        }
    })

    function drawElements(e) {
        product_list.innerHTML += `
        <div class="product" data-id='${e.id}' onclick='openPopup(${e.id})'>
        <div class="product__img-box"><img id="imgClone" src=${e.img} alt="img"></div>
        <div>
        <h3 class="product__title">${e.title}</h3>
        <div class="product__footer">
        <div class="prices">
            <p class="product__price ${+e.discount ? 'previousPrice' : ''}">${e.price} $</p>
            <p class="product__discounted">${+e.discount ? e.discountedPrice + ' $' : ''}</p>
            </div>
            <div class="product__buy" onclick="addStorage(event,${e.id})"><i class="fa-solid fa-plus"></i> add to cart</div>
        </div>
        </div>
        </div>`
    }

    function updateAll(e) {
        product_list.innerHTML = ''
        products.forEach(e => {
            drawElements(e)
        })
    }
    updateAll()
}

document.querySelector('.modal__body').addEventListener('click', function (e) {
    e.target.classList.contains('modal') && e.stopPropagation()
    e.target.classList.remove('open__modal-body')
})

function openPopup(id) {
    let products = JSON.parse(localStorage.getItem('products'))
    let product = products.find(e => e.id == id)
    document.querySelector('.modal__body').classList.add('open__modal-body')
    document.querySelector('.modal').innerHTML = `
    <div class="modal__left">
    <div class="modalImg">
        <img src="/admin/img/${product.img}" alt="">
    </div>
    </div>
    <div class="modal__right">
    <div class="productInfo">
        <h2 class="productName">${product.title}</h2>
        <p class="product__description">${product.description}</p>
        <div class="product__buy right" onclick="addStorage(event,${id})"><i class="fa-solid fa-plus"></i> add to cart</div>
    </div>
    </div>
    `
}


let products = JSON.parse(localStorage.getItem('products'))

if (localStorage.getItem('products')) {
     let products = JSON.parse(localStorage.getItem('products')).filter(e => e.itemsCount)
    document.querySelector('.shopping__circle').innerText = `${products.length}`;
    document.querySelector('#shopping__footer').innerText = `${products.length}`;
}

function addStorage(event, id) {
    let products = JSON.parse(localStorage.getItem('products'))
    event.stopPropagation()
    addCartAnimation(event, id)

    let product = products.find(e => e.id == id)
    
    product.itemsCount = product.itemsCount ? ++product.itemsCount : 1
    product.cartPrice = product.discountedPrice ? product.itemsCount * product.discountedPrice : product.itemsCount * product.price

    localStorage.setItem('products', JSON.stringify(products))
        let cartShopText = JSON.parse(localStorage.getItem('products')).filter(e => e.itemsCount)
       document.querySelector('.shopping__circle').innerText = `${cartShopText.length}`;
       document.querySelector('#shopping__footer').innerText = `${cartShopText.length}`;
   
}

function addCartAnimation(event, id) {
    let products = JSON.parse(localStorage.getItem('products'))
    let product = products.find(e => e.id == id)
    let box = event.target.closest('.product')
    box.style.zIndex = "1000";
    let img = box.querySelector('#imgClone')
    let flying_img = img.cloneNode();
    flying_img.classList.add('flying-img');
    box.appendChild(flying_img);

    // box.innerHTML += `
    //     <div class="productClone" id="clone">
    //         <img src="/admin/img/${product.img}" class="cloneImg" alt="">
    //         <div class="cloneInfo">
    //             <h4 class="cloneTitle">${product.title}</h4>
    //             <div class="ClonePrices">
    //                 <p class="clonePrice ${+product.discount ? 'previousPrice' : ''}">${product.price} $</p>
    //                 <p class="cloneDiscounted">${+product.discount ? product.discountedPrice + ' $' : ''}</p>
    //             </div>
    //         <div>
    //     </div>
    // `
    // const flying_img_pos = flying_img.getBoundingClientRect();
    // const shopping_cart_pos = shopping__cart.getBoundingClientRect();

    // let data = {
    //     left: shopping_cart_pos.left - (shopping_cart_pos.width / 2 + flying_img_pos.left + flying_img_pos.width / 2),
    //     top: shopping_cart_pos.bottom - flying_img_pos.bottom + 100
    // }



    let boxTop = flying_img.getBoundingClientRect().top + window.pageYOffset
    let boxLeft = flying_img.getBoundingClientRect().left + window.pageYOffset
    let cartTop = shopping__cart.getBoundingClientRect().top + window.pageYOffset
    let cartLeft = shopping__cart.getBoundingClientRect().left + window.pageYOffset
    // flying_img.style.top = (cartTop - boxTop) + 'px'
    // flying_img.style.left = (cartLeft - boxLeft) + 'px'
    
    flying_img.style.cssText = `
    --top : ${(cartTop - boxTop)}px;
    --left : ${(cartLeft - boxLeft)}px;
    `;

    setTimeout(() => {
        box.removeChild(flying_img);
    }, "1000");
}