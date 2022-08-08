'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

function getCountrieData(country) {

    const request = new XMLHttpRequest();
    request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
    request.send();

    request.addEventListener("load", function (e) {
        const [data] = JSON.parse(request.responseText);
        console.log(data);

        renderWorkout(data);

        const [neighbour] = data.borders;
        console.log(neighbour);
        if (!neighbour) return;

        const request2 = new XMLHttpRequest();
        request2.open("GET", `https://restcountries.com/v3.1/alpha/${neighbour}`);
        request2.send();

        request2.addEventListener("load", function () {
            const [data2] = JSON.parse(this.responseText);
            console.log(data2);
            renderWorkout(data2, "neighbour");
        });

    });

}

function renderWorkout(data, className = "") {
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

    // countriesContainer.style.opacity = 1;
}

// getCountrieData("portugal");
// getCountrieData("usa");
// getCountrieData("canada");
// getCountrieData("france");
// getCountrieData("arab");


///  Promises


// const getCountryD = function(country){
//     fetch(`https://restcountries.com/v3.1/name/${country}`).then(function(response){
//     console.log(response);    
//     return response.json();
//     }).then(function(data){
//         console.log(data);
//         renderWorkout(data[0]);
//     });
// }

//handling errors first type

// const getCountryD = (country) => fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => response.json(), err => alert(err))
//     .then(data => {
//         console.log(data);
//         renderWorkout(data[0]);
//         const neighbour = data[0].borders[0];

//         return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`)
//     })
//     .then(response => response.json(), err => alert(err))
//     .then(data => renderWorkout(data[0], "neighbour"));

// handling errors second   type

function renderErr(msg){
    countriesContainer.insertAdjacentText("beforeend", msg);
    // countriesContainer.style.opacity = 1;
}

function getJSON(url, errMsg = `Something went wrong`) {
     return fetch(url)
        .then(response => {
            if (!response.ok) {
                console.log(errMsg);
                throw new Error(`${errMsg} ${response.status}`);
            }
            return response.json();
        });
};

const getCountryD = (country) => 
     getJSON(`https://restcountries.com/v3.1/name/${country}`, `Country Not Found`)
    .then(data => {
        console.log(data);
        renderWorkout(data[0]);
        const neighbour = data[0].borders[0];

        if(!neighbour) throw new Error("No neighbour found");

     return getJSON(`https://restcountries.com/v3.1/alpha/${neighbour}`, `Country Not Found`)
    })
    .then(data => renderWorkout(data[0], "neighbour"))
    .catch(err => renderErr(`Something went wrong. ${err.message}. Try Again!`))
    .finally(() => countriesContainer.style.opacity = 1);


btn.addEventListener("click", function (e) {
    getCountryD("portugal");
});
// getCountryD("usa");
// getCountryD("canada");
// getCountryD("france");
// getCountryD("arab");


// // make Promises manually


// const lotteryPromise = new Promise(function(resolve, reject){
//     console.log("Lottery draw is here");
//     setTimeout(function(){
//         if(Math.random() >= 0.5)
//             resolve("You win");
//         else
//             reject(new Error("You loss"));
//     }, 2000)
// })
// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// // 
// function wait(second){
//     return new Promise(function(resolve){
//         setTimeout(resolve,1000)
//     })
// }

// wait(1).then(() => {
//         console.log("1 second pass");
//         return wait(1);
//     })
//     .then(() => {
//         console.log("2 second pass");
//         return wait(1);
//     })
//     .then(() => {
//         console.log("3 second pass");
//         return wait(1);
//     })
//     .then(() => {
//         console.log("4 second pass");
//         return wait(0.5);
//     })
//     .then(() => {
//         console.log("5 second pass");
//     })


// Promise.resolve("You win").then(res => console.log(res));
// Promise.reject("You loss").catch(err => console.error(err));


function getPos(){
    navigator.geolocation.getCurrentPosition(
        position => console.log(position),
        err => console.error(err)
    );
}

const getPosition = function(){
    return new Promise(function(resolve, reject){
        // navigator.geolocation.getCurrentPosition(
        //     position => resolve(position),
        //     err => reject(err)
        // );
        navigator.geolocation.getCurrentPosition(resolve, reject);
    }) 
}
// console.log("first");
// getPos();
// console.log("second");
// getPosition().then(res => console.log(res)).catch(err => console.error(err));
// console.log("three");


// async and await 


async function ds(country) {
    try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);

        if (!res.ok) throw new Error("Country not found");

        const data = await res.json();
        console.log(data);
        return data;
    }
    catch (err) {
        console.log(err);
        renderErr(err.message);

        throw err.message;
    }
}
console.log(`1: first`);
//  ds('usa')
//     .then(d => console.log(d))
//     .catch(err => console.log(err))
//     .finally(() => console.log(`3: three`));

// (async function(){
//     try{    
//         const data = await ds("usa");
//         console.log(data);
//     }catch(err){
//         console.error(err.message);
//     }
//     console.log(`3: three`);
// })();


// running promises parallel
// Promise.all() it takes an array execute it same it 
// use when all elements that passes in Promises.all() is independent to each other
// when one promise is rejected then Promise.all() is shot-circukited

const get3Countries = async function(c1, c2, c3){
    try{
        // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
        // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
        // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);

        // console.log([data1.capital, data2.capital, data3.capital]);

        const data = await Promise.all([getJSON(`https://restcountries.com/v3.1/name/${c1}`), getJSON(`https://restcountries.com/v3.1/name/${c2}`), getJSON(`https://restcountries.com/v3.1/name/${c3}`)]);
        console.log(data.map(dt => dt[0].capital[0]));
    }
    catch(err){
        console.error(err);
    }
}
get3Countries("portugal","canada","usa");


// Promise.race()
// return first promise that fullfilled first
// take array of promise

(async function(){
    const data = await Promise.race([
        getJSON(`https://restcountries.com/v3.1/name/italy`),
        getJSON(`https://restcountries.com/v3.1/name/mexico`),
        getJSON(`https://restcountries.com/v3.1/name/egypt`)
    ]);
    console.log(data[0]);
})();

function timeout(sec){
    return new Promise(function(_,reject){
        setTimeout(function()
        {
            reject(new Error("Request take too long"))
        }, sec*1000);
    })
}

Promise.race([
        getJSON(`https://restcountries.com/v3.1/name/tanzania`), 
        timeout(1)
    ])
.then(data => console.log(data[0])).catch(err => console.error(err));



// Promise.allSettled 
// give all the promise either it is rejected or fullfilled
// take array of promise

Promise.allSettled([
    getJSON(`https://restcountries.com/v3.1/name/italydsjnfkl`),
    getJSON(`https://restcountries.com/v3.1/name/mexico`),
    getJSON(`https://restcountries.com/v3.1/name/egypt`)
]).then(data => console.log(data));

//Promise.any()
// give first fullfilled promise and other is rejected like Promise.race()
// take array of promise

Promise.any([
    getJSON(`https://restcountries.com/v3.1/name/italysdfsdf`),
    getJSON(`https://restcountries.com/v3.1/name/mexicozszc`),
    getJSON(`https://restcountries.com/v3.1/name/egypt`)
]).then(data => console.log(data));
