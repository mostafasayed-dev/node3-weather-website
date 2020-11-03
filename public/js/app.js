// console.log('Client side javascript file is loaded!')

//fetch api is a browser(client side) method - not a nodejs method
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((jsonData) => {
//         console.log(jsonData)
//     })
// })

// fetch('http://localhost:3000/weather?address=Boston').then((response) => {
//     response.json().then((jsonData) => {
//         if(jsonData.error){
//             console.log(jsonData.error)
//         }else{
//             console.log(jsonData.location)
//             console.log(jsonData.forecast)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()//prevent default form behaviour from reloading the page
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    const location = searchElement.value
    // const url = 'http://localhost:3000/weather?address=' + location
    const url = '/weather?address=' + location
    fetch(url).then((response) => {
        response.json().then((jsonData) => {
            if(jsonData.error){
                //console.log(jsonData.error)
                messageOne.textContent = jsonData.error
            }else{
                // console.log(jsonData.location)
                messageOne.textContent = jsonData.location
                //console.log(jsonData.forecast)
                messageTwo.textContent = jsonData.forecast.description 
                                        + '. It feels like ' + jsonData.forecast.feelslike
                                        + ' and temprature is ' + jsonData.forecast.temperature
            }
        })
    })
    // console.log(location)
}) 