const resultsNav = document.getElementById('resultsNav');
const favoritesNav = document.getElementById('favoritesNav');
const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');


//nasa API
const count = 10;
const apiKey = 'DEMO_KEY';
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
let favorites = {};

function updateDOM(){
    resultsArray.forEach((result)=> {
       //card container
       const card = document.createElement("div");
       card.classList.add('card'); 
       
       //link
       const link = document.createElement('div');
       link.href = result.hdUrl;
       link.title = 'View full Image';
       link.target = '_blank';

       //image
       const image = document.createElement('img');
       image.src = result.Url;
       image.alt = 'NASA Picture of the Day';
       image.loading = 'lazy';
       image.classList.add('card-img-top');

       //card body
       const cardBody = document.createElement('div');
       cardBody.classList.add('card-body')

       // Card Title
       const cardTitle = document.createElement('h5');
       cardTitle.classList.add('card-title');
       cardTitle.textContent = result.title;

       // Save Text
       const saveText = document.createElement('p');
       saveText.classList.add('clickable');
       //if (page === 'results') {
         saveText.textContent = 'Add To Favorites';
         saveText.setAttribute('onclick', `saveFavorite('${result.url}')`);
       //} else {
         saveText.textContent = 'Remove Favorite';
         saveText.setAttribute('onclick', `removeFavorite('${result.url}')`);
       //}

       // Card Text
       const cardText = document.createElement('p');
       cardText.textContent = result.explanation;

       // Footer Container
       const footer = document.createElement('small');
       footer.classList.add('text-muted');

       // Date
       const date = document.createElement('strong');
       date.textContent = result.date;

    });

}

//get 10 images from NASA API
async function getNasapictures(){
    try{
        const response = await fetch(apiUrl);
        resultsArray = await response.json();
        console.log(resultsArray);
        updateDOM();
    }catch(error){
     //catch error here

    }
}


//on load
getNasapictures();