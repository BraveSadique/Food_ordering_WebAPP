let categories = JSON.parse(localStorage.getItem('categories'))

    document.querySelector('.modal__body').addEventListener('click', function (e) {
    e.target.classList.contains('modal') && e.stopPropagation()
    e.target.classList.remove('open__modal-body')
})

function editCat(e,id){
    e.preventDefault()
    let category = categories.find(e=> e.id === id)
    document.querySelector('.modal__body').classList.add('open__modal-body');
    document.querySelector('.modal').innerHTML =`
    <div class="Add__block">
    <h2 class="modalTitle">Edit category</h2>
    <form id="add__form" onsubmit='editCatForm(event,${id})'>
        <input type="text" id="add" placeholder="Edit Category" value="${category.name}" required>
        <button id="addbtn">Save</button>
    </form>
    </div>
    `
}

function editCatForm(event,id){
    event.preventDefault()
    let categories = JSON.parse(localStorage.getItem('categories'))
    let category = categories.find(e=> e.id === id)
    let oldCategory = category.name;
    category.name = add.value
    localStorage.setItem('categories',JSON.stringify(categories))
    
    let products = JSON.parse(localStorage.getItem('products'))
    products.forEach(e=>{
        if(e.category == oldCategory){
            e.category = category.name
        }
    })

    localStorage.setItem('products', JSON.stringify(products))
    updateCategories()
    updateProducts()
    document.querySelector('.modal__body').classList.remove('open__modal-body')
}

