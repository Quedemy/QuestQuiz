const dateTime = document.getElementById('date-time');
const timeOfDay = document.getElementById('timeOfDay');
const questionContainer = document.querySelector('.question-frame')
const allChoices = document.getElementsByClassName('choice-text');
const questionOptions = document.querySelector('.choice');
const choices = Array.from(allChoices);
document.getElementById('start-game').addEventListener('click', startNewGame);
document.getElementById('next-question').addEventListener('click', getANewQuestion);
document.querySelector('.level').addEventListener('click', selectGameLevel);
const questionNumber = document.getElementById('counter');
const totalQuestion = document.getElementById('total-question');
const replay = document.getElementById('replay');
 replay.addEventListener('click',startNewGame);
 const timeInMinutes = document.getElementById('minutes');
 const timeInSeconds = document.getElementById('seconds');



// Game parameters
let currentQuestion;
let score = 0;
let questionCounter = 0;
let availableQuestions;
let acceptingAnswers = false;
let timeRemaining = 5000 * 60;
let finalScore = 0;

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;
let TOTAL_TIME = 1000 * 1.5 * MAX_QUESTIONS;
//start game function-event-listener
function startNewGame(e) {
    document.getElementById('frame-start').style.display = 'none';
    document.getElementById('frame-level').style.display = 'block';
    e.preventDefault()
}

// Level 1 game starter
function LevelOne() {
    timeInMinutes.innerText = `00 :`
    timeInSeconds.innerText = `00`
    startGame()
    renderScreen()    
    setTimer()    
}

// render question page
function renderScreen() {
    questionNumber.innerText = questionCounter;
    totalQuestion.innerText = MAX_QUESTIONS;
}

//Set level function-event-listener
function selectGameLevel(e) {
    switch (e.target.id) {
        case 'level1':
            LevelOne()
            break;
        case 'level2':

            console.log(score);
            break;
        case 'level3':
            console.log('level 3');
            break;
        case 'level4':
            console.log('level 4');
            break;
        case 'level5':
            console.log('level 5');
            break;
        default:
            return
    }
    e.preventDefault()
}

function Increment(score) {
    score = score + 1
    
}

function startGame() {
    document.getElementById('frame-level').style.display = 'none';
    document.getElementById('frame-question').style.display = 'block';
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];

    getNewQuestion();
};

function getANewQuestion(){
    showResults(currentQuestion)
   setTimeout(function(){      
       getNewQuestion();
   },150)
}

function getNewQuestion() {

    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS || TOTAL_TIME === 0) {
        //go to the end page
        endGame()       
        return;
    }

    //increment the variable counting the questions
    questionCounter++;
    //get a random question index from the remaining questions
    let arrayLength = availableQuestions.length;
    let newQuestionIndex = Math.floor(Math.random() * arrayLength);
    //get the ramdom question from question bank

    currentQuestion = availableQuestions[newQuestionIndex];

    //render the question on the page
     renderQuestions(currentQuestion, newQuestionIndex)
     
    
    

    availableQuestions.splice(newQuestionIndex, 1);
    acceptingAnswers = true;

    if(questionCounter === MAX_QUESTIONS){
        document.getElementById('next-question').innerText = "Submit"
        document.getElementById('quit-game').style.display = 'none'
    }else{
        document.getElementById('next-question').innerText = "Next Question";
        document.getElementById('quit-game').style.display = 'flex';
    }
   
};

function renderQuestions (currentQuestion, questionNumber){

    // variable to store the list of possible answers
    const answers = [];

    // and for each available answer...
    for (letter in currentQuestion.answers) {

        // ...add an HTML radio button
        answers.push(
            `<label>
            <input type="radio" id = "${letter}" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
    }
    //build the answers into different paragraphs
    let newAnswers = answers.map((answer) => {
        return `<p class = "answer-each">${answer}</p>`
    });

    const output = [];

    // add this question and its answers to the output
    output.push(
        `
        <h3 id = "question-container" class="question"> ${currentQuestion.question} </h3>
        <div class="answers"> ${newAnswers.join("")} </div>  
        `);
   /*  questionContainer.innerText = currentQuestion.question;
    questionOptions.innerHTML = `${newAnswers.join("")}` */
   
    // finally combine our output list into one string of HTML and put it on the page
    questionContainer.innerHTML = output.join('');

    
};
function showResults(currentQuestion) {
    let userInput = '';
   for(letter in currentQuestion.answers){
       if(document.getElementById(letter).checked){
       userInput = document.getElementById(letter).value;
       }
   }
       // if answer is correct
        if (userInput === currentQuestion.correctAnswer) {
            // add to the number of correct answers 
            score +=1;
        }
     
    // show number of correct answers out of total
  //  resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
}
function getFinalScore(score) {
    finalScore = ((score / MAX_QUESTIONS) * 100).toFixed(2);
    document.getElementById('mathScore').innerText = finalScore;
    return finalScore;
};

// calculating the time

function setTimer(){
let totalTime = TOTAL_TIME;
 const timeInterval = setInterval(function(){

     let testTime = {
         hours: Math.floor(totalTime / 1000 / 60 / 60) % 24,
         minutes: Math.floor(totalTime / 1000 / 60) % 60,
         seconds: Math.floor(totalTime / 1000) % 60
     }
    
     let testTimeFormated = {
         hours: testTime.hours > 9 ? testTime.hours : "0" + testTime.hours,
         minutes: testTime.minutes > 9 ? testTime.minutes : "0" + testTime.minutes,
         seconds: testTime.seconds > 9 ? testTime.seconds : "0" + testTime.seconds,
     }

    totalTime -= 1000;
    timeInMinutes.innerText = `${testTimeFormated.minutes} :`
    timeInSeconds.innerText = `${testTimeFormated.seconds}`
    
    if (totalTime === 0) {
        clearInterval(timeInterval)
        timeInMinutes.innerText = `00 :`
        timeInSeconds.innerText = `00`
        endGame();
    }
},1000)
}


function endGame (){
    document.getElementById('frame-question').style.display = 'none';
    document.getElementById('frame-score').style.display = 'block';
    getFinalScore(score);
totalTime = TOTAL_TIME;}