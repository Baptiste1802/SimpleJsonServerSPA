let token = "3c3ba4897ef01b53f6e78abe6cb19744";
let url = "https://api.openweathermap.org/data/2.5";

async function fetchMeteoForecasts(city_name){
    const meteo = await fetchMeteo(city_name);
    const forecasts = await fetchForecasts(city_name);
    return {"meteo": meteo, "forecasts" : forecasts};
}

async function fetchMeteo(city_name){
    try {

        const response = await fetch(`${url}/weather?q=${city_name}&appid=${token}&units=metric&lang=fr`);
        if (response.ok){
            const data = await response.json();
            return data;
        }

        const data = await response.json();
        console.error(data["message"]);

    } catch (error) {
        console.error(error.message);
    }
}

async function fetchForecasts(city_name){
    try {
        const response = await fetch(`${url}/forecast?q=${city_name}&appid=${token}&units=metric&lang=fr`);
        if (response.ok){
            const data = await response.json();
            return data;
        }
        else{
            const data = await response.json();
            throw new Error(data["message"]);
        }
    } catch (error) {
        console.error(error.message);
    }
}