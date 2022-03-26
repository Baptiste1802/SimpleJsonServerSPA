class Meteo {

    /**
     * @param {String} city 
    */
    constructor(city){
        this.city = city;
        this.forecasts = {}; // {day1 : {hour, temp, ...}, day2 : {hour, temp, ...}}
    }

    getIcon(){return `http://openweathermap.org/img/wn/${this.icon}@2x.png`}

    getCity(){return this.city;}

    getTemp(){return this.temp;}

    getFeelsLike(){return this.feelsLike;}

    getTempMin(){return this.tempMin;}

    getTempMax(){return this.tempMax;}

    getHumidity(){return this.humidity;}

    getDescription(){return this.description;}

    getClouds(){return this.clouds;}

    getPressure(){return this.pressure;}

    /**
     * add a forecast to this.forecasts
     * @param {Date} date
     * @param {Number} temp
     * @param {Number} feelsLike
     * @param {Number} tempMin 
     * @param {Number} tempMax 
     * @param {Number} humidity %
     * @param {String} icon
     * @param {String} description 
     * @param {Number} clouds %
     * @param {Number} precipation between 0 and 1
     */
    addForecast(date, temp, feelsLike, tempMin, tempMax, humidity, icon, description, clouds, precipation){

        let forecast = new Forecast(date, temp, feelsLike, tempMin, tempMax, humidity, icon, description, clouds, precipation);

        let day = date.getDate();

        if (day in this.forecasts){
            this.forecasts[day].push(forecast);
        }
        else{
            this.forecasts[day] = [forecast];
        }
    }

    /**
     * Create a new Meteo object instancied with json data
     * @param {*} json
     * from https://api.openweathermap.org/data/2.5/weather 
     * @returns {Meteo}
     */
    jsonToMeteo(json){

        let date = new Date(json["dt"] * 1000);

        this.date = date;
        this.temp = json["main"]["temp"];
        this.feelsLike = json["main"]["feels_like"];
        this.tempMin = json["main"]["temp_min"];
        this.tempMax = json["main"]["temp_max"];
        this.humidity = json["main"]["humidity"];
        this.icon = json["weather"][0]["icon"];
        this.description = json["weather"][0]["description"];
        this.clouds = json["clouds"]["all"];
        this.pressure = json["main"]["pressure"];
    }

    /**
     * retrieve and add forecasts from json data
     * @param {*} json 
     * from https://api.openweathermap.org/data/2.5/forecast
     */
    jsonToForecasts(json){

        for (let day of json["list"]){
            let date = new Date(day["dt"] * 1000);
            this.addForecast(date, day["main"]["temp"], day["main"]["feels_like"], day["main"]["temp_min"], day["main"]["temp_max"], day["main"]["humidity"], day["weather"][0]["icon"], day["weather"][0]["description"],day["clouds"]["all"], day["pop"]);
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
     * @param {Number} feelsLike
     * @param {Number} tempMin 
     * @param {Number} tempMax 
     * @param {Number} humidity %
     * @param {String} icon
     * @param {String} description 
     * @param {Number} clouds %
     * @param {Number} precipation between 0 and 1
     */
    constructor(date, temp, feelsLike, tempMin, tempMax, humidity, icon, description, clouds, precipation){
        this.date = date;
        this.temp = temp;
        this.feelsLike = feelsLike;
        this.tempMin = tempMin;
        this.tempMax = tempMax;
        this.humidity = humidity;
        this.icon = icon;
        this.description = description;
        this.clouds = clouds;
        this.precipation = precipation;
    }

    get getIcon(){return `http://openweathermap.org/img/wn/${this.icon}@2x.png`}

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