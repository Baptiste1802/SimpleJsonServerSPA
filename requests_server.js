async function addNewFav(favoris){
            
    const settings = {
        method : "POST",
        headers : {
            "Accept": "application/json",
            "Content-Type" : "application/json",
        },
        body : favoris.toJson()
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


async function getFavoris(){

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
        console.log(data);
    }
    else{
        const data = await response.json();
        console.log(data["message"]);
    }
}