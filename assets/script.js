var questionElement = document.getElementById("question");
var startButton = document.getElementById("start-btn")
var answerButtons = document.getElementById("answer-buttons");
var timerEl = document.getElementById("countdown");
var quizEl = document.querySelector(".quiz");
var enterScore = document.querySelector("#enter-score");
var initialsInput = document.getElementById("initials");
var scoreInput = document.getElementById("score");
var viewOldScores = document.getElementById("get-scores");
var showScore = document.getElementById("results");
var timeLeft = 60;

//getElementById do NOT need hashtags or periods.

function countdown() {
    timerEl.style.color = "black";
    timerEl.style.position = "left";
    var timeInterval = setInterval(function () {
      timeLeft--;
      timerEl.textContent = timeLeft + " seconds left";
  
      if(timeLeft === 0) {
        clearInterval(timeInterval);
        displayMessage ()
        endQuiz()
      }
  
    }, 1000);
  }

function displayMessage() {
    alert("Time is up!")

}

  function resetState(){
    startButton.style.display = "none";
    quizEl.setAttribute("style", "display: block;")
  }


startButton.addEventListener("click", function(){
    console.log("I was clicked!");
    startQuiz();
    countdown();
})

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    resetState();
    currentQuestionIndex = 0;
    score = 0;
    // nextButton.innerHTML = "Next";
    showQuestion();
}



var questions = [
    {
        question: "Commonly used data types DO NOT include:", answers: [
            {text: "Alerts", correct: true},
            {text: "Booleans", correct: false},
            {text: "Strings", correct: false},
            {text: "Numbers", correct: false},
        ]
    },
    {
        question: "The condition in an if/else statement is enclosed with:", answers: [
            {text: "Quotes", correct: false},
            {text: "Curly Braces", correct: true},
            {text: "Paranthesis", correct: false},
            {text: "Square Brackets", correct: false},
        ]
    },
    {
        question: "Arrays in Javascript can be used to store:", answers: [
            {text: "Numbers and Strings", correct: false},
            {text: "Other Arrays", correct: false},
            {text: "Strings", correct: true},
            {text: "Numbers", correct: false},
        ]
    },
    {
        question: "The following items can NOT be used as actions in an Event Listener, except for:", answers: [
            {text: "Start", correct: false},
            {text: "Strick", correct: false},
            {text: "Push", correct: false},
            {text: "Click", correct: true},
        ]
    },
    {
        question: "Which of the following is used to add style elements to elements/tags?", answers: [
            {text: "setAttribute", correct: true},
            {text: "addStyle", correct: false},
            {text: ".Style", correct: true},
            {text: "createStyle", correct: false},
        ]
    }
];

function showQuestion(){
    resetState();
    console.log(currentQuestionIndex);
    let currentQuestion = questions[currentQuestionIndex];
    console.log(currentQuestion)
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        var button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("choice-btn");
        // button.setAttribute("value", )
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
    })
    console.log(currentQuestion);
    answerButtons.addEventListener('click', selectAnswer)
}

function selectAnswer(event){
    var selectBtn = event.target;
    var isCorrect = selectBtn.dataset.correct;
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++; 
    } else {
        selectBtn.classList.add("incorrect");
        timeLeft-=5
    }
    questionElement.innerHTML = "";
    answerButtons.innerHTML = "";
    if(currentQuestionIndex === questions.length -1){
        return endQuiz()
    }
    currentQuestionIndex++
    showQuestion();
}

function endQuiz(){
        questionElement.innerHTML = "Your score is " + score + "."
}

let gitScores = JSON.parse(localStorage.getItem("enter-score"));

if (!gitScores) {
    var array = [];
} else { var array = gitScores;}

enterScore.addEventListener("click", function(event) {
    event.preventDefault();
    console.log("FEEDBACK!")
    var finalScore = {
      initials: initialsInput.value,
      score:score
    };
    array.push(finalScore) 
        
    localStorage.setItem("enter-score", JSON.stringify(array));
    renderMessage();
    
    });
    
    function renderMessage() {
      var finalScore = JSON.parse(localStorage.getItem("finalScore"));
      if (finalScore !== null) {
        document.querySelector(".message").textContent = finalScore.initials + finalScore.score
      }
    }

viewOldScores.addEventListener('click', function(event){
    event.preventDefault();
    showScore.innerHTML = "";
    let getScores = JSON.parse(localStorage.getItem("enter-score"));
    // let scoresArray = JSON.stringify(getScores);
    // console.log(scoresArray);
    console.log(getScores);
    console.log(showScore);
    for(let i=0; i < getScores.length; i++){
        var li = document.createElement("li");
        li.textContent = getScores[i].initials + getScores[i].score;
        showScore.append(li);
    }
    // showScore.innerHTML = getScores.initials + getScores.score;
    viewOldScores.style.display = "block";
})










