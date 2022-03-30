async function addNewFav(meteo){
            
    const settings = {
        method : "POST",
        headers : {
            "Accept": "application/json",
            "Content-Type" : "application/json",
        },
        body : meteo.toJson()
    };

    const response = await fetch("http://localhost:3000/favoris", settings);
    if (response.ok){
        const data = await response.json();
        console.log(data);
    }
    else{
        const data = await response.json();
        console.error(data["message"]);
    }
}


async function getAllFavoris(){

    const settings = {
        method : "GET",
        headers : {
            "Accept" : "application/json",
            "Content-Type" : "application/json",
        },
    };

    const response = await fetch("http://localhost:3000/favoris",settings);
    if(response.ok){
        const data = await response.json();
        for (json of data){
            let favoris = new Favoris(json["city"], json["description"], json["id"]);
            favoris.addToSideBar("sideBarItems", "sideBarItemTemplate");
        }
    }
    else{
        const data = await response.json();
        console.log(data["message"]);
    }
}


async function searchFav(query){

    const settings = {
        method : "GET",
        headers : {
            "Accept" : "application/json",
            "Content-Type" : "application/json",
        },
    };

    const response = await fetch(`http://localhost:3000/favoris?city_like=${query}`,settings);
    if(response.ok){
        const data = await response.json();
        console.log(data);
        return data;
    }
    else{
        const data = await response.json();
        console.log(data["message"]);
    }
}


async function getFavoris(id){

    const settings = {
        method : "GET",
        headers : {
            "Accept" : "application/json",
            "Content-Type" : "application/json",
        },
    };

    const response = await fetch(`http://localhost:3000/favoris/${id}`,settings);
    if(response.ok){
        const data = await response.json();
        console.log(data);
        return data;
    }
    else{
        const data = await response.json();
        console.log(data["message"]);
    }
}



async function suppFavoris(id){

    const settings = {
        method : "DELETE",
        headers : {
            "Accept" : "application/json",
            "Content-Type" : "application/json",
        },
    };

    const response = await fetch(`http://localhost:3000/favoris/${id}`,settings);
    if(!response.ok){
        const data = await response.json();
        console.log(data);
        return data;
    }
}