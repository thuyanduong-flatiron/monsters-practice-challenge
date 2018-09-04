const URL_PREFIX = 'http://localhost:3000/';
let page = 1;

document.addEventListener('DOMContentLoaded', function(){
  createMonsterForm()
  getMonsters()
  addNavListeners()
});

function getMonsters(pageNume){
    fetch(URL_PREFIX + `monsters/?_limit=50&_page=${pageNume}`)
    .then(response => response.json())
    .then(data => {
        document.querySelector('#monster-container').innerHTML = ''
        for (let i = 0; i < data.length; i++){
          let monster = new Monster(data[i].name, data[i].age, data[i].description)
          monster.render()
        }
    })
}

function createMonsterForm(){
    const form  = document.createElement('form'),
        nameInput = document.createElement('input'),
        ageInput = document.createElement('input'),
        descInput = document.createElement('input'),
        buttonEl = document.createElement('button');
    form.id = 'monster-form'
    nameInput.id = 'name'
    ageInput.id = 'age'
    descInput.id = 'description'
    nameInput.placeholder = 'name...'
    ageInput.placeholder = 'age...'
    descInput.placeholder = 'description...'
    buttonEl.innerHTML = 'Create'
    form.appendChild(nameInput)
    form.appendChild(ageInput)
    form.appendChild(descInput)
    form.appendChild(buttonEl)
    document.getElementById('create-monster').appendChild(form)
    addSubmitEventListener()
}

function addSubmitEventListener(){
    document.querySelector('#monster-form').addEventListener('submit', event => {
        event.preventDefault()
        postNewMonster(getFormData())
        clearForm()
    })
}

function getFormData(){
    let nameInput = document.querySelector('#name'),
        ageInput = document.querySelector('#age'),
        descInput = document.querySelector('#description');
    return {
        name: nameInput.value,
        age: parseFloat(ageInput.value),
        description: descInput.value
    }
}

function postNewMonster(monster){
    let url = URL_PREFIX + `monsters`
    let options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(monster)
    };
    fetch(url, options)
    .then(response => response.json())
    .then(data => {
      let monster = new Monster(data.name, data.age, data.description)
      monster.render()
    })
}

function clearForm(){
    document.querySelector('#monster-form').reset()
}

function addNavListeners(){
    let backEl = document.querySelector('#back')
    let forwardEl = document.querySelector('#forward')
    backEl.addEventListener('click', () => {
        pageDown()
    })
    forwardEl.addEventListener('click', () => {
        pageUp()
    })
}

function pageUp() {
    page++, getMonsters(page)
}

function pageDown() {
    1 < page ? (page--, getMonsters(page)) : alert('Aint no monsters here')
}
