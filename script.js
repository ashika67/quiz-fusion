const questions = {
    general: [
        {
            question: "What is the capital of France?",
            answers: [
                { text: "Paris", correct: true },
                { text: "London", correct: false },
                { text: "Berlin", correct: false },
                { text: "Madrid", correct: false }
            ],
            feedback: "Paris is the capital and largest city of France."
        },
        {
            question: "Which element is represented by the symbol 'O'?",
            answers: [
                { text: "Gold", correct: false },
                { text: "Oxygen", correct: true },
                { text: "Osmium", correct: false },
                { text: "Oganesson", correct: false }
            ],
            feedback: "Oxygen is a chemical element with the symbol O and atomic number 8."
        },
        {
            question: "What is the largest ocean on Earth?",
            answers: [
                { text: "Atlantic Ocean", correct: false },
                { text: "Indian Ocean", correct: false },
                { text: "Pacific Ocean", correct: true },
                { text: "Arctic Ocean", correct: false }
            ],
            feedback: "The Pacific Ocean is the largest and deepest ocean on Earth."
        },
        {
            question: "Which country is known as the Land of the Rising Sun?",
            answers: [
                { text: "China", correct: false },
                { text: "Japan", correct: true },
                { text: "South Korea", correct: false },
                { text: "Thailand", correct: false }
            ],
            feedback: "Japan is called the Land of the Rising Sun due to its eastern location."
        },
        {
            question: "What is the currency of Brazil?",
            answers: [
                { text: "Peso", correct: false },
                { text: "Real", correct: true },
                { text: "Dollar", correct: false },
                { text: "Euro", correct: false }
            ],
            feedback: "The Real is the official currency of Brazil."
        }
    ],
    science: [
        {
            question: "What gas do plants absorb from the atmosphere?",
            answers: [
                { text: "Oxygen", correct: false },
                { text: "Carbon Dioxide", correct: true },
                { text: "Nitrogen", correct: false },
                { text: "Helium", correct: false }
            ],
            feedback: "Plants absorb Carbon Dioxide during photosynthesis to produce oxygen."
        },
        {
            question: "What is the primary source of energy for Earth's climate system?",
            answers: [
                { text: "The Sun", correct: true },
                { text: "Geothermal Energy", correct: false },
                { text: "Wind", correct: false },
                { text: "Ocean Currents", correct: false }
            ],
            feedback: "The Sun provides the primary energy for Earth's climate system."
        },
        {
            question: "What is the chemical formula for water?",
            answers: [
                { text: "H2O", correct: true },
                { text: "CO2", correct: false },
                { text: "NaCl", correct: false },
                { text: "O2", correct: false }
            ],
            feedback: "Water is composed of two hydrogen atoms and one oxygen atom, H2O."
        },
        {
            question: "Which planet is closest to the Sun?",
            answers: [
                { text: "Venus", correct: false },
                { text: "Mercury", correct: true },
                { text: "Mars", correct: false },
                { text: "Earth", correct: false }
            ],
            feedback: "Mercury is the closest planet to the Sun in our solar system."
        },
        {
            question: "What is the unit of electric current?",
            answers: [
                { text: "Volt", correct: false },
                { text: "Watt", correct: false },
                { text: "Ampere", correct: true },
                { text: "Ohm", correct: false }
            ],
            feedback: "Ampere is the unit of electric current in the International System of Units."
        }
    ],
    history: [
        {
            question: "Who was the first President of the United States?",
            answers: [
                { text: "Abraham Lincoln", correct: false },
                { text: "George Washington", correct: true },
                { text: "Thomas Jefferson", correct: false },
                { text: "John Adams", correct: false }
            ],
            feedback: "George Washington was the first U.S. President, serving from 1789 to 1797."
        },
        {
            question: "In which year did World War II end?",
            answers: [
                { text: "1942", correct: false },
                { text: "1945", correct: true },
                { text: "1939", correct: false },
                { text: "1948", correct: false }
            ],
            feedback: "World War II ended in 1945 with the surrender of the Axis powers."
        },
        {
            question: "Who discovered America in 1492?",
            answers: [
                { text: "Vasco da Gama", correct: false },
                { text: "Christopher Columbus", correct: true },
                { text: "Ferdinand Magellan", correct: false },
                { text: "Marco Polo", correct: false }
            ],
            feedback: "Christopher Columbus reached the Americas in 1492, initiating European exploration."
        },
        {
            question: "Which ancient wonder was located in Alexandria, Egypt?",
            answers: [
                { text: "Hanging Gardens", correct: false },
                { text: "Lighthouse of Alexandria", correct: true },
                { text: "Colossus of Rhodes", correct: false },
                { text: "Great Pyramid", correct: false }
            ],
            feedback: "The Lighthouse of Alexandria was one of the Seven Wonders of the Ancient World."
        },
        {
            question: "What was the name of the ship that carried the Pilgrims to America in 1620?",
            answers: [
                { text: "Santa Maria", correct: false },
                { text: "Mayflower", correct: true },
                { text: "Nina", correct: false },
                { text: "Pinta", correct: false }
            ],
            feedback: "The Mayflower carried the Pilgrims to Plymouth, Massachusetts, in 1620."
        }
    ]
};

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const startButton = document.getElementById("start-btn");
const categorySelect = document.getElementById("category");
const scoreContainer = document.getElementById("score-container");
const scoreElement = document.getElementById("score");
const highScoreElement = document.getElementById("high-score");
const feedbackElement = document.getElementById("feedback");
const timerElement = document.getElementById("time");
const progressBar = document.getElementById("progress-bar");
const quizContainer = document.getElementById("quiz");
const categorySelection = document.getElementById("category-selection");

