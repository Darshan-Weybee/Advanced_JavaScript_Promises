const countriesContainer = document.querySelector('.countries');

function whereAmI(lat, lng){
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
    .then(res => res.json())
    .then(data => {
        console.log(data); 
        console.log(`You are in ${data.city}, ${data.countryName}`);
     return fetch(`https://restcountries.com/v3.1/name/${data.countryName}`);    
    })
    .then(res => {
        if(!res.ok) throw new Error("Something went wrong");
        return res.json()})
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(err));
}



function renderCountry(data, className = "") {
    console.log(data.flags);
    const html = `
    <article class="country ${className}">
        <img class="country__img" src="${data.flags.png}" />
        <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${data.population}</p>
            <p class="country__row"><span>🗣️</span>${data.languages[Object.keys(data.languages)[0]]}</p>
            <p class="country__row"><span>💰</span>${data.currencies[Object.keys(data.currencies)[0]].name} ${data.currencies[Object.keys(data.currencies)[0]].symbol}</p>
        </div>
    </article>
    `;
    countriesContainer.insertAdjacentHTML("beforeend", html);

    countriesContainer.style.opacity = 1;
}

whereAmI(52.508,13.381);
whereAmI(19.037,72.873);
whereAmI(-33.933,18.474); 
