const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

messageOne.textContent = "Loading..."
messageTwo.textContent = ""

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {

        if (data.error) {
            messageOne.textContent = data.error
            messageTwo.textContent = ""
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = "The temperature is " + data.forecast.temp + " deegrees, and it feels like " + data.forecast.feelsLike + " degrees. The outside conditions is: " + data.forecast.description + ". The chance of rain is " + data.forecast.precipitation + "% and the wind speed is " + data.forecast.windSpeed +" km/hr." 
        }

        })
    })

})

