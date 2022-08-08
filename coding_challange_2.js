let image;

function createImage(path){
    return new Promise(function(resolve, reject){
        const img = document.createElement("img");
        img.src = path;

        img.addEventListener("load", function(){
            document.querySelector(".images").append(img);
            resolve(this);
        })

        img.addEventListener("error", function(){
            reject(new Error("Image Not Found"));
        })
    })
}

function imageRender(img){
    return new Promise(function(resolve, reject){
        image = img;
        console.log("Image 1 loaded");
        resolve(wait(2));
    })
}

function newImage(path){
    return new Promise(function(resolve, reject){
        image.style.display = "none";
        resolve(createImage('img/Luxury.jpg'));
    })
}

createImage('img/car.jpg')
    .then(img => imageRender(img))
    .then(() => newImage(`img/Luxury.jpg`))
    .then(img => imageRender(img))
    .then(() => {
        image.style.display = "none";
    })
    .catch(err => console.error(err));


function wait(second){
    return new Promise(function(resolve){
        setTimeout(resolve,second*1000)
    });
}