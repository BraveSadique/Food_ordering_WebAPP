
window.onload = function(e) {
    if(sessionStorage.getItem('menu')){
        let activeMenu = sessionStorage.getItem('menu')
        document.querySelectorAll('.admin__list-item').forEach(a => {
            a.classList.remove('activeMenu')
            if(a.dataset.name == activeMenu){
                a.classList.add('activeMenu')
            }
        })
        document.querySelectorAll('.admin__slides').forEach(a => {
            a.classList.remove('activeSlide')
            if(a.dataset.name == activeMenu){
                a.classList.add('activeSlide')
            }
        })

    }
 }
document.querySelector('.admin__list').addEventListener('click', function (e) {
    if (!e.target.classList.contains('admin__list')) {
        let data = e.target.closest(".admin__list-item").dataset.name;
        document.querySelectorAll('.admin__list-item').forEach(a => {
            a.classList.remove('activeMenu')
        })
        document.querySelectorAll('.admin__slides').forEach(a => {
            a.classList.remove('activeSlide')
            if (data === a.dataset.name) {
                a.classList.add('activeSlide')
                sessionStorage.setItem('menu',a.dataset.name)
            }
        })

        e.target.closest(".admin__list-item").classList.add('activeMenu')
    }
})



if (!sessionStorage.getItem('admin')) location.href = 'login.html';


function updateCategories() {
    let categories = JSON.parse(localStorage.getItem('categories'))
    tBody.innerHTML = ``
    if (categories) {
        categories.forEach((e, i) => {
            tBody.innerHTML += `
            <tr>
                <td>${e.id}</td>
                <td>${e.name}</td>
                <td class='td__flex'>
                <a class='table__link' onclick ="removeCategory(${e.id})"  href="#"><i class="fa-solid fa-trash-can"></i></a>
                <a class='table__link edit' href="#" onclick="editCat(event,${e.id})" data-id="${e.id}"><i class="fa-solid fa-pen-to-square"></i></a>
                </td>
            </tr>
            `
        });
    }
}

function removeCategory(id) {
    let count = +localStorage.getItem('count')
    let categories = JSON.parse(localStorage.getItem('categories'))
    categories.splice(categories.findIndex(e => e.id === id), 1)
    if (categories.length === 0) {
        count = 0
        localStorage.setItem('count', count)
    }
    localStorage.setItem('categories', JSON.stringify(categories))
    drawDashboard()
    updateCategories()
}

function updateProducts() {
    let products = JSON.parse(localStorage.getItem('products'))
    
    tBody2.innerHTML = ``

    if (products) {
        products.forEach(e => {
            tBody2.innerHTML += `
            <tr>
                <td>${e.id}</td>
                <td>${e.title}</td>
                <td>${e.description}</td>
                <td>${e.price}</td>
                <td>${e.discount ? e.discount : 0} %</td>
                <td>${e.discount ? e.discountedPrice : e.price}</td>
                <td>${e.category}</td>
                <td>  <img src=${e.img} class="img" alt="img"></td>
                <td>
                <a class='table__link' onclick ="removeProducts(${e.id})"  href="#"><i class="fa-solid fa-trash-can"></i></a>
                <a class='table__link' href="#" onclick="editProd(event,${e.id})" data-id="${e.id}"><i class="fa-solid fa-pen-to-square"></i></a>
                </td>
            </tr>
            `
        });
    }
}

function removeProducts(id) {
    let count2 = +localStorage.getItem('count2')
    let products = JSON.parse(localStorage.getItem('products'))
    products.splice(products.findIndex(e => e.id === id), 1)
    if (products.length === 0) {
        count2 = 0
        localStorage.setItem('count2', count2)
    }
    localStorage.setItem('products', JSON.stringify(products))
    updateProducts()
    addProductsToPercent()
}

updateCategories()
updateProducts()

function drawDashboard() {
    if (localStorage.getItem('categories')) {
        let categories = JSON.parse(localStorage.getItem('categories'))
        dashCategories.innerText = categories.length
        if (localStorage.getItem('products')) {
            let products = JSON.parse(localStorage.getItem('products'))
            dashproducts.innerText = products.length
            let discounted = products.filter(e => e.discountedPrice)
            dashCount.innerText = discounted.length
        }
    }
}
drawDashboard()
/************************************************* */


discountForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    setDiscount()
    responseInfo.classList.add('active__response')
})
responseBtn.addEventListener('click',()=>{
    responseInfo.classList.remove('active__response')
})

function addProductsToPercent() {
    let products = JSON.parse(localStorage.getItem('products'))
    discountSelect.innerHTML = '';
    if (products) {
        products.forEach(e => {
            discountSelect.innerHTML += `
            <option value='${e.id}'>${e.title}</option>
            `
        })
    }
}
addProductsToPercent()

function setDiscount() {
    console.log(123)
    let products = JSON.parse(localStorage.getItem('products'))

    if (percent.value) {
        let discountPercent = percent.value
        let productId = discountSelect.value
        let product = products.find(e => e.id == productId)
        product.discount = discountPercent
        product.discountedPrice = product.price - (product.price * product.discount / 100)

        localStorage.setItem('products', JSON.stringify(products))
        respsoneText.innerText = `${product.title} has been discounted ${discountPercent}%`
    }
    updateProducts()
    drawDashboard()
}