let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startQuiz() {
    const selectedCategory = categorySelect.value;
    currentQuestions = shuffleArray([...questions[selectedCategory]]);
    currentQuestionIndex = 0;
    score = 0;
    categorySelection.style.display = "none";
    quizContainer.style.display = "block";
    nextButton.style.display = "none";
    restartButton.style.display = "none";
    scoreContainer.style.display = "none";
    feedbackElement.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = currentQuestions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    updateProgressBar();

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });

    startTimer();
}

function resetState() {
    clearInterval(timer);
    timeLeft = 15;
    timerElement.innerText = timeLeft;
    nextButton.style.display = "none";
    feedbackElement.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function startTimer() {
    timerElement.innerText = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            selectAnswer({ target: { dataset: { correct: "false" } } });
        }
    }, 1000);
}

function selectAnswer(e) {
    clearInterval(timer);
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
        feedbackElement.innerText = currentQuestions[currentQuestionIndex].feedback;
        feedbackElement.style.color = "#27ae60";
    } else {
        selectedButton.classList.add("wrong");
        feedbackElement.innerText = currentQuestions[currentQuestionIndex].feedback;
        feedbackElement.style.color = "#c0392b";
    }
    feedbackElement.style.display = "block";

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function showScore() {
    resetState();
    questionElement.innerText = "Quiz Completed!";
    scoreContainer.style.display = "block";
    scoreElement.innerText = `${score} out of ${currentQuestions.length}`;
    const highScore = localStorage.getItem(`highScore_${categorySelect.value}`) || 0;
    if (score > highScore) {
        localStorage.setItem(`highScore_${categorySelect.value}`, score);
        highScoreElement.innerText = score;
    } else {
        highScoreElement.innerText = highScore;
    }
    nextButton.style.display = "none";
    restartButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuestions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", handleNextButton);
restartButton.addEventListener("click", () => {
    categorySelection.style.display = "block";
    quizContainer.style.display = "none";
});

function initializeHighScores() {
    highScoreElement.innerText = localStorage.getItem(`highScore_${categorySelect.value}`) || 0;
}

categorySelect.addEventListener("change", initializeHighScores);
initializeHighScores();