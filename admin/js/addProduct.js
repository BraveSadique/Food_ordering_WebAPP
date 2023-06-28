
document.querySelector('.modal__body').addEventListener('click', function (e) {
    e.target.classList.contains('modal') && e.stopPropagation()
    e.target.classList.remove('open__modal-body')
})

let inputImg;
function changeImg(img){
    const file = img.files[0];
    const imageUrl = URL.createObjectURL(file)
    inputImg = imageUrl
    console.log(inputImg)
}

addProduct.addEventListener('click', function (e) {
    e.preventDefault()
    document.querySelector('.modal__body').classList.add('open__modal-body');
    document.querySelector('.modal').innerHTML = `
    <div class="Add__block">
    <h2 class="modalTitle">Add new product</h2>
    <form id="form" onsubmit='addProd(event)'>
        <select name="" id="select" value="Category"></select>
        <input type="text" id="title" placeholder="title" required>
        <input type="text" id="price" oninput="checkInput(this)" placeholder="price" required>
        <textarea id="description" placeholder="description" required></textarea>
        <input type="file" id="imgFile" onchange="changeImg(this)">
        <button id="addbtn" class="addProduct">Add Product</button>
        </form>
        </div>
        `
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
})


let count2

function addProd(e) {
    e.preventDefault()
    let products;
    if (localStorage.getItem('products')) {
        count2 = +localStorage.getItem('count2') + 1;
        localStorage.setItem('count2', count2)
        products = JSON.parse(localStorage.getItem('products'));
    } else {
        count2 = 1
        localStorage.setItem('count2', count2);
        products = []
    }
    let product = {
        id: count2,
        category: select.value,
        title: title.value,
        price: +price.value,
        description: description.value,
        img: inputImg
    }
    products.push(product)

    localStorage.setItem('products', JSON.stringify(products))
    updateProducts()
    drawDashboard()
    addProductsToPercent()
    document.querySelector('.modal__body').classList.remove('open__modal-body')
}


function checkInput(e) {
    e.value = e.value.replace(/[^\d.]/g, '')
}