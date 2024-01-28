let locationsInfo = [
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


let showLocationsID = locationsInfo.map(location => location.id)


let $ = document
let selectedLocationsID = new Array() //An array to store IDs of checked places
let itemContainer = $.querySelector('.multi-select-item-content')
let selectTitle = $.querySelector('.multi-select-title')
let selectChipsContainer = $.querySelector('.multi-select-chips-wrapper')
let clearSectionBtn = $.querySelector('.clear-section-btn')
let clearSectionTitle = $.querySelector('.clear-section-title')
let acceptBtn = $.querySelector('.ghost-btn ')
let acceptBtnText = $.querySelector('.accept-button')
let searchInpueElem = $.querySelector('.modal-text-field-input')

//A function to build each item of location information 
const addLocationsListToDom = (location) => {  

    const isChecked = selectedLocationsID.includes(location.id)
    const locationsWrapper = $.createElement('label')
    locationsWrapper.classList.add('location-wrapper')
    locationsWrapper.setAttribute('location-id',location.id)
    const locationTitleElem = $.createElement('div')
    locationTitleElem.classList.add('title-item-wrapper')
    locationTitleElem.innerHTML = `
    <div>${location.name}</div>
    <div class="check-box-wrapper"><input type="checkbox" class="check-item" id=${location.id} ${isChecked ? 'checked' : ''} onChange="tickCheckHandler(this, ${location.id})"></div>
    `
    const locationDescElem = $.createElement('div')
    locationDescElem.classList.add('desc-item')
    locationDescElem.innerHTML = `
    ${location.desc}
    `
    const hrElem = $.createElement('hr')
    hrElem.classList.add('divider')
    
    locationsWrapper.appendChild(locationTitleElem)
    locationsWrapper.appendChild(locationDescElem)
    locationsWrapper.appendChild(hrElem)
    itemContainer.appendChild(locationsWrapper)
    
}
//A function to build container of locations based on the input
const createLocationsWrapper = (locationsID) => {
    let selectedItems = locationsInfo.filter(location => {
        return locationsID.some(number => {
            return number === location.id
        })
    })
    selectedItems.forEach(location => {
        addLocationsListToDom(location)
    })
}

createLocationsWrapper(showLocationsID)

//A function to create each chip
const createChip = (location) =>{
    const chipElem = $.createElement('div')
    chipElem.classList.add('select-chips')
    chipElem.setAttribute('id',`${location.id}`)
    chipElem.innerHTML = `
    <span class="select-chips-title">${location.name}</span><span class="svg-close-wrapper"> 
    <svg
        onclick="closeIconChipHandler(${location.id})"
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

const findSelectedLocation = (id) => {
    return locationsInfo.find(location => location.id === id)
}

const checkedInput = (id) => {
    const selectedLocation = findSelectedLocation(id)
    selectedLocationsID.push(id)
    checkSelectedAny()
    createChip(selectedLocation)
}

const removechip = (id) => {
    let uncheckLocation = $.getElementById(`${id}`)
    selectChipsContainer.removeChild(uncheckLocation)

}

//A function to manage the hiding and showing of some styles
const checkSelectedAny = () => {
    if (selectedLocationsID.length){
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
    const removeChipID = selectedLocationsID.find(uncheckchip => uncheckchip === id)
    selectedLocationsID = selectedLocationsID.filter(ID => ID != removeChipID)
    removechip(removeChipID);
    checkSelectedAny()
}

const setUncheckHandler = (id) => {
    let setUncheck = $.getElementById(id)
    setUncheck.checked = false
}

const closeIconChipHandler = (id) => {
    removechip(id)
    selectedLocationsID = selectedLocationsID.filter(ID => ID !== id)
    setUncheckHandler(id)
    checkSelectedAny()
}

const deleteAllChips = () => {

    selectChipsContainer.innerHTML = ''
    selectedLocationsID.forEach(id => {
        setUncheckHandler(id)
    })
    selectedLocationsID = []
    checkSelectedAny()

}

//A function to search in places and show the search result
const autoSearchHandler = () => {
    let typedValue = searchInpueElem.value
    let filteredLocationID = locationsInfo.filter(location => location.name.includes(typedValue) || location.desc.includes(typedValue)).map(location => location.id)
    if(filteredLocationID.length){
        itemContainer.innerHTML = ''
        createLocationsWrapper(filteredLocationID)
    }else{
        itemContainer.innerHTML = ''
        notSearchFound()
    }
    

}

const submitBtnHandler = () => {
    alert(`Number of selected pizzas: ${selectedLocationsID.length} , IDs: ${selectedLocationsID}`)
}

clearSectionTitle.addEventListener('click',deleteAllChips)

searchInpueElem.addEventListener('input',autoSearchHandler)

acceptBtn.addEventListener('click',submitBtnHandler)


