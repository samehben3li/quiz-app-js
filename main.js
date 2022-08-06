const startBtn = document.getElementById("start")
const nextBtn = document.getElementById("next")
const quizContainer = document.getElementById("quiz-container")
const quizElement = document.getElementById("quiz")
const answerBtnElement = document.getElementById("answer-btns")
const result = document.getElementById("result")

let shuffledQuiz, currentQuizIndex

const resetState = () => {
    nextBtn.classList.add("hide")
    result.classList.add("hide")
    while (answerBtnElement.firstChild) {
        answerBtnElement.removeChild(answerBtnElement.firstChild)
    }
}

const clearStatusClass = (element) => {
    element.classList.remove("correct")
    element.classList.remove("wrong")
}

const setStatusClass = (element, correct) => {
    clearStatusClass(element)
    element.classList.add(correct ? "correct" : "wrong")

}

const selectAnswer = (e) => {
    const selectedBtn = e.target
    const correct = selectedBtn.dataset.correct
    Array.from(answerBtnElement.children).forEach(btn => {
        btn.setAttribute("disabled", true)
    })
    setStatusClass(selectedBtn, correct)
    result.innerText = correct ? "Correct !" : "Wrong !"
    setStatusClass(result, correct)
    result.classList.remove("hide")

    if ((shuffledQuiz.length > currentQuizIndex + 1) && (correct)) {
        nextBtn.classList.remove("hide")
    } else {
        startBtn.innerHTML = "Restart"
        startBtn.classList.remove("hide")
    }
}

const showQuiz = (quiz) => {
    quizElement.innerText = quiz.question
    quiz.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerBtnElement.appendChild(button)
    });
}

const setNextQuiz = () => {
    resetState()
    showQuiz(shuffledQuiz[currentQuizIndex])
}

const startGame = () => {
    startBtn.classList.add("hide")
    quizContainer.classList.remove("hide")
    shuffledQuiz = quizs.sort(() => Math.random() * .5)
    currentQuizIndex = 0
    setNextQuiz()
}

startBtn.addEventListener('click', startGame)
nextBtn.addEventListener('click', () => {
    currentQuizIndex++
    setNextQuiz()
})

const quizs = [{
        id: 1,
        question: "Rolex is a company that specializes in what type of product?",
        answers: [{
                text: "Phone",
                correct: false,
            },
            {
                text: "Watches",
                correct: true,
            },
            {
                text: "Food",
                correct: false,
            },
            {
                text: "Cosmetic",
                correct: false,
            },
        ],
    },
    {
        id: 2,
        question: "When did the website `Facebook` launch?",
        answers: [{
                text: "2004",
                correct: true,
            },
            {
                text: "2005",
                correct: false,
            },
            {
                text: "2006",
                correct: false,
            },
            {
                text: "2007",
                correct: false,
            },
        ],
    },
    {
        id: 3,
        question: "Who played the character of harry potter in movie?",
        answers: [{
                text: "Johnny Deep",
                correct: false,
            },
            {
                text: "Leonardo Di Caprio",
                correct: false,
            },
            {
                text: "Denzel Washington",
                correct: false,
            },
            {
                text: "Daniel Red Cliff",
                correct: true,
            },
        ],
    },
]