document.querySelector('.modal__body').addEventListener('click', function (e) {
    e.target.classList.contains('modal') && e.stopPropagation()
    e.target.classList.remove('open__modal-body')
})

addCategory.addEventListener('click', function (e) {
    e.preventDefault()
    document.querySelector('.modal__body').classList.add('open__modal-body');
    document.querySelector('.modal').innerHTML = `
    <div class="Add__block">
    <h2 class="modalTitle">Add new category</h2>
        <form id="add__form" onsubmit='addCat(event)'>
            <input type="text" id="add" placeholder="Add new category" required>
            <button id="addbtn">Add Category</button>
        </form>
    </div>
    
    `
})

function addCat(e) {
    let count

    e.preventDefault()
    let categories;
    if (localStorage.getItem('categories')) {
        count = +localStorage.getItem('count') + 1;
        localStorage.setItem('count', count)
        categories = JSON.parse(localStorage.getItem('categories'))
    } else {
        count = 1
        localStorage.setItem('count', count)
        categories = []
    }

    let category = {
        id: count,
        name: add.value
    }
    categories.push(category)

    localStorage.setItem('categories', JSON.stringify(categories))
    updateCategories()
    drawDashboard()
    document.querySelector('.modal__body').classList.remove('open__modal-body')
}