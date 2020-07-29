
const form = document.getElementById('form');
const question = document.getElementById('question');
const guessInput = document.getElementById('guess');
const slideViewer = document.getElementById('slide');
const yes = document.getElementById('yes');
const no = document.getElementById('no');
const reset = document.getElementById('reset');
const maxnumber = document.getElementById('maxnumber');



let gameStarted = false;
let gameEnded = false;
// let guess;
let type = 'binary';
let slides;
let visibleSlide;
let maxNumber = 50;


form.addEventListener('submit', (e) => {

    e.preventDefault();
    // guess = parseInt(guessInput.value, 10);
    // if (guess) {
    //     if (guess < maxNumber && guess > 0) {
    //         startGame();
    //     } else {
    //         alert(`Guess must be below ${maxNumber} and above 0`);
    //     }
    // }

    startGame();

});

yes.addEventListener('click', (e) => {
    e.preventDefault();
    answerYes();
});
no.addEventListener('click', (e) => {
    e.preventDefault();
    answerNo();
});
reset.addEventListener('click', (e) => {
    e.preventDefault();
    resetGame();
});
maxnumber.innerHTML = maxNumber;


resetGame();

function startGame() {
    gameStarted = true;
    gameEnded = false;
    form.hidden = true;
    reset.hidden = true;


    slides = [];

    const maxI = Math.ceil(Math.log2(maxNumber));

    for (let i = 1; i <= maxI; i++) {

        const p2 = Math.pow(2, i);
        const numbers = [];
        for (let n = 1; n <= maxNumber; n++) {
            if ((n % p2) >= (p2 / 2)) {
                numbers.push(n);
            }
        }
        const slide = {
            includedInAnswer: false,
            visible: false,
            answered: false,
            numbers: numbers, // .sort(() => Math.random() - 0.5),
            p2: i - 1
        };

        slides.push(slide);
    }

    question.hidden = false;


    showSlide();


}


function showSlide() {
    visibleSlide = slides.find(s => s.visible == false && s.answered == false);

    if (visibleSlide) {

        visibleSlide.visible = true;

        slideViewer.innerHTML = visibleSlide.numbers.map(n => `<div>${n}</div>`).join('');

        slideViewer.classList.remove('hidden');
    } else {
        slideViewer.classList.add('hidden');
        endGame();

    }

}

function answerYes() {

    visibleSlide.includedInAnswer = true;
    visibleSlide.answered = true;
    showSlide();
}


function answerNo() {
    visibleSlide.includedInAnswer = false;
    visibleSlide.answered = true;
    showSlide();
}


function endGame() {
    guessAnswer();

    gameEnded = true;
    reset.hidden = false;
    question.hidden = true;
    visibleSlide = null;

}


function guessAnswer() {

    // const p2s = slides.filter((s) => s.numbers.includes(guess)).map(s => s.p2);
    const p2s = slides.filter((s) => s.includedInAnswer).map(s => s.p2);
    let myguess = 0;
    p2s.forEach(p => {
        myguess += (Math.pow(2, p));
    });

    alert(`Your number was: ${myguess}`);



}

function resetGame() {
    gameEnded = false;
    gameStarted = false;
    question.hidden = true;
    reset.hidden = true;
    form.hidden = false;


    console.log(reset);
}