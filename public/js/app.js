// fetch('http://localhost:3000/weather?address=Cuttack').then( (response) =>{
//     response.json().then((data) => {
//         if(data.error)
//             console.log(data.error);
//         else
//             console.log(data);
//     });
// })


const weatherForm=document.querySelector('form');
const searchBox = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


// messageOne.textContent = "First One";
// messageTwo.textContent = "Second One";

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    var location = searchBox.value;

    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";

    fetch('/weather?address='+location).then( (response) =>{
        response.json().then((data) => {
            if(data.error)
                //console.log(data.error);
                messageOne.textContent = data.error;
            else{
                messageOne.textContent = data.location;
                messageTwo.textContent = "We are having "+data.forecast.weather_descriptions[0]+" and the temperature is "+
                    data.forecast.temperature+" degree celsius. The temperature felt is around "+data.forecast.feelslike+" degree celsius.";
            }
        });
    })

});