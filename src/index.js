// Your code here
//add an event listener of DOMContent loaded
document.addEventListener('DOMContentLoaded', () => {
    
    //Grab elements to manipulate and display
    let characterbar = document.getElementById('character-bar')
    let totalvote = 0;
    
    let character = document.querySelector('.characterInfo')
    let details = character.firstElementChild
    let name = details.firstElementChild
    let image = details.getElementsByTagName('img').item(0)
    let total = details.getElementsByTagName('h4').item(0).firstElementChild
    let form = details.getElementsByTagName('form').item(0)
    // fetch name and display
    fetchAndDisplay("http://localhost:3000/characters", characterbar)

    function fetchAndDisplay(URL, element){
        fetch(URL)
        .then((response) => response.json())
        .then((results) => {
            for(const result of results){
                let span = document.createElement('span')
                span.innerText = result.name
                element.appendChild(span)

                //add event listener to the sapn
                span.addEventListener('click', () => {
                    name.textContent = result.name
                    image.src = result.image
                    total.innerText = 0

                    //add an event listener to the form
                    form.addEventListener('submit', (e) => {
                        e.preventDefault()
                        
                        let value = parseInt(form.firstElementChild.value, 10)
                        totalvote += value
                        total.innerText = totalvote    
                    })

                })
            }
        })
    }
    
})