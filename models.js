/**
 * Create a new Meteo object instancied with json data
 * @param {*} json
 * from https://api.openweathermap.org/data/2.5/weather 
 * @returns {Meteo}
 */
function jsonToMeteo(json){

    let date = new Date(json["dt"] * 1000);

    let meteo = new Meteo(
        json["name"],
        date,
        json["main"]["temp"],
        json["main"]["feels_like"],
        json["main"]["temp_min"],
        json["main"]["temp_max"],
        json["main"]["humidity"],
        json["weather"][0]["description"],
        json["clouds"]["all"]
        );

    return meteo;
}

class Meteo {

    /**
     * @param {String} city 
     * @param {String} country 
     * @param {Date} date
     * @param {Number} temp
     * @param {Number} feels_like
     * @param {Number} temp_min 
     * @param {Number} temp_max 
     * @param {Number} humidity %
     * @param {String} description 
     * @param {Number} clouds %
    */
    constructor(city, date, temp, feels_like, temp_min, temp_max, humidity, description, clouds){
        this.city = city;
        this.date = date;
        this.temp = temp;
        this.feels_like = feels_like;
        this.temp_min = temp_min;
        this.temp_max = temp_max;
        this.humidity = humidity;
        this.description = description;
        this.clouds = clouds;
        this.forecasts = {}; // {day1 : {hour, temp, ...}, day2 : {hour, temp, ...}}
    }

    /**
     * add a forecast to this.forecasts
     * @param {Date} date
     * @param {Number} temp
     * @param {Number} feels_like
     * @param {Number} temp_min 
     * @param {Number} temp_max 
     * @param {Number} humidity %
     * @param {String} description 
     * @param {Number} clouds %
     * @param {Number} precipation between 0 and 1
     */
    addForecast(date, temp, feels_like, temp_min, temp_max, humidity, description, clouds, precipation){

        let forecast = new Forecast(date, temp, feels_like, temp_min, temp_max, humidity, description, clouds, precipation);

        let day = date.getDate();

        if (day in this.forecasts){
            this.forecasts[day].push(forecast);
        }
        else{
            this.forecasts[day] = [forecast];
        }
    }

    /**
     * retrieve and add forecasts from json data
     * @param {*} json 
     * from https://api.openweathermap.org/data/2.5/forecast
     */
    jsonToForecasts(json){
        for (let day of json["list"]){
            let date = new Date(day["dt"] * 1000);
            this.addForecast(date, day["main"]["temp"], day["main"]["feels_like"], day["main"]["temp_min"], day["main"]["temp_max"], day["main"]["humidity"], day["weather"][0]["description"],day["clouds"]["all"], day["pop"]);
        }
    }

    toFavoris(){
        return new Favoris(this.city);
    }
}

class Forecast{

    /**
     * add a forecast to this.forecasts
     * @param {Date} date
     * @param {Number} temp
     * @param {Number} feels_like
     * @param {Number} temp_min 
     * @param {Number} temp_max 
     * @param {Number} humidity %
     * @param {String} description 
     * @param {Number} clouds %
     * @param {Number} precipation between 0 and 1
     */
    constructor(date, temp, feels_like, temp_min, temp_max, humidity, description, clouds, precipation){
        this.date = date;
        this.temp = temp;
        this.feels_like = feels_like;
        this.temp_min = temp_min;
        this.temp_max = temp_max;
        this.humidity = humidity;
        this.description = description;
        this.clouds = clouds;
        this.precipation = precipation;
    }

}

class Favoris{

    constructor(city){
        this.city = city;
        this.description = "";
    }

    toJson(){
        let object = {
            "city" : this.city,
            "description" : this.description
        };
        return JSON.stringify(object);
    }
}