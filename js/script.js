let foodsInfo = [
    {id:1,name:"Pepperoni",desc:"Pizza sauce, mozzarella, pepperoni"},
    {id:2,name:"Supreme",desc:"Pizza sauce, mozzarella, bacon, onion, beef mince, capsicum, pepperoni, mushroom, olives"},
    {id:3,name:"Hawaiian",desc:"Pizza sauce, mozzarella, ham, pineapple"},
    {id:4,name:"BBQ Meatlovers",desc:"BBQ sauce, mozzarella, pepperoni, bacon, cabanossi, beef mince, ham"},
    {id:5,name:"Garlic Butter Prawns AND Chilli",desc:"Pizza sauce, mozzarella, garlic butter prawns, capsicum, onion, chilli, rocket"},
    {id:6,name:"Sausage & Kale",desc:"Pizza sauce, mozzarella, sausage, kale"},
    {id:7,name:"Margherita",desc:"Pizza sauce, buffalo mozzarella, basil, olive oil, salt"},
    {id:8,name:"Capricciosa",desc:"Pizza sauce, mozzarella, ham, artichoke, mushrooms, olives"},
    {id:9,name:"Quattro Formaggio",desc:"mozzarella, parmesan, provolone, blue cheese"},
    {id:10,name:"Prosciutto AND Rocket",desc:"Pizza sauce, mozzarella, prosciutto, rocket/arugula, extra virgin olive oil"},
    {id:11,name:"Garlic Cheese Pizza",desc:"Pizza sauce, mozzarella, prosciutto, rocket/arugula, extra virgin olive oil"},
    {id:12,name:"Potato& Rosemary",desc:"mozzarella, potato, fresh rosemary, extra virgin olive oil"},
    {id:13,name:"Mushroom",desc:"Pizza sauce, mozzarella, pepperoni"},
    {id:14,name:"Extra cheese",desc:"Pizza sauce, mozzarella, ham, pineapple"},
    {id:15,name:"Sausage",desc:"Pizza sauce, mozzarella, sausage, kale"},
    {id:16,name:"Onion",desc:"Pizza sauce, buffalo mozzarella, basil, olive oil, salt"},
    {id:17,name:"Black olives",desc:"Pizza sauce, mozzarella, ham, artichoke, mushrooms, olives"},
    {id:18,name:"Green pepper",desc:"mozzarella, parmesan, provolone, blue cheese"},
    {id:19,name:"Fresh garlic",desc:"BBQ sauce, mozzarella, pepperoni, bacon, cabanossi, beef mince, ham"},
    {id:20,name:"Spinach Artichoke",desc:"Pizza sauce, mozzarella, prosciutto, rocket/arugula, extra virgin olive oil"},
    
]


let showFoodsID = foodsInfo.map(food => food.id)


let $ = document
let selectedFoodsID = new Array() //An array to store IDs of checked places
let itemContainer = $.querySelector('.multi-select-item-content')
let selectTitle = $.querySelector('.multi-select-title')
let selectChipsContainer = $.querySelector('.multi-select-chips-wrapper')
let clearSectionBtn = $.querySelector('.clear-section-btn')
let clearSectionTitle = $.querySelector('.clear-section-title')
let acceptBtn = $.querySelector('.ghost-btn ')
let acceptBtnText = $.querySelector('.accept-button')
let searchInpueElem = $.querySelector('.modal-text-field-input')

//A function to build each item of food information 
const addFoodsListToDom = (food) => {  

    const isChecked = selectedFoodsID.includes(food.id)
    const foodsWrapper = $.createElement('label')
    foodsWrapper.classList.add('food-wrapper')
    foodsWrapper.setAttribute('food-id',food.id)
    const foodTitleElem = $.createElement('div')
    foodTitleElem.classList.add('title-item-wrapper')
    foodTitleElem.innerHTML = `
    <div>${food.name}</div>
    <div class="check-box-wrapper"><input type="checkbox" class="check-item" id=${food.id} ${isChecked ? 'checked' : ''} onChange="tickCheckHandler(this, ${food.id})"></div>
    `
    const foodDescElem = $.createElement('div')
    foodDescElem.classList.add('desc-item')
    foodDescElem.innerHTML = `
    ${food.desc}
    `
    const hrElem = $.createElement('hr')
    hrElem.classList.add('divider')
    
    foodsWrapper.appendChild(foodTitleElem)
    foodsWrapper.appendChild(foodDescElem)
    foodsWrapper.appendChild(hrElem)
    itemContainer.appendChild(foodsWrapper)
    
}
//A function to build container of foods based on the input
const createFoodsWrapper = (foodsID) => {
    let selectedItems = foodsInfo.filter(food => {
        return foodsID.some(number => {
            return number === food.id
        })
    })
    selectedItems.forEach(food => {
        addFoodsListToDom(food)
    })
}

