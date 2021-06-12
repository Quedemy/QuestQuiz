const questionContainer = document.getElementById('question-container');
const allChoices = document.getElementsByClassName('choice-text');
const questionOptions = document.getElementsByClassName('choice-container');
const choices = Array.from(allChoices);
const options = Array.from(questionOptions);
document.getElementById('start-game').addEventListener('click', startNewGame);
document.getElementById('next-question').addEventListener('click', getNewQuestion);
document.querySelector('.level').addEventListener('click',selectGameLevel);
document.querySelector('.choice').addEventListener('click',selectAnswer,false);


function startNewGame(e){
    document.getElementById('frame-start').style.display = 'none';
    document.getElementById('frame-level').style.display = 'block';
    e.preventDefault()
}

function selectGameLevel(e){
    switch (e.target.id){
        case 'level1':
        startGame()
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


const questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript??',
        choice1: '<script>',
        choice2: '<javascript>',
        choice3: '<js>',
        choice4: '<scripting>',
        answer: 1,
    },
    {
        question:
            "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3,
    }
]

let currentQuestion;
let score = 0;
let questionCounter = 0;
let availableQuestions;
let acceptingAnswers = false;
let timeRemaining = 5000*60;
let finalScore = 0;

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 2;

function Increment(){
    score +=1
}

 function startGame () {
    document.getElementById('frame-level').style.display = 'none';
    document.getElementById('frame-question').style.display = 'block';
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
        
    getNewQuestion();
}; 

function getNewQuestion () {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS ) {
        //go to the end page
     document.getElementById('frame-question').style.display = 'none';
     document.getElementById('frame-score').style.display = 'block';
        document.getElementById('mathScore').innerText = finalScore;
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
    questionContainer.innerText = currentQuestion.question;
    
    //get the correct 
    choices.forEach((option) => {
        const num = option.dataset.number;
        option.innerText = currentQuestion['choice' + num];
    });

    availableQuestions.splice(newQuestionIndex, 1);
    acceptingAnswers = true;

   };



    //listen to the options selected
/* choices.forEach((option) => {
    option.addEventListener('click',(e) => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        selectCorrectAnswer(e.target);
        
        console.log(e.target)
        e.preventDefault()
         });

}); */

function selectCorrectAnswer(target){
    const selectedAnswer = target.dataset['number'];
    parseInt(selectedAnswer) === parseInt(currentQuestion.answer) ? Increment() : score;
    //final score percent
    finalScore = (score / MAX_QUESTIONS) * 100;
}




