let products = JSON.parse(localStorage.getItem('products'))
document.querySelector('.modal__body').addEventListener('click', function (e) {
    e.target.classList.contains('modal') && e.stopPropagation()
    e.target.classList.remove('open__modal-body')
})

let inputImg2;
function changeImg2(img){
    const file = img.files[0];
    const imageUrl = URL.createObjectURL(file)
    inputImg2 = imageUrl
    console.log(inputImg2)
}

function editProd(e, id) {
    let products = JSON.parse(localStorage.getItem('products'))

    e.preventDefault()
    let product = products.find(e => e.id === id)
    console.log(product);
    
    document.querySelector('.modal__body').classList.add('open__modal-body');
    document.querySelector('.modal').innerHTML = `
    <div class="products__block" >
        <h2 class="modalTitle">Edit product</h2>
        <form id="form" onsubmit='editProdForm(event,${id})'>
            <select name="" id="select" value="${product.category}"></select>
            <input type="text" id="title" placeholder="title" value="${product.title}">
            <input type="text" id="price" oninput="checkInput(this)" placeholder="price" value="${product.price}">
            <textarea id="description" placeholder="description">${product.description}</textarea>
            <img src=${product.img} id="img" width="100">
            <input type="file" id="imgFile" onchange="changeImg2(this)">
            <button id="addbtn" class="addProduct">Save</button>
        </form>
    </div>
    `
    checkSelect()
}

function checkSelect() {
    if (localStorage.getItem('categories')) {
        let categories = JSON.parse(localStorage.getItem('categories'))
        if (categories.length != 0) {
            categories.forEach((e, i) => {
                select.innerHTML += `
            <option value="${e.name}">${e.name}</option>
            `
            })
        }
    }
}

function editProdForm(event, id) {
    let products = JSON.parse(localStorage.getItem('products'))

    event.preventDefault()
    let product = products.find(e => e.id === id)
    product.title = title.value;
    product.price = +price.value;
    product.category = select.value;
    product.description = description.value;
    product.discountedPrice = product.discount ? product.price - (product.price * product.discount / 100) : product.price
    imgFile.files.length > 0 && (product.img = inputImg2)
    localStorage.setItem('products', JSON.stringify(products))
    updateProducts()
    document.querySelector('.modal__body').classList.remove('open__modal-body')
}

function checkInput(e){
    e.value = e.value.replace(/[^\d.]/g, '')
}