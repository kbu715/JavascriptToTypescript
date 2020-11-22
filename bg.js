const body = document.querySelector("body");

const IMG_NUMBER = 3;

function handleImgLoad(){
    console.log('finished');
}

function paintImage(imgNumber){
    const image = new Image();
    image.src = `images/${imgNumber}.jpg`;
    image.classList.add('bgImage');
    body.appendChild(image);
    // image.addEventListener('loadend', handleImgLoad); //API에서 이 일을 한다면 이게 먹힐텐데 이건 안먹힘
}

function genRandom(){
    const number = Math.ceil(Math.random() * IMG_NUMBER);
    return number;
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();