createFoodsWrapper(showFoodsID)

//A function to create each chip
const createChip = (food) =>{
    const chipElem = $.createElement('div')
    chipElem.classList.add('select-chips')
    chipElem.setAttribute('id',`${food.id}`)
    chipElem.innerHTML = `
    <span class="select-chips-title">${food.name}</span><span class="svg-close-wrapper"> 
    <svg
        onclick="closeIconChipHandler(${food.id})"
        class="svg-close"
        width="10"
        height="10"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
        d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
        fill="currentColor"/></svg>
    </span>
    `
    selectChipsContainer.appendChild(chipElem)
}

//A function to show a sentence when the search has no results
const notSearchFound = () => {
    const notFoundContainer = $.createElement('div')
    notFoundContainer.classList.add('not-search-found')
    notFoundContainer.innerHTML = '<p>Sorry, There Is No Item For Your Request.</p>'
    itemContainer.appendChild(notFoundContainer)

}

const tickCheckHandler = (e, id) => e.checked ? checkedInput(id) : uncheckedInput(id)

const findSelectedFood = (id) => {
    return foodsInfo.find(food => food.id === id)
}

const checkedInput = (id) => {
    const selectedFood = findSelectedFood(id)
    selectedFoodsID.push(id)
    checkSelectedAny()
    createChip(selectedFood)
}

const removechip = (id) => {
    let uncheckFood = $.getElementById(`${id}`)
    selectChipsContainer.removeChild(uncheckFood)

}

//A function to manage the hiding and showing of some styles
const checkSelectedAny = () => {
    if (selectedFoodsID.length){
        selectTitle.classList.remove('hidden')
        selectTitle.classList.add('hidden')
        clearSectionTitle.classList.remove('hidden')
        acceptBtn.classList.remove('bg-color')
        acceptBtn.classList.add('bg-color')
        acceptBtnText.classList.add('white-color')
        clearSectionBtn.classList.remove('hidden')
        acceptBtn.removeAttribute('disabled')        
    }
    else{
        selectTitle.classList.remove('hidden')
        clearSectionTitle.classList.remove('hidden')
        clearSectionTitle.classList.add('hidden')
        acceptBtn.classList.remove('bg-color')
        acceptBtnText.classList.remove('white-color')
        clearSectionBtn.classList.remove('hidden')
        clearSectionBtn.classList.add('hidden')
        acceptBtn.setAttribute('disabled',false)
    }
}

const uncheckedInput = (id) => {
    const removeChipID = selectedFoodsID.find(uncheckchip => uncheckchip === id)
    selectedFoodsID = selectedFoodsID.filter(ID => ID != removeChipID)
    removechip(removeChipID);
    checkSelectedAny()
}

const setUncheckHandler = (id) => {
    let setUncheck = $.getElementById(id)
    setUncheck.checked = false
}

const closeIconChipHandler = (id) => {
    removechip(id)
    selectedFoodsID = selectedFoodsID.filter(ID => ID !== id)
    setUncheckHandler(id)
    checkSelectedAny()
}

const deleteAllChips = () => {

    selectChipsContainer.innerHTML = ''
    selectedFoodsID.forEach(id => {
        setUncheckHandler(id)
    })
    selectedFoodsID = []
    checkSelectedAny()

}

//A function to search in places and show the search result
const autoSearchHandler = () => {
    let typedValue = searchInpueElem.value
    let filteredFoodID = foodsInfo.filter(food => food.name.toLowerCase().includes(typedValue.toLowerCase()) || food.desc.toLowerCase().includes(typedValue.toLowerCase())).map(food => food.id)
    if(filteredFoodID.length){
        itemContainer.innerHTML = ''
        createFoodsWrapper(filteredFoodID)
    }else{
        itemContainer.innerHTML = ''
        notSearchFound()
    }
    

}

const submitBtnHandler = () => {
    alert(`Number of selected pizzas: ${selectedFoodsID.length} , IDs: ${selectedFoodsID}`)
}

clearSectionTitle.addEventListener('click',deleteAllChips)

searchInpueElem.addEventListener('input',autoSearchHandler)

acceptBtn.addEventListener('click',submitBtnHandler)


