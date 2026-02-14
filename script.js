document.addEventListener('DOMContentLoaded', () => {

    const questionsData = {
        easy: [
            { question: "Яка планета найближча до Сонця?", answers: ["Венера", "Марс", "Меркурій", "Земля"], correct: 2 },
            { question: "Супутник Землі?", answers: ["Фобос", "Місяць", "Титанія", "Ганімед"], correct: 1 },
            { question: "Скільки планет у Сонячній системі?", answers: ["7", "8", "9", "10"], correct: 1 },
            { question: "Назва нашої галактики?", answers: ["Андромеда", "Чумацький Шлях", "Трикутник", "Сомбреро"], correct: 1 }
        ],
        medium: [
            { question: "Хто перший полетів у космос?", answers: ["Ніл Армстронг", "Юрій Гагарін", "Ілон Маск", "Базз Олдрін"], correct: 1 },
            { question: "Найбільша планета Сонячної системи?", answers: ["Сатурн", "Нептун", "Юпітер", "Уран"], correct: 2 },
            { question: "З чого переважно складається Сонце?", answers: ["Кисень", "Водень", "Вуглець", "Залізо"], correct: 1 },
            { question: "Що таке світловий рік?", answers: ["Час", "Відстань", "Швидкість", "Яскравість"], correct: 1 }
        ],
        hard: [
            { question: "Рік запуску першого супутника?", answers: ["1957", "1961", "1969", "1975"], correct: 0 },
            { question: "Найближча зірка до Сонця?", answers: ["Сіріус", "Бетельгейзе", "Проксима Центавра", "Альфа Центавра"], correct: 2 },
            { question: "Як називається горизонт подій чорної діри?", answers: ["Сингулярність", "Межа", "Радіус Шварцшильда", "Квантовий бар'єр"], correct: 2 },
            { question: "Температура поверхні Сонця (приблизно)?", answers: ["3000°C", "5500°C", "10000°C", "15000000°C"], correct: 1 }
        ]
    };

    let questions = [];

    // Створення елементів
    const startScreen = document.querySelector('#start-screen');
    const quizScreen = document.querySelector('#quiz-screen');
    const resultScreen = document.querySelector('#result-screen');
    const startBtn = document.querySelector('#start-btn');
    const restartBtn = document.querySelector('#restart-btn');
    const resultText = document.querySelector('.result-text');
    const questionText = document.querySelector('#question-text');
    const answersContainer = document.querySelector('#answers-container');
    const timerDisplay = document.querySelector('#timer');
    const scoreDisplay = document.querySelector('#score-display');
    const difficultySelect = document.querySelector('#difficulty');
    const highScoreDisplay = document.querySelector('#high-score');

    let questionIndex = 0;
    let score = 0;
    let timer = 15;
    let interval;

    // Завантаження рекорду
    function loadHighScore() {
        const savedScore = localStorage.getItem('cosmicHighScore') || 0;
        if (highScoreDisplay) highScoreDisplay.innerText = `Рекорд: ${savedScore}`;
    }
    loadHighScore();

    // Функція для відображення запитання
    function showQuestion(question) {

        clearInterval(interval);
        startTimer();

        answersContainer.innerHTML = '';
        questionText.innerText = question.question;
        for (let i = 0; i < question.answers.length; i++) {
            const button = document.createElement('button');
            button.innerText = question.answers[i];
            button.classList.add('answer-btn');
            button.addEventListener('click', () => checkAnswer(button, i));
            answersContainer.appendChild(button);

        }
    }

    function nextQuestion() {
        questionIndex++;
        if (questionIndex < questions.length) {
            showQuestion(questions[questionIndex]);
        } else {
            showResult();
        }
    }

    function checkAnswer(button, i) {
        if (i == questions[questionIndex].correct) {
            score++;
            button.classList.add('correct');
        } else {
            button.classList.add('wrong');
        }
        scoreDisplay.innerText = `Бали: ${score}`;

        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.disabled = true;
        })

        setTimeout(nextQuestion, 1000);
    }


    function showResult() {
        const accuracy = Math.round((score / questions.length) * 100);
        resultText.innerText = `Твій результат: ${score}/${questions.length} (${accuracy}%)`;

        const savedScore = localStorage.getItem('cosmicHighScore') || 0;
        if (score > savedScore) {
            localStorage.setItem('cosmicHighScore', score);
            resultText.innerText += "\nНОВИЙ РЕКОРД! 🚀";
        }

        quizScreen.classList.add('hide');
        resultScreen.classList.remove('hide');
    }

    function startGame() {
        const difficulty = difficultySelect.value;
        questions = questionsData[difficulty];

        startScreen.classList.add('hide');
        resultScreen.classList.add('hide');
        quizScreen.classList.remove('hide');
        questionIndex = 0;
        score = 0;
        scoreDisplay.innerText = `Бали: 0`;
        showQuestion(questions[questionIndex]);
    }

    startBtn.addEventListener('click', startGame);


    function startTimer() {
        timer = 15;
        timerDisplay.innerText = `Час: ${timer}`;
        interval = setInterval(() => {
            timer--;
            timerDisplay.innerText = `Час: ${timer}`;
            if (timer <= 0) {
                clearInterval(interval);
                nextQuestion();
            }
        }, 1000);
    }

    restartBtn.addEventListener('click', () => {
        loadHighScore();
        resultScreen.classList.add('hide');
        startScreen.classList.remove('hide');
    });

});
