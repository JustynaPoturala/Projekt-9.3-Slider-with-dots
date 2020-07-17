// 1. Klawisz <- (stzałka w lewo) przesuwa w lewo (cofa) slider
// 2. Klawisz -> (stzałka w lewo) przesuwa w prawo slider (do przodu, czyli tak jak przy funkcji changeSlide) 
// lewa strzałka: keyCode = 37
// prawy strzałka: keyCode = 39
// 3. (strzałki) wstrzymuje setInterval, a po zmianie slajdu uruchamiają go ponownie (czas ma się liczyć ponownie)



const slideList = [{
        img: "images/img1.jpg",
        text: 'das Getreide'
    },
    {
        img: "images/img2.jpg",
        text: 'die Wassertropfen'
    },
    {
        img: "images/img3.jpg",
        text: 'der See'
    }
];

const image = document.querySelector('img.slider');
const h1 = document.querySelector('h1.slider');
const dots = [...document.querySelectorAll('.dots span')]

// Interfejs
const time = 3000;
let active = 0;
var indexChanging = null;

// Implementacje
const changeDot = () => {
    image.src = slideList[active].img;
    h1.textContent = slideList[active].text;

    const activeDot = dots.findIndex(dot => dot.classList.contains('active'));
    dots[activeDot].classList.remove('active');
    dots[active].classList.add('active');
}

const moveForward = () => {
    active++;
    if (active === slideList.length) {
        active = 0;
    }
    changeDot();
}

const moveBackward = () => {
    active--;
    if (active < 0) {
        active = slideList.length - 1;
    }
    changeDot();
}

const intervalManager = (active, changeSlide, timeInterval) => {
    if (active) {
        indexChanging = setInterval(changeSlide, timeInterval);
        return active;
    } else {
        clearInterval(indexChanging);
        return active;
    }
}

const keyChangeSlide = (e) => {
    intervalManager(false);
    switch (e.keyCode) {
        case 37: {
            moveBackward();
            intervalManager(true, moveForward, time);
            break;
        }
        case 39: {
            moveForward();
            intervalManager(true, moveForward, time);
            break;
        }
    }
}

window.addEventListener('keydown', keyChangeSlide)
intervalManager(true, moveForward, time);