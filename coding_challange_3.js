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

async function imageRender(img){
        image = img;
        console.log("Image 1 loaded");
        await wait(2);
        return;
}

async function newImage(path){
    // return new Promise(function(resolve, reject){
    //     image.style.display = "none";
    //     resolve(createImage('img/Luxury.jpg'));
    // })
    image.style.display = "none";
    let imgData = await createImage(`${path}`)
    return imgData;
}

async function crImage(){
    try{
        let img = await createImage('img/car.jpg');
        await imageRender(img);

        img = await newImage(`img/Luxury.jpg`);
        await imageRender(img);

        img = await newImage(`img/city.jpg`);
        await imageRender(img);
    }catch(err){
        console.error(err)
    }
} 

// crImage();

function wait(second){
    return new Promise(function(resolve){
        setTimeout(resolve,second*1000)
    });
}


// 2
async function loadAll(imgArr){
    let imgs = imgArr.map(img => createImage(img));
    console.log(imgs);
    let imgEl = await Promise.all(imgs);
    console.log(imgEl);

    imgEl.forEach(img => img.classList.add("parallel"));
}

loadAll(['img/car.jpg','img/Luxury.jpg','img/city.jpg']);
