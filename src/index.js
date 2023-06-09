// Your code here

//grab elements
let characterBar = document.querySelector('#character-bar')
let detailedInfo = characterBar.nextElementSibling.firstElementChild
let votes = detailedInfo.querySelector('h4').firstElementChild

//sumbmit votes
let totalVotes = 0
function submitVotes(event){
    event.preventDefault()
    let input = event.target.votes
    let value = parseInt(input.value, 10)
    totalVotes += value
    votes.innerText = totalVotes
    input.value =''

    //clear votes when button is clicked
    let reset = detailedInfo.lastElementChild
    reset.addEventListener('click', resetVotes)
}

//add span and append
function appendSpan(name, image){
    let span = document.createElement('span')
    span.innerText =name
    characterBar.appendChild(span)

    //click listener updating DOM
    span.addEventListener('click', () =>{
        display(name,image)
    })
}

//add a new character
function addCharacter(event){
    event.preventDefault()
    let name = event.target.firstElementChild.lastElementChild
    let url = event.target.firstElementChild.nextElementSibling.lastElementChild
    let character = {}
    character.name = name.value
    character.image = url.value
    appendSpan(name.value, url.value)
    display(name.value, url.value)

    // clear inputs
    name.value = ''
    url.value = ''
}

//display characters
function display(name, image){
    let characterName = detailedInfo.firstElementChild
    let characterImage = characterName.nextElementSibling
    characterName.textContent = name
    characterImage.src = image
    characterImage.nextElementSibling.firstElementChild.innerText = 0

    // grab form to update votes based on character
    let form = detailedInfo.querySelector('form')
    form.addEventListener('submit', submitVotes)
}

//reset votes
function resetVotes(){
    detailedInfo.querySelector('h4').firstElementChild.innerText = 0
}

//add an event listener of DOMContent loaded
document.addEventListener('DOMContentLoaded', () => {
    
    // fetch name and display
    fetchAndDisplay("http://localhost:3000/characters")

    function fetchAndDisplay(URL){
        fetch(URL)
        .then((response) => response.json())
        .then((results) => {
            for(const result of results)appendSpan(result.name,result.image)
        })
    }

    //add newcharacters
    let newCharacter = document.querySelector('.characterInfo').lastElementChild
    newCharacter.addEventListener('submit', addCharacter)
})
