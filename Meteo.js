class Meteo {

    /**
     * @param {String} city 
     * @param {String} country 
     * @param {Number} lat 
     * @param {Number} long
     */
    constructor(city, country, lat, long){
        this.city = city;
        this.country = country;
        this.lat = lat;
        this.long = long;
        this.forecasts = {}; // {day1 : {hour, temp, ...}, day2 : {hour, temp, ...}}
    }

    /**
     * @param {String} date
     * @param {String} hour
     * @param {Number} temp
     * @param {Number} feels_like
     * @param {Number} temp_min 
     * @param {Number} temp_max 
     * @param {Number} humidity %
     * @param {Number} weather_id picture's id
     * @param {String} description 
     * @param {Number} clouds %
     * @param {Number} precipation between 0 and 1
     */
    addForecast(date, hour, temp, feels_like, temp_min, temp_max, humidity, weather_id, description, clouds, precipation){
        let forecast = {
            hour : hour,
            temp : temp,
            feels_like : feels_like,
            temp_min : temp_min,
            temp_max : temp_max,
            humidity : humidity,
            weather_id : weather_id,
            description : description,
            clouds : clouds,
            precipation : precipation * 100
        };

        if (date in this.forecasts){
            this.forecasts[date].push(forecast);
        }
        else{
            this.forecasts[date] = [forecast];
        }
    }

    get forecasts(){
        return this.forecasts;
    }

    toFavoris(){
        return new Favoris(this.city, this.country, this.lat, this.long);
    }

    

}

class Favoris{

    constructor(city, country, lat, long){
        this.city = city;
        this.description = "";
    }

    get country(){
        return this.country;
    }

    get lat(){
        return this.lat;
    }

    get long(){
        return this.long;
    }

    toJson(){
        let object = {
            "city" : this.city,
            "country" : this.country, 
            "lat" : this.lat, 
            "long" : this.long,
            "description" : this.description
        };

        let json = JSON.stringify(object);
    }

}