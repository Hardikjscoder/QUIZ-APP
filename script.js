import { question_answer_arr } from "./questions.js";

// Selectors
const question = document.getElementById("question"),
  answer_1 = document.getElementById("answer_1"),
  answer_2 = document.getElementById("answer_2"),
  answer_3 = document.getElementById("answer_3"),
  answer_4 = document.getElementById("answer_4"),
  answers = document.querySelectorAll(".answer"),
  timeLeft = document.getElementById("timeLeft"),
  scoreElement = document.getElementById("score");

// Initial variables
let index = 0;
let count = 30;
let score = 0;

// =================== Functions ===================

// Function to randomly shuffle an array
function shuffleArr(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}

// Function to show the questions in the DOM
function setQuestions(arr, index) {
  question.textContent = arr[index].question;
  let optionsArr = question_answer_arr[index].options;
  shuffleArr(optionsArr);
  answer_1.textContent = optionsArr[0];
  answer_2.textContent = optionsArr[1];
  answer_3.textContent = optionsArr[2];
  answer_4.textContent = optionsArr[3];
}

setQuestions(question_answer_arr, index);

// Function to decrement time counter
function decrementTimeCounter() {
  let time;
  setInterval(() => {
    count--;
    if (count < 0) return;
    time = parseInt(timeLeft.textContent);
    time = count;
    timeLeft.textContent = time;

    if (time === 0) {
      score--;
      scoreElement.textContent = `Score : ${score}`;
      let answersArr = Array.from(answers);
      answersArr.forEach((answer) => {
        if (answer.textContent === question_answer_arr[index].correctAnswer) {
          answer.style.backgroundColor = "#93ff93";
        }

        document.getElementById("nextBtn").addEventListener("click", () => {
          answer.style.backgroundColor = "whitesmoke";
          count = 30;
          let newCount = count + 1;
          newCount--;
          if (newCount < 0) return;
          time = parseInt(timeLeft.textContent);
          time = newCount;
          timeLeft.textContent = time;
        });
      });
    }
  }, 1000);
}

// Function to check answer
function checkCorrectAnswer(e) {
  const answer = e.target;
  if (answer.textContent === question_answer_arr[index].correctAnswer) {
    score++;
    scoreElement.textContent = `Score : ${score}`;
    answer.style.backgroundColor = "#93ff93";
    answer.classList.add("correct");
    let children = Array.from(answer.parentElement.children);
    children.filter((answer) => {
      if (!answer.classList.contains("correct")) {
        answer.style.opacity = 0.5;
        answer.style.pointerEvents = "none";
      }
    });

    document.getElementById("nextBtn").addEventListener("click", () => {
      answer.style.backgroundColor = "whitesmoke";
      answer.classList.remove("correct");
      children.forEach((answer) => {
        answer.style.opacity = 1;
        answer.style.pointerEvents = "auto";
      });

      count = 30;
      count++;
    });
  } else {
    score--;
    scoreElement.textContent = `Score : ${score}`;
    answer.style.backgroundColor = "#efabab";
    let children = Array.from(answer.parentElement.children);
    children.filter((answer) => {
      if (answer.textContent === question_answer_arr[index].correctAnswer) {
        answer.style.backgroundColor = "#93ff93";
      }
    });

    document.getElementById("nextBtn").addEventListener("click", () => {
      children.forEach((answer) => {
        answer.style.backgroundColor = "whitesmoke";
      });
    });
  }
}

// Events
answers.forEach((answer) => {
  answer.addEventListener("click", checkCorrectAnswer);
});

document.querySelector("#nextBtn").addEventListener("click", () => {
  index++;
  setQuestions(question_answer_arr, index);
});

document.getElementById("startBtn").addEventListener("click", () => {
  document.querySelector(".container").style.display = "block";
  document.getElementById("startBtn").style.display = "none";
  decrementTimeCounter();
});
