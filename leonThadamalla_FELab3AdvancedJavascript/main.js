const api = {
    key: "7e3f21edee540e6110af347b55eb1ab2",
    base: "https://api.openweathermap.org/data/2.5/",
    units: "metric"
}

let searchBox = document.querySelector('.search-box');
let event = searchBox.addEventListener('keypress', setQuery);

function setQuery(event) {
    if (event.keyCode == 13) {
        getResult(searchBox.value);
    }
}

function getResult(cityName) {
    console.log(cityName);
    const url = `${api.base}weather?q=${cityName}&units=${api.units}&appid=${api.key}`;
    console.log("url is", url);
    fetch(url).then((response) => {
        console.log(response);
        return response.json();
    }).then((responseJson) => {
        console.log(responseJson);
        if (responseJson.cod == 200) {
            displayResults(responseJson);
        }
    }).catch((error) => {
        console.log("Error in API call", error);
    })
}

function displayResults(responseJson) {
    document.querySelector(".city").innerText = `${responseJson.name}, ${responseJson.sys.country}`;
    document.querySelector(".temp").innerHTML = `${Math.round(responseJson.main.temp)}°C`;
    document.querySelector('.weather').innerHTML = responseJson.weather[0].main;
    document.querySelector('.hi-low').innerHTML = `${Math.round(responseJson.main.temp_min)}°C / ${Math.round(responseJson.main.temp_max)}°C`;

    let now = new Date();
    document.querySelector('.date').innerHTML = dateBuilder(now);
}

function dateBuilder(date) {
    const dateOptions = {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'shortOffset'
    }

    return date.toLocaleDateString("en-US", dateOptions);
}