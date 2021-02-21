export {}

interface CoordsType {
    latitude: number;
    longitude: number;
}

const weather = document.querySelector('.js-weather') as HTMLSpanElement;

const API_KEY = "8a873f8763125bdab97ae4df7e88bf92";

const COORDS = 'coords';


function getWeather(lat: number, lng: number): void{
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then(function(response){
        return response.json();
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    });
}

function saveCoords(coordsObj: CoordsType): void{
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position: GeolocationPosition): void{
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj: CoordsType = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(): void{
    console.log('Cant access Geo location');
}

function askForCooards(): void{
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCooards(): void{
    const loadedCooards = localStorage.getItem(COORDS);
    if(loadedCooards === null){
        askForCooards();
    } else {
        const parseCoords: CoordsType = JSON.parse(loadedCooards);
        console.log(parseCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }

}

function init(): void{
    loadCooards();
}

init();